#!/usr/bin/env node
import { execSync, exec } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Configuración
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');
const SUPABASE_DIR = path.join(ROOT_DIR, 'supabase');
const TYPES_DIR = path.join(ROOT_DIR, 'src', 'types');
const PROJECT_REF = 'ogegdctdniijmublbmgy';

// Cargar variables de entorno
dotenv.config({ path: path.join(ROOT_DIR, '.env') });

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  red: '\x1b[31m'
};

function logStep(step) {
  console.log(`\n${colors.cyan}${colors.bright}${step}${colors.reset}`);
  console.log(`${'-'.repeat(step.length)}`);
}

function runCommand(command, cwd = ROOT_DIR) {
  console.log(`$ ${colors.yellow}${command}${colors.reset}`);
  try {
    const output = execSync(command, { stdio: 'inherit', cwd });
    return { success: true, output };
  } catch (error) {
    console.error(`${colors.red}Error: ${error.message}${colors.reset}`);
    return { success: false, error };
  }
}

// Función para ejecutar comandos asíncronos
async function runCommandAsync(command, cwd = ROOT_DIR) {
  console.log(`$ ${colors.yellow}${command}${colors.reset}`);
  try {
    const { stdout, stderr } = await execAsync(command, { cwd });
    if (stderr) console.error(stderr);
    return { success: true, output: stdout };
  } catch (error) {
    console.error(`${colors.red}Error: ${error.message}${colors.reset}`);
    return { success: false, error };
  }
}

// Almacén para hashes de funciones
const remoteFunctionHashes = new Map();

// Cargar caché de funciones si existe
const cacheFile = path.join(ROOT_DIR, '.supabase-functions-cache.json');
if (fs.existsSync(cacheFile)) {
  try {
    const cache = JSON.parse(fs.readFileSync(cacheFile, 'utf-8'));
    Object.entries(cache).forEach(([funcName, data]) => {
      if (data && data.hash) {
        remoteFunctionHashes.set(funcName, data.hash);
      }
    });
    console.log(`✓ Cargada caché de ${Object.keys(cache).length} funciones`);
  } catch (error) {
    console.warn('No se pudo cargar la caché de funciones:', error.message);
  }
}

// Función para calcular el hash de un directorio
async function calculateDirHash(dir) {
  const files = await getFilesRecursively(dir);
  const hash = crypto.createHash('sha256');
  
  for (const file of files) {
    const content = await fs.promises.readFile(file);
    hash.update(content);
  }
  
  return hash.digest('hex');
}

// Función para obtener todos los archivos de un directorio recursivamente
async function getFilesRecursively(dir) {
  const dirents = await fs.promises.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map(async (dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFilesRecursively(res) : res;
  }));
  return Array.prototype.concat(...files);
}

// Obtener lista de funciones remotas
async function getRemoteFunctions() {
  try {
    const { stdout } = await execAsync('npx supabase functions list --project-ref ogegdctdniijmublbmgy');
    // El comando devuelve una lista de funciones, una por línea
    return stdout.trim().split('\n').slice(1) // Saltar el encabezado
      .map(line => {
        // Extraer el nombre de la función (primera columna)
        const name = line.split('\t')[0].trim();
        return name ? { name, hash: null } : null;
      })
      .filter(Boolean); // Filtrar líneas vacías
  } catch (error) {
    console.error('Error obteniendo funciones remotas:', error.message);
    console.log('Continuando asumiendo que no hay funciones remotas...');
    return [];
  }
}

// Actualizar el hash de una función remota
async function updateRemoteFunctionHash(funcName, hash) {
  // Almacenamos el hash en memoria para la sesión actual
  remoteFunctionHashes.set(funcName, hash);
  
  // También podríamos almacenar esto en un archivo para persistencia entre ejecuciones
  const cacheFile = path.join(ROOT_DIR, '.supabase-functions-cache.json');
  let cache = {};
  
  try {
    if (fs.existsSync(cacheFile)) {
      cache = JSON.parse(await fs.promises.readFile(cacheFile, 'utf-8'));
    }
    
    cache[funcName] = { hash, updatedAt: new Date().toISOString() };
    await fs.promises.writeFile(cacheFile, JSON.stringify(cache, null, 2));
  } catch (error) {
    console.warn('No se pudo actualizar la caché de funciones:', error.message);
  }
}

async function main() {
  console.log(`\n${colors.blue}${colors.bright}🚀 Iniciando sincronización con Supabase${colors.reset}\n`);

  // 1. Sincronizar migraciones
  logStep('1. Sincronizando migraciones de la base de datos');
  runCommand('npx supabase migration list');
  
  // 2. Aplicar migraciones pendientes
  logStep('2. Aplicando migraciones pendientes');
  runCommand('npx supabase db push');

  // 3. Desplegar Edge Functions
  logStep('3. Verificando cambios en Edge Functions');
  const functionsDir = path.join(SUPABASE_DIR, 'functions');
  
  if (fs.existsSync(functionsDir)) {
    // Obtener lista de funciones locales
    const localFunctions = fs.readdirSync(functionsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith('_'))
      .map(dirent => dirent.name);

    // Obtener lista de funciones remotas
    const remoteFunctions = await getRemoteFunctions();
    
    // Calcular hashes locales
    const functionHashes = new Map();
    for (const func of localFunctions) {
      const funcDir = path.join(functionsDir, func);
      const hash = await calculateDirHash(funcDir);
      functionHashes.set(func, hash);
    }

    // Verificar si hay cambios
    const functionsToDeploy = [];
    for (const [func, localHash] of functionHashes.entries()) {
      const remoteFunc = remoteFunctions.find(f => f.name === func);
      
      if (!remoteFunc || remoteFunc.hash !== localHash) {
        console.log(`${colors.yellow}• ${func}${colors.reset} - ${remoteFunc ? 'actualizada' : 'nueva'}`);
        functionsToDeploy.push(func);
      } else {
        console.log(`${colors.green}• ${func}${colors.reset} - sin cambios`);
      }
    }

    // Desplegar solo las funciones con cambios
    if (functionsToDeploy.length > 0) {
      console.log(`\n${colors.blue}Desplegando ${functionsToDeploy.length} funciones...${colors.reset}`);
      for (const func of functionsToDeploy) {
        console.log(`\nDesplegando función: ${colors.green}${func}${colors.reset}`);
        const result = runCommand(`npx supabase functions deploy ${func} --project-ref ${PROJECT_REF}`);
        
        if (result.success) {
          // Actualizar el hash remoto después de un despliegue exitoso
          await updateRemoteFunctionHash(func, functionHashes.get(func));
        }
      }
    } else {
      console.log(`\n${colors.green}✓ Todas las funciones están actualizadas${colors.reset}`);
    }
  }

  // 4. Sincronizar Storage
  logStep('4. Sincronizando configuración de Storage');
  // Aquí iría la lógica para sincronizar buckets
  // Por ahora solo mostramos un mensaje
  console.log('Nota: La sincronización de buckets debe hacerse manualmente desde el dashboard de Supabase');

  // 5. Generar tipos de TypeScript
  logStep('5. Generando tipos de TypeScript');
  if (!fs.existsSync(TYPES_DIR)) {
    fs.mkdirSync(TYPES_DIR, { recursive: true });
  }
  runCommand(`npx supabase gen types typescript --project-id ${PROJECT_REF} --schema public > ${TYPES_DIR}/supabase.ts`);

  console.log(`\n${colors.green}${colors.bright}✅ Sincronización completada con éxito${colors.reset}\n`);
}

main().catch(error => {
  console.error('Error durante la sincronización:', error);
  process.exit(1);
});

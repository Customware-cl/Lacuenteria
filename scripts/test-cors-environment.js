#!/usr/bin/env node

/**
 * Script de testing para validar detección automática de ambiente CORS
 * Simula diferentes escenarios de ambiente y verifica comportamiento correcto
 */

// Funciones simuladas (copias del módulo real)
function isProduction() {
  const environment = process.env.ENVIRONMENT;
  const supabaseUrl = process.env.SUPABASE_URL;
  
  // 1. Variable explícita de ambiente tiene máxima prioridad
  if (environment === 'production' || environment === 'prod') {
    return true;
  }
  
  // 2. Si está explícitamente en desarrollo, respetarlo
  if (environment === 'development' || environment === 'dev') {
    return false;
  }
  
  // 3. Detectar por URL de Supabase solo si no hay variable ENVIRONMENT
  if (!environment && supabaseUrl?.includes('.supabase.co')) {
    return true;
  }
  
  // 4. Detectar por ausencia de localhost solo si no hay variable ENVIRONMENT
  if (!environment && supabaseUrl && !supabaseUrl.includes('localhost') && !supabaseUrl.includes('127.0.0.1')) {
    return true;
  }
  
  // 5. Por defecto, asumir desarrollo si no hay indicadores claros
  return false;
}

function getAllowedOrigins() {
  if (isProduction()) {
    const prodOrigins = process.env.ALLOWED_ORIGINS;
    if (prodOrigins) {
      return prodOrigins.split(',').map(origin => origin.trim());
    }
    
    return [
      'https://lacuenteria.cl',
      'https://www.lacuenteria.cl',
      'https://app.lacuenteria.cl'
    ];
  } else {
    return [
      'http://localhost:5173',
      'http://localhost:5174', 
      'http://localhost:5175',
      'http://localhost:5176',
      'http://localhost:5177',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:5174',
      'https://localhost:5173',
      'https://127.0.0.1:5173'
    ];
  }
}

// Test scenarios
const testScenarios = [
  {
    name: "🏠 Desarrollo Local - Supabase Local",
    env: {
      ENVIRONMENT: 'development',
      SUPABASE_URL: 'http://127.0.0.1:54321'
    },
    expectedProduction: false,
    expectedOrigins: 9
  },
  {
    name: "☁️ Desarrollo - Supabase Cloud", 
    env: {
      ENVIRONMENT: 'development',
      SUPABASE_URL: 'https://ogegdctdniijmublbmgy.supabase.co'
    },
    expectedProduction: false,
    expectedOrigins: 9
  },
  {
    name: "🚀 Producción - Variable Explícita",
    env: {
      ENVIRONMENT: 'production',
      SUPABASE_URL: 'https://prod-proyecto.supabase.co'
    },
    expectedProduction: true,
    expectedOrigins: 3
  },
  {
    name: "🌐 Producción - URL Detection",
    env: {
      SUPABASE_URL: 'https://proyecto.supabase.co'
    },
    expectedProduction: true,
    expectedOrigins: 3
  },
  {
    name: "🔧 Staging - Custom Origins",
    env: {
      ENVIRONMENT: 'production',
      SUPABASE_URL: 'https://staging.supabase.co',
      ALLOWED_ORIGINS: 'https://staging.lacuenteria.cl,https://preview.lacuenteria.cl'
    },
    expectedProduction: true,
    expectedOrigins: 2
  },
  {
    name: "⚠️ Edge Case - Custom Domain",
    env: {
      SUPABASE_URL: 'https://api.lacuenteria.cl'
    },
    expectedProduction: true,
    expectedOrigins: 3
  }
];

// Test runner
async function runTests() {
  console.log('🧪 Testing CORS Environment Detection\n');
  console.log('='.repeat(60));
  
  let passed = 0;
  let failed = 0;
  
  for (const scenario of testScenarios) {
    console.log(`\n${scenario.name}`);
    console.log('-'.repeat(40));
    
    // Backup original env
    const originalEnv = {
      ENVIRONMENT: process.env.ENVIRONMENT,
      SUPABASE_URL: process.env.SUPABASE_URL,
      ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS
    };
    
    try {
      // Clear test environment
      delete process.env.ENVIRONMENT;
      delete process.env.SUPABASE_URL;
      delete process.env.ALLOWED_ORIGINS;
      
      // Set test environment
      for (const [key, value] of Object.entries(scenario.env)) {
        if (value) {
          process.env[key] = value;
        }
      }
      
      // Run tests
      const actualProduction = isProduction();
      const actualOrigins = getAllowedOrigins();
      
      console.log(`📊 Environment: ${process.env.ENVIRONMENT || 'undefined'}`);
      console.log(`🔗 Supabase URL: ${process.env.SUPABASE_URL || 'undefined'}`);
      console.log(`🎯 Custom Origins: ${process.env.ALLOWED_ORIGINS || 'undefined'}`);
      
      // Validate results
      const productionPassed = actualProduction === scenario.expectedProduction;
      const originsPassed = actualOrigins.length === scenario.expectedOrigins;
      
      console.log(`\n🔍 Results:`);
      console.log(`   Production: ${actualProduction} ${productionPassed ? '✅' : '❌'} (expected: ${scenario.expectedProduction})`);
      console.log(`   Origins count: ${actualOrigins.length} ${originsPassed ? '✅' : '❌'} (expected: ${scenario.expectedOrigins})`);
      console.log(`   Origins: ${actualOrigins.slice(0, 3).join(', ')}${actualOrigins.length > 3 ? '...' : ''}`);
      
      if (productionPassed && originsPassed) {
        console.log(`✅ PASSED`);
        passed++;
      } else {
        console.log(`❌ FAILED`);
        failed++;
      }
      
    } catch (error) {
      console.log(`💥 ERROR: ${error.message}`);
      failed++;
    } finally {
      // Restore original env
      delete process.env.ENVIRONMENT;
      delete process.env.SUPABASE_URL;
      delete process.env.ALLOWED_ORIGINS;
      
      for (const [key, value] of Object.entries(originalEnv)) {
        if (value) {
          process.env[key] = value;
        }
      }
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📋 TEST SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📊 Total: ${testScenarios.length}`);
  
  if (failed === 0) {
    console.log('\n🎉 All tests passed! CORS environment detection is working correctly.');
  } else {
    console.log('\n⚠️  Some tests failed. Review the logic in cors.ts');
  }
  
  return failed === 0;
}

// Performance test
async function performanceTest() {
  console.log('\n🚀 Performance Test');
  console.log('-'.repeat(30));
  
  const iterations = 10000;
  const start = Date.now();
  
  for (let i = 0; i < iterations; i++) {
    isProduction();
    getAllowedOrigins();
  }
  
  const end = Date.now();
  const totalTime = end - start;
  const avgTime = totalTime / iterations;
  
  console.log(`📊 Performance Results:`);
  console.log(`   Total time: ${totalTime.toFixed(2)}ms`);
  console.log(`   Average per call: ${avgTime.toFixed(4)}ms`);
  console.log(`   Calls per second: ${(1000 / avgTime).toFixed(0)}`);
  
  if (avgTime < 0.1) {
    console.log('✅ Performance is excellent');
  } else if (avgTime < 1) {
    console.log('⚠️  Performance is acceptable');
  } else {
    console.log('❌ Performance needs optimization');
  }
}

// Main execution
async function main() {
  console.log('🔬 CORS Environment Detection Test Suite');
  console.log('==========================================\n');
  
  const testsPassed = await runTests();
  await performanceTest();
  
  console.log('\n🏁 Test suite completed.');
  
  if (!testsPassed) {
    process.exit(1);
  }
}

main().catch(console.error);
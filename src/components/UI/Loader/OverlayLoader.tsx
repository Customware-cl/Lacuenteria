import React, { useEffect, useState } from 'react';
import { Loader } from 'lucide-react';
import { getLoaderMessages, Etapa } from '../../../config/loaderMessages';

export interface OverlayLoaderProps {
  etapa: Etapa;
  context?: Record<string, string>;
  /** Mensajes personalizados para mostrar. Reemplaza a los configurados por etapa */
  messages?: string[];
  timeoutMs?: number;
  onTimeout?: () => void;
  onCancel?: () => void;
  /** Callback que se ejecuta cuando se supera el tiempo límite absoluto */
  onFallback?: () => void;
  /** Tiempo en milisegundos para activar onFallback. Por defecto 60s */
  fallbackDelayMs?: number;
  progress?: { current: number; total: number };
}

const MESSAGE_INTERVAL = 7000;
const DEFAULT_TIMEOUT = 300000; // 5 minutos
const DEFAULT_FALLBACK_DELAY = 360000; // 6 minutos

const OverlayLoader: React.FC<OverlayLoaderProps> = ({
  etapa,
  context = {},
  messages,
  timeoutMs = DEFAULT_TIMEOUT,
  onTimeout,
  onCancel,
  onFallback,
  fallbackDelayMs = DEFAULT_FALLBACK_DELAY,
  progress,
}) => {
  const [index, setIndex] = useState(0);
  const [isTimeout, setIsTimeout] = useState(false);

  const computedMessages = messages && messages.length > 0
    ? messages
    : getLoaderMessages(etapa, context);

  useEffect(() => {
    if (computedMessages.length <= 1) return;
    const id = setInterval(() => {
      setIndex(i => (i + 1) % computedMessages.length);
    }, MESSAGE_INTERVAL);
    return () => clearInterval(id);
  }, [computedMessages]);

  useEffect(() => {
    const id = setTimeout(() => {
      setIsTimeout(true);
      onTimeout && onTimeout();
    }, timeoutMs);
    return () => clearTimeout(id);
  }, [timeoutMs, onTimeout]);

  useEffect(() => {
    if (!onFallback) return;
    const id = setTimeout(() => {
      onFallback();
    }, fallbackDelayMs);
    return () => clearTimeout(id);
  }, [onFallback, fallbackDelayMs]);

  const message = isTimeout
    ? 'Esto está tardando más de lo esperado...'
    : computedMessages[index] || '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" aria-live="polite" role="alert">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xs text-center space-y-4 focus:outline-none">
        <Loader className="w-10 h-10 text-purple-600 animate-spin mx-auto" />
        <p className="text-sm text-purple-700" data-testid="loader-message">{message}</p>
        {progress && (
          <p className="text-xs text-gray-600">{progress.current} / {progress.total}</p>
        )}
        {onCancel && (
          <button
            onClick={onCancel}
            className="mt-2 text-xs text-purple-600 underline focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Cancelar
          </button>
        )}
      </div>
    </div>
  );
};

export default OverlayLoader;

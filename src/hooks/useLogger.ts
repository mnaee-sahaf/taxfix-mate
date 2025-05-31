// src/hooks/useLogger.ts
import { useCallback } from 'react';
import { logger } from '@/utils/logger';
import { LogLevel } from '@/utils/logger';
import { useAuth } from '@/contexts/AuthContext';

export const useLogger = (componentName: string) => {
  const { user } = useAuth();

  const log = useCallback((
    level: LogLevel,
    message: string,
    data?: any,
    action?: string
  ) => {
    const userId = user?.id;
    
    switch (level) {
      case LogLevel.DEBUG:
        logger.debug(message, data, userId, action, componentName);
        break;
      case LogLevel.INFO:
        logger.info(message, data, userId, action, componentName);
        break;
      case LogLevel.WARN:
        logger.warn(message, data, userId, action, componentName);
        break;
      case LogLevel.ERROR:
        logger.error(message, data, userId, action, componentName);
        break;
    }
  }, [user, componentName]);

  return {
    debug: (message: string, data?: any, action?: string) => 
      log(LogLevel.DEBUG, message, data, action),
    info: (message: string, data?: any, action?: string) => 
      log(LogLevel.INFO, message, data, action),
    warn: (message: string, data?: any, action?: string) => 
      log(LogLevel.WARN, message, data, action),
    error: (message: string, data?: any, action?: string) => 
      log(LogLevel.ERROR, message, data, action),
  };
};
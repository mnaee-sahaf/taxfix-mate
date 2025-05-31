// src/utils/logger.ts
import { format } from 'date-fns';

// Log levels
export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

// Log entry interface
interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
  userId?: string;
  action?: string;
  component?: string;
}

class Logger {
  private static instance: Logger;
  private logs: LogEntry[] = [];
  private readonly MAX_LOGS = 1000; // Maximum number of logs to keep in memory
  private readonly LOG_FILE_NAME = 'taxfix-logs.json';

  private constructor() {
    // Load existing logs from localStorage if available
    this.loadLogs();
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private loadLogs(): void {
    try {
      const savedLogs = localStorage.getItem(this.LOG_FILE_NAME);
      if (savedLogs) {
        this.logs = JSON.parse(savedLogs);
      }
    } catch (error) {
      console.error('Error loading logs:', error);
    }
  }

  private saveLogs(): void {
    try {
      localStorage.setItem(this.LOG_FILE_NAME, JSON.stringify(this.logs));
    } catch (error) {
      console.error('Error saving logs:', error);
    }
  }

  private createLogEntry(
    level: LogLevel,
    message: string,
    data?: any,
    userId?: string,
    action?: string,
    component?: string
  ): LogEntry {
    return {
      timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS'),
      level,
      message,
      data,
      userId,
      action,
      component,
    };
  }

  private addLog(entry: LogEntry): void {
    this.logs.unshift(entry); // Add new log at the beginning
    if (this.logs.length > this.MAX_LOGS) {
      this.logs.pop(); // Remove oldest log if exceeding max
    }
    this.saveLogs();
  }

  // Public logging methods
  public debug(message: string, data?: any, userId?: string, action?: string, component?: string): void {
    const entry = this.createLogEntry(LogLevel.DEBUG, message, data, userId, action, component);
    this.addLog(entry);
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[${entry.timestamp}] ${message}`, data);
    }
  }

  public info(message: string, data?: any, userId?: string, action?: string, component?: string): void {
    const entry = this.createLogEntry(LogLevel.INFO, message, data, userId, action, component);
    this.addLog(entry);
    console.info(`[${entry.timestamp}] ${message}`, data);
  }

  public warn(message: string, data?: any, userId?: string, action?: string, component?: string): void {
    const entry = this.createLogEntry(LogLevel.WARN, message, data, userId, action, component);
    this.addLog(entry);
    console.warn(`[${entry.timestamp}] ${message}`, data);
  }

  public error(message: string, data?: any, userId?: string, action?: string, component?: string): void {
    const entry = this.createLogEntry(LogLevel.ERROR, message, data, userId, action, component);
    this.addLog(entry);
    console.error(`[${entry.timestamp}] ${message}`, data);
  }

  // Method to get all logs
  public getLogs(): LogEntry[] {
    return [...this.logs];
  }

  // Method to clear logs
  public clearLogs(): void {
    this.logs = [];
    this.saveLogs();
  }

  // Method to export logs as JSON
  public exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  // Method to download logs as file
  public downloadLogs(): void {
    const blob = new Blob([this.exportLogs()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `taxfix-logs-${format(new Date(), 'yyyy-MM-dd-HH-mm-ss')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

// Export a singleton instance
export const logger = Logger.getInstance();
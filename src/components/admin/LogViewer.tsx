// src/components/admin/LogViewer.tsx
import React, { useState, useEffect } from 'react';
import { logger } from '@/utils/logger';
import { LogLevel } from '@/utils/logger';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';

const LogViewer = () => {
  const [logs, setLogs] = useState(logger.getLogs());
  const [filterLevel, setFilterLevel] = useState<LogLevel | 'ALL'>('ALL');

  const filteredLogs = logs.filter(log => 
    filterLevel === 'ALL' || log.level === filterLevel
  );

  const handleDownload = () => {
    logger.downloadLogs();
  };

  const handleClear = () => {
    logger.clearLogs();
    setLogs([]);
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between mb-4">
        <Select
          value={filterLevel}
          onValueChange={(value) => setFilterLevel(value as LogLevel | 'ALL')}
        >
          <option value="ALL">All Levels</option>
          {Object.values(LogLevel).map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </Select>
        <div className="space-x-2">
          <Button onClick={handleDownload}>Download Logs</Button>
          <Button variant="destructive" onClick={handleClear}>Clear Logs</Button>
        </div>
      </div>
      <div className="max-h-[600px] overflow-y-auto">
        {filteredLogs.map((log, index) => (
          <div
            key={index}
            className={`p-2 mb-2 rounded ${
              log.level === LogLevel.ERROR ? 'bg-red-100' :
              log.level === LogLevel.WARN ? 'bg-yellow-100' :
              log.level === LogLevel.INFO ? 'bg-blue-100' :
              'bg-gray-100'
            }`}
          >
            <div className="font-mono text-sm">
              <span className="font-bold">{log.timestamp}</span>
              <span className="ml-2 px-2 py-1 rounded text-white bg-gray-800">
                {log.level}
              </span>
              {log.component && (
                <span className="ml-2 text-gray-600">[{log.component}]</span>
              )}
              {log.action && (
                <span className="ml-2 text-gray-600">({log.action})</span>
              )}
            </div>
            <div className="mt-1">{log.message}</div>
            {log.data && (
              <pre className="mt-1 text-xs bg-gray-800 text-white p-2 rounded overflow-x-auto">
                {JSON.stringify(log.data, null, 2)}
              </pre>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default LogViewer;
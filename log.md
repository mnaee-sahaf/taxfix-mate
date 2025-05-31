This logging system provides:
Different Log Levels: DEBUG, INFO, WARN, ERROR
Structured Logging: Each log entry includes timestamp, level, message, and optional data
User Context: Automatically includes user ID when available
Component Tracking: Tracks which component generated the log
Action Tracking: Tracks what action was being performed
Persistence: Logs are stored in localStorage
Log Management: Ability to view, filter, download, and clear logs
Development Mode: Debug logs only show in development
Memory Management: Limits the number of stored logs
Export Functionality: Ability to download logs as JSON
To use this logging system effectively:
Import and use the useLogger hook in your components
Log important events, errors, and state changes
Use appropriate log levels for different types of events
Include relevant data with your logs
Use the LogViewer component in your admin interface to monitor logs

Must remember to:
Log meaningful information that will help with debugging
Don't log sensitive information
Use appropriate log levels
Include context in your log messages
Clean up logs periodically
Consider implementing server-side logging for production

Heres how we set up logging: 

1. We created a logging utility that can handle different types of logs and then store then in a file, providing different log levels

For this we created a logging utility file and added the following

- log levels
- log entry interface
- created a class called Logger
- created public logging methods
- a method to get all the logs
- a method to clear all the logs
- method to export the logs as JSON
- method to download the logs as a file
- export a singelton instance 

2. Then we created a custom hook to use the logger utility class in react components that we create 

3. Then we created a react component to view our logs, and set it to admin access
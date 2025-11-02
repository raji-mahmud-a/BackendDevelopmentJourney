# Log File Processor

A Node.js utility for filtering and counting log entries by severity level from the application log file.

## Overview

This tool reads the `app.log` file from the user's home directory and filters log entries based on a specified severity level. It streams the file for efficient processing of large log files and outputs matching entries along with a final count.

## Prerequisites

- Node.js (any recent version with `fs` and `os` modules)
- An `app.log` file in your home directory

## Installation

No installation required. This is a standalone script with no external dependencies.

## Usage

```bash
node logFileProcessor.js <SEVERITY_LEVEL>
```

### Arguments

- `SEVERITY_LEVEL`: The log severity level to filter (e.g., `error`, `warn`, `info`, `debug`)

### Examples

Filter and display all ERROR level logs:
```bash
node logFileProcessor.js error
```

Filter and display all WARN level logs:
```bash
node logFileProcessor.js warn
```

Filter and display all INFO level logs:
```bash
node logFileProcessor.js info
```

## Output

The script outputs:
1. Each matching log line to the console as it's found
2. A final count of matching entries

## How It Works

1. Opens a read stream to `~/app.log`
2. Processes the file in chunks for memory efficiency
3. Splits each chunk by newlines
4. Filters lines containing the specified severity level (formatted as `[LEVEL    ]` with 8-character padding)
5. Outputs matching lines and maintains a running count
6. Displays the total count when processing completes

## Error Handling

If the log file cannot be read (e.g., file not found, permission denied), the script will output the error code to the console.

## Generating Test Data

To generate a 2GB dummy log file for testing purposes, run:

```bash
node generate_log.js
```

This will create an `app.log` file in your home directory with sample log entries at various severity levels.

## Log Format

The script expects log entries with severity levels formatted as uppercase, left-padded to 8 characters within square brackets:

```
[ERROR   ] Error message here
[WARN    ] Warning message here
[INFO    ] Information message here
[DEBUG   ] Debug message here
```

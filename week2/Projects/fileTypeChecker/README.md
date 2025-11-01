# File Type Detector

A lightweight Node.js utility that identifies file types by analyzing their binary signatures (magic numbers) rather than relying on file extensions.

## Overview

This tool reads the first 8 bytes of a file and compares them against known file signatures to determine the actual file type. This approach is more reliable than checking file extensions, which can be easily changed or misleading.

## Installation

No external dependencies required. Uses only Node.js built-in modules.

## Usage

```bash
node script.js <file-path>
```

### Example

```bash
node script.js image.png
# Output: PNG

node script.js document.pdf
# Output: PDF
```

## Supported File Types

The detector currently identifies the following formats:

- **Images**: PNG, JPG, BITMAP, TIFF
- **Documents**: PDF, DOC, XLS, PPT
- **Archives**: ZIP, RAR, GZIP, 7z
- **Media**: MP3, MP4, MKV, WEBM, WAV, AVI
- **Executables**: EXE

## How It Works

The utility operates in three stages:

1. **File Reading**: Streams the first 8 bytes of the target file using Node.js streams
2. **Signature Analysis**: Compares the byte sequence against known magic numbers
3. **Type Identification**: Returns the corresponding file type or an error message

### Magic Numbers

Each file format has a unique binary signature at the beginning of the file. For example:

- PNG files start with `89 50 4E 47 0D 0A 1A 0A`
- PDF files begin with the ASCII string `%PDF-`
- ZIP archives start with `50 4B 03 04`

## Error Handling

The tool handles several edge cases:

- Files smaller than 4 bytes return a "file too small" message
- Unrecognized signatures return a specific error message
- File system errors are caught and logged

## Technical Details

- Reads only the minimum necessary bytes (8 bytes maximum)
- Uses streaming for efficient memory usage
- Implements promise-based async operations
- Graceful error handling with proper exit codes

## Limitations

- Only identifies formats with distinctive byte signatures
- Cannot differentiate between some related formats (e.g., MKV and WEBM share signatures)
- Microsoft Office formats (DOC, XLS, PPT) use the same container format and cannot be distinguished by magic numbers alone

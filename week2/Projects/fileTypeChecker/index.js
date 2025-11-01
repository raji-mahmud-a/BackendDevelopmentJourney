import { createReadStream } from 'node:fs';

const filePath = process.argv[2]

const readBytes = (filePath) => {
  if(!filePath){
    console.error("A valid filepath needs to be passed as an argument to the node command!!!")
    process.exit(0)
  }
  return new Promise((resolve, reject) => {
    const readStream = createReadStream(filePath, {
      start: 0,
      end: 7,
    })
    
    const chunks = []
    
    readStream.on('data', (chunk) => {
      chunks.push(chunk)
    })
    
    readStream.on('end', () => {
      const bytes = Buffer.concat(chunks)
      resolve(bytes)
    })
    
    readStream.on('error', (err) => {
      console.log('An error occurred when reading file', err)
      reject(err)
    })
  })
}

const checkBytes = (bytes) => {
  if (bytes.length < 4) {
    return "file too small to infer type"
  } else if (bytes.equals(Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]))) {
    return "PNG"
  } else if (bytes[0] == 0xFF && bytes[1] == 0xD8 && bytes[2] == 0xFF && (bytes[3] == 0xE0 || bytes[3] == 0xE1 )) {
    return 'JPG'
  } else if (bytes[0] == 0x50 && bytes[1] == 0x4B && bytes[2] == 0x03 && bytes[3] == 0x04 ) {
    return 'ZIP'
  } else if (bytes[3] == 0x1A && bytes[4] == 0x45 && bytes[5] == 0xDF && bytes[6] == 0xA3 ) {
    return 'MKV/WEBM'
  } else if (bytes[4] == 0x66 && bytes[5] == 0x74 && bytes[6] == 0x79 && bytes[7] == 0x70) {
    return 'MP4'
  } else if (bytes[0] == 0x49 && bytes[1] == 0x44 && bytes[2] == 0x33) {
    return 'MP3'
  } else if (bytes[0] == 0x4D && bytes[1] == 0x5A) {
    return 'EXE'
  } else if (bytes.toString('ascii', 0, 5) === '%PDF-' ) {
    return 'PDF'
  } else if (bytes.equals(Buffer.from([0x52, 0x61, 0x72, 0x21, 0x1A, 0x07, 0x01, 0x00])) ) {
    return 'RAR'
  } else if (bytes.equals(Buffer.from([0xD0, 0xCF, 0x11, 0xE0, 0xA1, 0xB1, 0x1A, 0xE1]))) {
    return "DOC, XLS, OR PPT"
  } else if (bytes[0] === 0x42 && bytes[1] === 0x4D ) {
    return 'BITMAP'
  } else if ((bytes[0] === 0x49 && bytes[1] === 0x49) || (bytes[0] === 0x4D && bytes[1] === 0x4D)) {
    return 'TIFF'
  } else if (bytes[0] === 0x1F && bytes[1] === 0x8B) {
    return 'GZIP'
  } else if (bytes.slice(0, 6).equals(Buffer.from([0x37, 0x7A, 0xBC, 0xAF, 0x27, 0x1C]))) {
    return '7z'
  } else if (bytes.toString('ascii', 0, 4) === 'RIFF') {
    return 'WAV/AVI'
  } else {
    return 'Sorry..... the file type cannot be inferred from the data binary'
  }
}

const main = async () => {
  try {
    const fileBuffer = await readBytes(filePath)
    const fileType = checkBytes(fileBuffer)
    console.log(fileType)
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
}
main()

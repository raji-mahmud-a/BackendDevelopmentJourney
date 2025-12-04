
import multer from "multer";
import path from "path"

const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/apng",
  "image/avif",
  "image/svg+xml",
  "image/tiff",
  "image/bmp"
]

const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, './static/uploads') },

  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + ext)
  }
})

const upload = multer({
 storage: storage,
  limits: {
   fields: 4,
   fileSize: 5 * 1024 * 1024, // limit image size to 5MB
   files: 1,
   parts: 5
 },
 fileFilter: function(req, file, cb){
  if(allowedTypes.includes(file.mimetype)){cb(null, true)}else{cb(new Error("INVALID_MIME_TYPE"), false)}
 }
})

export default upload

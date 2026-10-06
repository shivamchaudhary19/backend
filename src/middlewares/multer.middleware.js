import multer from "multer";


const storage = multer.diskStorage({
  destination: function (req, file, cb) { // this file contains all the file , so it gives us access
    cb(null, "public/temp") // first parameter null , second destination
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname) // keep the name of file as original
    }
})

export const upload = multer({
    storage, 
})
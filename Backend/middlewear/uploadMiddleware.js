const multer = require('multer');
const path = require('path');
const fs = require('fs');

const createUploadMiddleware = (folderName, fieldName) => {
  const uploadPath = path.join(__dirname, `../src/uploads/${folderName}`);

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  return multer({
    storage: storage,
    limits: { fileSize: 1000000 }, 
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|gif|webp/;
      const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = fileTypes.test(file.mimetype);

      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb('Error: Images Only!');
      }
    }
  }).single(fieldName);
};

module.exports = createUploadMiddleware;
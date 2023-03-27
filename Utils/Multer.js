const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.PATH_DOC);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploadDoc = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
}).single("Documentation");

module.exports = { uploadDoc };

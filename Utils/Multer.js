const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    return {
      folder: "PFE",
      resource_type: "raw",
      public_id: file.originalname, // use the original filename as public_id
    };
  },
});
const uploadDoc = multer({
  storage: storage,
}).fields([{ name: "Documentation", maxCount: 1 }]);

module.exports = { uploadDoc };

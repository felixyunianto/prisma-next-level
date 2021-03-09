const multer = require("multer");
const path = require("path");

const form = require("./form");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/image");
  },
  filename: (req, file, cb) => {
    const nameFormat = `${Date.now()}-${file.fieldname}${path.extname(
      file.originalname
    )}`;
    cb(null, nameFormat);
  },
});

const upload = multer({
  storage,
  // fileFilter : (req, file, cb) => {
  //   const ext = path.extname(file.originalname);
  //   console.log(ext);
  //   if (
  //     ext !== ".jpg" &&
  //     ext !== ".png" &&
  //     ext !== ".jpeg" &&
  //     ext !== ".svg" &&
  //     ext !== ".gif"
  //   ) {
  //     return cb(null, "Error");
  //   }
  // },
  limits: 2 * 1000 * 1000,
});

const singleUpload = (req, res, next) => {
  const uploadSingle = upload.single("image");
  uploadSingle(req, res, (err) => {
    if (err) {
      form.error(res, {
        msg: "Multer Error",
        err,
      });
    } else {
      next();
    }
  });
};

module.exports = singleUpload;

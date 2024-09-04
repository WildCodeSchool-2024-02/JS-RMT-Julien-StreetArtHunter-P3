const multer = require("multer");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (file.fieldname === "streetart") {
      cb(null, "public/assets/streetarts");
    } else if (file.fieldname === "proofs") {
      cb(null, "public/assets/proofs");
    } else {
      cb(null, "public/");
    }
  },
  filename(req, file, cb) {
    const fileArray = file.originalname.split(".");
    const extension = fileArray.pop();
    const id = Date.now();
    cb(null, `${fileArray.join("-")}-${id}.${extension}`);
  },
});

const upload = multer({ storage });

module.exports = upload;

const multer = require('multer');
const path = require('path');

const storage = (folder) =>
  multer.diskStorage({
    destination: `./uploads/images/${folder}`,
    filename: (req, file, cb) => {
      return cb(
        null,
        `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });

const upload = (folder) => multer({ storage: storage(folder) });

module.exports = upload;

const multer = require("multer");
const path = require("path");

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Setting file destination");
    cb(null, path.join(__dirname, "../public/faculty.xlsx"));
  },
  filename: (req, file, cb) => {
    console.log("Setting file name");
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// Initialize upload variable
const upload = multer({
  storage,
//   limits: { fileSize: 10000000 }, // Limit file size to 10MB
  fileFilter: (req, file, cb) => {
    console.log("Checking file type");
    checkFileType(file, cb);
  },
});

// Check file type
function checkFileType(file, cb) {
  const filetypes = /xlsx|xls|xlsm/; // Allow Excel files
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Only Excel files are allowed!");
  }
}

module.exports = upload;

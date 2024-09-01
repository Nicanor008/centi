"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resizeImage = exports.imagesUpload = exports.imageUpload = exports.fileUpload = exports.avatarUpload = void 0;
var _mime = _interopRequireDefault(require("mime"));
var _crypto = _interopRequireDefault(require("crypto"));
var _path = _interopRequireDefault(require("path"));
var _fs = _interopRequireDefault(require("fs"));
var _multer = _interopRequireDefault(require("multer"));
var _axios = _interopRequireDefault(require("axios"));
var _sharp = _interopRequireDefault(require("sharp"));
var _config = _interopRequireDefault(require("../config"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const localStorage = _multer.default.diskStorage({
  destination: function (req, file, callback) {
    const uploadFolder = _path.default.join(__dirname, "..", "..", "uploads");
    if (!_fs.default.existsSync(uploadFolder)) {
      _fs.default.mkdirSync(uploadFolder);
    }
    callback(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    _crypto.default.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString("hex") + Date.now() + "." + _mime.default.getExtension(file.mimetype));
    });
  }
});

// const generateFileName = async fileExt => {
//   const raw = await pseudoRandomBytesAsync(16);
//   const fileName = raw.toString("hex") + Date.now() + "." + fileExt;
//   return fileName;
// };

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif" || file.mimetype == "video/mp4") {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only .png, .jpg and .jpeg .gif .mp4 format allowed!"));
  }
};
const fileFilterAllImageVideo = (req, file, cb) => {
  const acceptedTypes = file.mimetype.split("/");
  if (acceptedTypes[0] === "image" || acceptedTypes[0] === "video") {
    cb(null, true);
  } else {
    cb(null, false);
    cb(new Error("Only images and videos formats allowed!"));
  }
};
const upload = (0, _multer.default)({
  storage: localStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE
  }
});
const uploadS3 = (0, _multer.default)({
  storage: s3Storage,
  fileFilter: fileFilterAllImageVideo,
  limits: {
    fileSize: MAX_FILE_SIZE
  }
});
const resizeImage = async (imageUrl, width, height) => {
  // let cachedCompositeInput = null;
  const input = (await (0, _axios.default)({
    url: imageUrl,
    responseType: "arraybuffer"
  })).data;
  return await (0, _sharp.default)(input)
  // .composite({ input: cachedCompositeInput })
  .resize({
    width: width,
    height: height
  }).webp({
    lossless: true
  }).toBuffer();
};
exports.resizeImage = resizeImage;
const avatarUpload = exports.avatarUpload = upload.single("avatar");
const imageUpload = exports.imageUpload = upload.single("image");
const imagesUpload = exports.imagesUpload = upload.array("images", 12);
const fileUpload = exports.fileUpload = upload.single("file");
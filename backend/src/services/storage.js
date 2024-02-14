import mime from "mime";
import crypto from "crypto";
import path from "path";
import fs from "fs";
import multer from "multer";
import axios from "axios";
import sharp from "sharp";

import config from "../config";

const localStorage = multer.diskStorage({
  destination: function(req, file, callback) {
    const uploadFolder = path.join(__dirname, "..", "..", "uploads");
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder);
    }
    callback(null, uploadFolder);
  },
  filename: function(req, file, cb) {
    crypto.pseudoRandomBytes(16, function(err, raw) {
      cb(
        null,
        raw.toString("hex") +
          Date.now() +
          "." +
          mime.getExtension(file.mimetype)
      );
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
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/gif" ||
    file.mimetype == "video/mp4"
  ) {
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

const upload = multer({
  storage: localStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE
  }
});

const uploadS3 = multer({
  storage: s3Storage,
  fileFilter: fileFilterAllImageVideo,
  limits: {
    fileSize: MAX_FILE_SIZE
  }
});

export const resizeImage = async (imageUrl, width, height) => {
  // let cachedCompositeInput = null;
  const input = (await axios({ url: imageUrl, responseType: "arraybuffer" }))
    .data;
  return await sharp(input)
    // .composite({ input: cachedCompositeInput })
    .resize({ width: width, height: height })
    .webp({ lossless: true })
    .toBuffer();
};

export const avatarUpload = upload.single("avatar");
export const imageUpload = upload.single("image");
export const imagesUpload = upload.array("images", 12);
export const fileUpload = upload.single("file");

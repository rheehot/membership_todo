/* eslint-disable indent */
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const uuidv1 = require('uuid/v1');

const endpoint = new aws.Endpoint(process.env.NC_ENDPOINT);

const s3 = new aws.S3({
  endpoint,
  accessKeyId: process.env.NC_ACCESS_KEY,
  secretAccessKey: process.env.NC_SECRET_KEY,
  region: process.env.NC_REGION,
});

const upload = multer({
  fileFilter(_, file, callback) {
    const ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(new Error('허용되지 않는 파일형식'));
    }
    callback(null, true);
  },

  storage: multerS3({
    s3,
    bucket: process.env.NC_BUCKET,
    key(req, file, cb) {
      cb(null, `images/${uuidv1()}.${file.mimetype.split('/')[1]}`);
    },
    acl: 'public-read',
  }),
});

const deleteFile = (url) => s3.deleteObject(
    {
      Bucket: process.env.NC_BUCKET,
      Key: `images/${url.split('images/')[1]}`,
    },
    (err, data) => {
      if (err) throw err;
    },
  );

module.exports = { upload, deleteFile };

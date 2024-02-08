const express = require('express');
const fileRouter = express.Router();
const FileError = require('../core/errors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, '../uploads');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, '_' + Date.now() + '.' + file.mimetype.split('/')[1]);
  },
});

const upload = multer({ storage: storage });

fileRouter.post('/files', upload.single('file'), async (req, res) => {
  try {
    res.status(201).json({ fileId: req.file.filename });
  } catch (error) {
    console.log(error);
    FileError.handleFileError(error, res);
  }
});

fileRouter.get('/files/:fileId', async (req, res) => {
  try {
    const filename = req.params.fileId;
    const filePath = path.join('uploads', filename);
    imageUrl = `${req.protocol}://${req.get('host')}/${filePath}`;
    res.status(200).json(imageUrl);
  } catch (error) {
    console.log(error);
    FileError.handleFileError(error, res);
  }
});

fileRouter.get('/allFiles', async (req, res) => {
  try {
    const filePath = path.join(__dirname, '..', 'uploads');
    let imageUrls = [];
    fs.readdirSync(filePath).forEach((file) => {
      imageUrls.push(`${req.protocol}://${req.get('host')}/uploads/${file}`);
    });
    res.status(200).json(imageUrls);
  } catch (error) {
    console.log(error);
    FileError.handleFileError(error, res);
  }
});

fileRouter.delete('/files/:fileId', async (req, res) => {
  try {
    const filename = req.params.fileId;
    const filePath = path.join(__dirname, '..', 'uploads', filename);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err);
        return FileError.handleFileError(err, res);
      }
      res.status(200).json('File deleted successfully');
    });
  } catch (error) {
    console.log(error);
    FileError.handleFileError(error, res);
  }
});

module.exports = fileRouter;

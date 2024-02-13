/*
*** Below is an example of how you might implement basic file serving and uploading using only 
Node.js's built-in modules and formidable. This example does not cover all the functionalities 
provided by Express server but gives a starting point for serving files and handling uploads.
***
*/

const http = require('http');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;

const uploadDir = path.join(__dirname, 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/uploads/') && req.method.toLowerCase() === 'get') {
    const filePath = path.join(__dirname, req.url);
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
      res.end(content);
    });
  }
  else if (req.url === '/api/files' && req.method.toLowerCase() === 'post') {
    const form = new formidable.IncomingForm();
    form.uploadDir = uploadDir;
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal server error');
        return;
      }
      const oldPath = files.file.filepath;
      const newPath = path.join(
        uploadDir,
        '_' + Date.now() + path.extname(files.file.originalFilename)
      );
      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          console.error(err);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal server error');
          return;
        }
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ fileId: path.basename(newPath) }));
      });
    });
  }
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

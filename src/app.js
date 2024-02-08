const express = require('express');
const app = express();
const PORT = process.env.PORT || '3001';
const fileRouter = require('./files/file-routes');
const path = require('path');

app.use('/api', fileRouter);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

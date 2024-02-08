const { StatusCodes, ErrorMessages, FILE_ERROR } = require('./values');

class FileError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.name = FILE_ERROR;
    this.statusCode = statusCode;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FileError);
    }
  }

  static handleFileError(error, res) {
    let statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    let errorMessage = error.message || ErrorMessages.INTERNAL_SERVER_ERROR;

    res.status(statusCode).json({ message: errorMessage });
  }
}

module.exports = FileError;

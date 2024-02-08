/* 
* This file contains all the values (magic or not) used within the application
*/


const FILE_ERROR = 'FileError';


const ErrorMessages = {
	EMPTY_DATA : 'Empty data provided',
	FILE_NOT_FOUND : 'File not found',
	FILE_DELETE_ERROR : 'Error deleting file'
};


const StatusCodes = {
	OK: 200,
	CREATED: 201,
	BAD_REQUEST: 400,
	FILE_NOT_FOUND: 404,
	INTERNAL_SERVER_ERROR: 500
};



module.exports = {FILE_ERROR, ErrorMessages, StatusCodes};

const winston = require('winston');
const fs = require('fs');
require('winston-daily-rotate-file');
require('winston-mongodb');
require('winston-mail');

//winston.setLevels(winston.config.npm.levels);
winston.addColors(winston.config.npm.colors);

//winston options for various logging type
let options = require('./config/logger-settings');

//create directory if it is not present
if (!fs.existsSync(options.logDirectory)) {
    // Create the directory if it does not exist
    fs.mkdirSync(options.logDirectory);
}

module.exports = winston.createLogger({
    transports: [
        new winston.transports.DailyRotateFile(options.file),
        new winston.transports.MongoDB(options.database),
        new winston.transports.Mail(options.mail)
    ],
    exceptionHandlers: [
        new winston.transports.DailyRotateFile(options.file),
        new winston.transports.MongoDB(options.database),
        new winston.transports.Mail(options.mail)
    ],
    exitOnError: false, // do not exit on handled exceptions
});
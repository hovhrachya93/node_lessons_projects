const logDirectory = './logs';

module.exports = {
    logDirectory,
    file: {
        level: process.env.ENV === 'development' ? 'debug' : 'info',
        filename: logDirectory + '/%DATE%-logsDemo.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        timestamp: true,
        json: true,
        maxsize: 5242880, // 5MB
        colorize: true,
    },
    database: {
        db: 'mongodb://localhost:27017',
        level: process.env.ENV === 'development' ? 'debug' : 'info',
    },
    mail: {
        level: 'error',
        to: 'levonyan.levon@gmail.com',
        from: 'nodejscoursemailer@gmail.com',
        subject: 'An Error Occured On Server. Please Check IT ASAP',
        host: 'smtp.gmail.com',
        username: 'nodejscoursemailer@gmail.com',
        password: 'yobrmjcphtkztqac',
        ssl: true
    }
}
const winston = require('winston');

const appSettings = {
    winston: {
        sillyLogConfig: {
            level: 'silly',
            transports: [
                new winston.transports.File({
                    filename: './logs/silly.log'
                }),
                new winston.transports.Console()
            ]
        },
    }
};

module.exports = appSettings;

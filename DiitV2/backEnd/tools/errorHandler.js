const logError = ((message)=>{
    const fs = require('fs');
    const path = require('path');
    const logFilePath = path.join('../../', 'app.log');
        const timestamp = new Date().toLocaleString();
        let logMessage;
        if (message.stack) {
            logMessage = `[${timestamp}] ${message.stack} \n`;
        }
        else {
            logMessage = `[${timestamp}] ${message} \n`;
        }
        fs.appendFile(logFilePath, logMessage, (err) => {
            if (err) {
                console.error('Error occured While Writing to log file : ', err);
            }
        });
})
class ErrorHandler extends Error{
    constructor(statusCode,message){
        super(message);
        this.statusCode= statusCode;
        if(this.statusCode==500){
            logError(message);
        }
    }
}
module.exports = ErrorHandler;
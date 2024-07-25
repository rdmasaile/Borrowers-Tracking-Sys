const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const {format} = require('date-fns');
const {v4} = require('uuid');

const logEvents = async (message,fileName)=>{
   const dateTime = `${format(new Date(),'dd/MM/yyyy\tHH:mm:SS')}`;
   const logItem = `${dateTime}\t${v4()}\t${message}\n`;

   try {
      if(!fs.existsSync('logs')){
         await fsPromises.mkdir(path.join('logs'),(err)=>{
            console.error(err);
         });
      }
      // console.log(__dirname)
      await fsPromises.appendFile(path.join(__dirname,'..','logs', fileName),logItem,(err)=>{
         console.error(err)
      });

   } catch (error) {
      console.log(error);
   }
}

const logger = (req,_res,next)=>{
   logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`,'reqLogs.txt');
   console.log(`${req.method}\t ${req.path}`);
   next();
}

module.exports = {logger,logEvents};
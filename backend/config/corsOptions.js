const whitelist = [
   'http://localhost:3000',
   'http://192.168.43.108:3000',
   
];

const corsOptions = {
   credentials:true,
   origin:(origin,callback)=>{
      if(whitelist.indexOf(origin) !== -1 || !origin){
         callback(null,true);
      }else{
         callback(new Error('Not allowed by CORS'));
      }
   },
   optionSuccessStatus: 200
}

module.exports = corsOptions;
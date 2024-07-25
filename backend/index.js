require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOptions');
const { refreshToken, verifyToken } = require('./controllers/authController');
const { getUser } = require('./controllers/userController');
// const cookieParser = require('cookieparser')
//Custom Middleware
app.use(logger);
// app.use(cookieParser());
app.use(cors(corsOptions));

//build-in express Middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/',require('./routes/root'));
app.use('/user',require('./routes/api/userRoutes'));
app.use('/login',require('./routes/api/loginRoutes'));
app.use('/refresh',refreshToken,verifyToken,getUser);
app.use(verifyToken);
app.use('/transaction',require('./routes/api/transactionRoutes'));
app.use('/borrower',require('./routes/api/borrowerRoutes'));

app.all('/*',(req,res)=>{
   res.status(404).json({"message":"NOT FOUND"});
});

app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server listening on port ${PORT}...`))
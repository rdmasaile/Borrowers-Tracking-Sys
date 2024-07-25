require('dotenv').config();
const user = require('../models/userModel');
const Joi = require('joi');
const bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req,res,next) =>{
   const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
   })
   const {error, value} = schema.validate(req.body);

   if(error) return res.status(400).json({message: error.details[0].message});
   try {
      const existingUser = await user.login(req.body.email);
      if(!existingUser) return res.sendStatus(401);

      const match = await bcrypt.compare(value.password,existingUser.password);

      if(!match) return res.sendStatus(401);
      
      delete existingUser.password; //Remove Password from the user details

      const token = jwt.sign({id:existingUser.id},process.env.JWT_SECRET_KEY,{expiresIn:'1hr'});
      // res.headers['Authorization'] = `Bearer ${token}`;
      res.cookie(String(existingUser.id),token,{
         path:'/',
         expires: new Date(Date.now() + 1000 * 1000),
         httpOnly: true,
         sameSite:'lax'
      })

      return res.json({message:`Successfully logged in`,user:existingUser,token});

   } catch (error) {
      return res.status(404).json({message: error.message })
   }
}

const verifyToken = (req,res,next) => {
   // const cookies = req.headers.cookie;
   // if (!cookies) {
   //    return res.status(404).json({message:'Not Found Cookies'});
   // }
   // const token = cookies.split("=")[3];

   const authHeader = req.headers['authorization'];

   if(!authHeader) return res.status(401);

   const token = authHeader?.split(' ')[1];

   jwt.verify(String(token),process.env.JWT_SECRET_KEY,(err,user)=>{
      if(err){
         return res.status(403).json({message:'Invalid Token'});
      }
      req.id = user.id;
      next();
   });
}
const refreshToken = (req,res,next)=>{
   // const cookies = req.headers.cookie;
   // if (!cookies) {
   //    return res.status(404).json({message:'Not Found Cookies'});
   // }
   const bearer = req.headers['authorization'];

   // const prevToken = cookies.split("=")[1];
   const prevToken = bearer?.split(' ')[1];
   if(!prevToken){
      return res.status(403).json({message:'Not Found Prev Token'});
   }
   jwt.verify(String(prevToken),process.env.JWT_SECRET_KEY,(err,user)=>{
      if(err){
         console.error('expireAt',err.expiredAt);
         return res.status(403).json({message:'Authentication Failed'});
      }
      res.clearCookie(`${user.id}`);
      req.headers.cookie[`${user.id}`] = "";

      const token = jwt.sign({id:user.id},process.env.JWT_SECRET_KEY,{expiresIn:'1hr'});
      res.headers['authorization'] = `Bearer ${token}`;
      res.cookie(String(user.id),token,{
         path:'/',
         expires: new Date(Date.now() + 1000 * 1000),
         httpOnly: true,
         sameSite:'lax'
      })
      req.id = user.id;
      next();
   })
}
module.exports = {handleLogin,verifyToken,refreshToken}
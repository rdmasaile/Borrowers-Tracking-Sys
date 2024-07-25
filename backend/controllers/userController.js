const user = require('../models/userModel');
const Joi = require('joi');
const bcrypt  = require('bcrypt');

const getUser = async (req,res,next) =>{
   
   try {
      const existingUser = await user.findById(req.id)

      return res.json({user:existingUser[0]});
   } catch (error) {
      //return res.status(404).json(error.message)
      next(error);
   }
}

const storeUser = async (req,res,next) =>{
   
   const {error,value} = validateUser(req.body,'store');

   if(error) return res.status(502).json({message: error.details[0].message})
   

   const values = {...value,password:encyptDetails(value.password)};

   try {
      const urs= await user.save(values);
      res.json(value);      
   } catch (error) {
      let status = 404
      if(error.errno == 1062){
         status = 400
         error.message = "Choosen email is already taken"
      }
      res.status(status).json({message:error.message})
   }
}

const updateUser = async (req,res) =>{
   const id = req.id;
   const {error,value} = validateUser(req.body,'update');

   if(error){
      const errorMsg = error.details[0].message
      return res.status(400).json(errorMsg)
   }

   const values = {...value,password:encyptDetails(value.password),id};
   try {
      const data = await user.update(values);
      res.json({message:`Successfully updated ${values.fname}'s details`})
   } catch (error) {
      let status = 404
      if(error.errno == 1062){
         status = 400
         error.message = "Choosen email is already taken"
      }
      res.status(status).json({message:error.message})
   }
      
}

const deleteUser = async (req,res) =>{
   const id = req.id;
   try {
      const data = await user.delete(id);
      if(data.affectedRows == 1){
         return res.json({message:`Successfully deleted user: ${req.body.fname}`});
      }
      return res.json({user:data});
   } catch (error) {
      return res.status(404).json({message:error.message})
   }
}

const getUserById = async (req,res,next) =>{
   const {id} = req.params;

   if(isNaN(Number(id))){
      return res.status(400).json({message:`Invalid parameter ${id}`});
   }
   
   try {
      const existingUser = await user.findById(id)

      return res.json(existingUser);
   } catch (error) {
      res.status(404).json(error.message)
   }
}

const encyptDetails = (details) =>{
   const saltRounds = 10;
   const salt = bcrypt.genSaltSync(saltRounds);
   const hashedDetails = bcrypt.hashSync(details, salt);

   return hashedDetails;
}
const validateUser = (reqBody,method) =>{
   const schema = Joi.object({
      id:(method === 'store')?Joi.number():Joi.number().required(),
      fname: Joi.string().min(3).max(255).required(),
      lname: Joi.string().min(3).max(255).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(255).required(),
   })

   return schema.validate(reqBody)
}


module.exports = {getUser,storeUser,updateUser,deleteUser,getUserById}
const category = require("../models/categoryModel");
const Joi = require('joi');
const {exists} = require('../validation/validation');

const getAllCategories = async (req,res,next) =>{
   const userId = req.id;
   try {
      const cart = await category.findAllByUserId(userId);
      return res.json({categories:cart});
   } catch (error) {
      console.error(error);
      next(error);
   }
}

const storeCategory = async (req,res) =>{
   const userId = req.id;
   const {error,value} = validateCategory(req.body,"store");

   if(error){
      const errorMsg = error.details[0].message
      return res.status(400).json({message: errorMsg})
   }

   if(!await exists("users","id",userId)){
      return res.status(404).json({message: `User with id : ${userId} not Found`})
   }

   try {
      const cart = await category.save({...value,userId});
      return res.json({message:'Successfully added a new cartegory',category:value});      
   } catch (error) {
      // console.log(error);
      return res.status(400).json({message : (error.message)?error.message:error.sqlMessage});
   }
}
const updateCategory = async (req,res) =>{
   const userId = req.id;
   const {error,value} = validateCategory(req.body,"update");

   if(error){
      const errorMsg = error.details[0].message
      return res.status(400).json(errorMsg)
   }

   if(!await exists("users","id",userId)){
      return res.status(404).json({message: `User with id : ${userId} not Found`})
   }

   try {
      const data = await category.update({...value,userId});
      return res.json({message:`Successfully updated details`,category:value})
   } catch (error) {
      let status = 404
      console.log(error);
      return res.status(status).json({message:error.message})
   }
}
const deleteCategory =  async (req,res) =>{
   const userId = req.id;
   const schema = Joi.object({
      id : Joi.number().required(),
   });

   const {error,value} = schema.validate(req.body)

   if(error){
      const errorMsg = error.details[0].message
      return res.status(400).json(errorMsg)
   }

   if(!await exists("users","id",userId)){
      return res.status(404).json({message: `User with id : ${userId} not Found`})
   }

   try {
      const data = await category.delete({...value,userId});
      if(data.affectedRows > 0){
         return res.json({message:`Successfully deleted the Category`});
      }
      return res.json(data);
   } catch (error) {
      return res.status(404).json({message:error.message})
   }
}

const validateCategory = (reqBody,method) =>{
   const schema = Joi.object({
      id: (method === 'store')?Joi.number():Joi.number().required(),
      name: Joi.string().min(3).max(255).required(),
   })

   return schema.validate(reqBody)
}
module.exports = {getAllCategories, storeCategory, updateCategory, deleteCategory};
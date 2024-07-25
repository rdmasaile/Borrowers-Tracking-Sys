const borrower = require("../models/borrowerModel");
const Joi = require('joi');
const {exists} = require('../validation/validation');

const getOwingBorrowers = async(req,res,next)=>{
   try {
      const borrowers = await borrower.findOwingBorrowers(req.id);
      return res.json({borrowers});
      
   } catch (error) {
      
   }
}
const getAllBorrowers = async (req,res,next) =>{
   const userId = req.id;
   try {
      const borrowers = await borrower.findAllById(userId);
      return res.json({borrowers});
   } catch (error) {
      console.error(error);
      next(error);
   }
}

const storeBorrower = async (req,res) =>{
   const userId = req.id;
   const {error,value} = validateBorrower(req.body,"store");
   if(error){
      const errorMsg = error.details[0].message
      return res.status(400).json({message: errorMsg})
   }

   if(!await exists("users","id",userId)){
      return res.status(404).json({message: `User with id : ${userId} not Found`})
   }

   try {
      const borr = await borrower.save({...value,userId});
      console.log(borr);
      return res.json({message:'Successfully added a new borrower',borrower:borr});      
   } catch (error) {
      // console.log(error);
      return res.status(400).json({message : (error.message)?error.message:error.sqlMessage});
   }
}
const updateBorrower = async (req,res) =>{
   const userId = req.id;
   const {error,value} = validateBorrower(req.body,"update");

   if(error){
      const errorMsg = error.details[0].message
      return res.status(400).json(errorMsg)
   }

   if(!await exists("users","id",userId)){
      return res.status(404).json({message: `User with id : ${userId} not Found`})
   }

   try {
      const data = await borrower.update({...value,userId});
      return res.json({message:`Successfully updated details`,borrower:value})
   } catch (error) {
      let status = 404
      console.log(error);
      return res.status(status).json({message:error.message})
   }
}
const deleteBorrower =  async (req,res) =>{
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
      const data = await borrower.delete({...value,userId});
      if(data.affectedRows > 0){
         return res.json({message:`Successfully deleted the borrower`});
      }
      return res.json(data);
   } catch (error) {
      return res.status(404).json({message:error.message})
   }
}

const validateBorrower = (reqBody,method) =>{
   const schema = Joi.object({
      id: (method === 'store')?Joi.number():Joi.number().required(),
      fname: Joi.string().min(2).max(100).required(),
      lname: Joi.string().min(2).max(100).required(),
      village: Joi.string().min(2).max(100).required(),
      contacts: Joi.string().min(2).max(20).required(),
   })

   return schema.validate(reqBody)
}
module.exports = {getOwingBorrowers,getAllBorrowers, storeBorrower, updateBorrower, deleteBorrower};
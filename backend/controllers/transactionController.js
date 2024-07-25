const transaction = require("../models/transactionModel");
const Joi = require('joi');
const {exists} = require('../validation/validation');

const getAllTransactions = async (req,res) =>{
   const userId = req.id;
   try {
      const trans = await transaction.findAllByUserId(userId);
      return res.json({transactions:trans});
   } catch (error) {
      console.error(error);
      next(error);
   }
}

const storeTransaction = async (req,res) =>{
   const userId = req.id;
   const {error,value} = validateTransaction(req.body,"store");

   if(error){
      const errorMsg = error.details[0].message
      return res.status(400).json({message: errorMsg})
   }

   if(!await exists("borrowers","user_id",userId)){
      return res.status(404).json({message: `User with id : ${userId} not Found`})
   }
   if(!await exists("borrowers","id",value.borrower_id)){
      return res.status(404).json({message: `Borrower with id : ${value.borrower_id} not Found`})
   }

   try {
      const trans = await transaction.save({...value,userId});
      return res.json({message:'Successfully added a new Transaction',transaction:value});      
   } catch (error) {
      // console.log(error.sqlMessage);
      return res.status(400).json({message : error.sqlMessage});
   }
}
const updateTransaction = async (req,res) =>{
   const userId = req.id;
   const {error,value} = validateTransaction(req.body,'update');

   if(error){
      const errorMsg = error.details[0].message
      return res.status(400).json(errorMsg)
   }
   try {
      const data = await transaction.update({...value,userId});
      return res.json({message:`Successfully updated details`,transaction:value})
   } catch (error) {
      let status = 404
      console.log(error);
      return res.status(status).json({message:error.message})
   }
}
const deleteTransaction =  async (req,res) =>{
   const userId = req.id;
   const schema = Joi.object({
      id : Joi.number().required(),
      borrower_id : Joi.number().required(),
   });

   const {error,value} = schema.validate(req.body)

   if(error){
      const errorMsg = error.details[0].message
      return res.status(400).json(errorMsg)
   }

   try {
      const data = await transaction.delete({...value,userId});
      if(data.affectedRows == 1){
         return res.json({message:`Successfully deleted the transaction`});
      }
      return res.json(data);
   } catch (error) {
      return res.status(404).json({message:error.message})
   }
}

const validateTransaction = (reqBody,method) =>{
   const schema = Joi.object({
      id: (method === "store")?Joi.number():Joi.number().required(),
      borrower_id: Joi.number().required(),
      amount: Joi.number().required(),
      status:Joi.number().integer().valid(1,2).required(),
      description:Joi.string().max(255),
   })

   return schema.validate(reqBody)
}
module.exports = {getAllTransactions, storeTransaction, updateTransaction, deleteTransaction};
const express = require('express');
const router = express.Router();
const path = require("path");
const { verifyToken } = require('../../controllers/authController');
const transactionController = require('../../controllers/transactionController')

router.route('/')
   .get(verifyToken,transactionController.getAllTransactions)
   .post(verifyToken,transactionController.storeTransaction)
   .put(verifyToken,transactionController.updateTransaction)
   .delete(verifyToken,transactionController.deleteTransaction)

module.exports = router;
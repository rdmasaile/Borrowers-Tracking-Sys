const express = require('express');
const router = express.Router();
const borrowerController = require('../../controllers/borrowerController');

router.route('/')
   .get(borrowerController.getAllBorrowers)   
   .post(borrowerController.storeBorrower)
   .put(borrowerController.updateBorrower)
   .delete(borrowerController.deleteBorrower)

router.route('/owing').get(borrowerController.getOwingBorrowers);
module.exports = router;
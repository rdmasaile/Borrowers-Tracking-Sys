const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/categoryController')

router.route('/')
   .get(categoryController.getAllCategories)
   .post(categoryController.storeCategory)
   .put(categoryController.updateCategory)
   .delete(categoryController.deleteCategory)

module.exports = router;
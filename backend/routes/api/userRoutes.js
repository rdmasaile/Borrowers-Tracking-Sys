const express = require('express');
const router = express.Router();
const path = require("path");
const userController = require('../../controllers/userController');
const {verifyToken} = require('../../controllers/authController');

router.route('/')
   .get(verifyToken,userController.getUser)
   .post(userController.storeUser)
   .put(verifyToken,userController.updateUser)
   .delete(verifyToken,userController.deleteUser)

// router.route('/:id').get(verifyToken,userController.getUserById)
module.exports = router;
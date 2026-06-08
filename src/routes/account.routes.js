const express = require('express');
const authMiddleware = require('../middleware/auth.middleware').authMiddlware
const accountController = require('../controllers/account.controller')


const router = express.Router()


//POST   /api/accounts/
//create a new account 

router.post("/" , authMiddleware , accountController.createAccountController)




module.exports =  router
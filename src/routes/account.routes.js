const express = require('express');
const authMiddleware = require('../middleware/auth.middleware').authMiddleware
const accountController = require('../controllers/account.controller')


const router = express.Router()


//POST   /api/accounts/
//create a new account 

router.post("/" , authMiddleware , accountController.createAccountController)



//get api for user account 
router.get("/", authMiddleware , accountController.getUserAccountsController)


//get account balance 
router.get("/balance/:accountId" , authMiddleware , accountController.getAccountBalanceController)

module.exports =  router
const {Router} = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const transactionController = require('../controllers/transaction.controller')

const transactionRoutes = Router();

//POST /api/transactions/
//create a new transaction

transactionRoutes.post("/system/initial-funds" , authMiddleware.authMiddlware, transactionController.createInitialFundstransaction)

module.exports = transactionRoutes;
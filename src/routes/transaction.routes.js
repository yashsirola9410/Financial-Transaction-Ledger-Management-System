const {Router} = require('express')
const authMiddleware = require('../middleware/auth.middleware')

const transactionController = require('../controllers/transaction.controller')

const transactionRoutes = Router();

//POST /api/transactions/
//create a new transaction

transactionRoutes.post("/", authMiddleware.authMiddleware, transactionController.createTransaction)


//for system user to create initial funds transaction to user account
transactionRoutes.post("/system/initial-funds" , authMiddleware.authSystemUserMiddleware, transactionController.createInitialFundsTransaction)

module.exports = transactionRoutes;
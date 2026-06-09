const transactionModel = require('../models/transaction.models')
const ledgerModel = require('../models/ledger.models')
const  emailService = require('../services/email.service')
const accountModel = require('../models/account.models')


//create new transaction 
  //1 - Validate request 
  //2 validate Idempotancy key
  //3 - check account status
  //4 - driver sender balance from ledger 
  //5- create transaction with pending status
  //6 - create debit leadger entry 
  //7 - create credit ledger entry
  //8 - Mark transaction completed 
  //9 - commit mongoDb session 
  //10 - Send email notification


  async function createTransaction(req , res){
     
    const  {fromAccount , toAccount , amount , idempotencyKey} = req.body


  }


  

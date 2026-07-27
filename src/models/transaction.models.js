const mongoose = require('mongoose')


const transactionSchema = new mongoose.Schema({
    fromAccount : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "account",
        required: [true , "From account is required for a transaction"],
        index : true
    },

    toAccount : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "account",
        required : [true , "To account is required  for a transaction"],
        index : true 
    },

    status : {
        type :String,
        enum : {
            values : ["PENDING" , "COMPLETED" , "FAILED" , "REVERSED"],
            message : "Status can be either PENDING , COMPLETED , FAILED or REVERSED", 
        },
        default : "PENDING"
    },

    amount : {
        type : String,
        required : [true , "Amount is required for a transaction"],
        min : [0 , "Transaction amount cannot be negative"]
    },

    idempotencyKey : {
        type : String,
        required : [true , "Idempotency key is required for creating a transaction"],
        index : true , 
        unique : true 
    }
},{
    timestamps : true
})


const transactionModel = mongoose.model("transaction" , transactionSchema)

module.exports = transactionModel
const mongoose = require('mongoose')

const ledgerSchema = new mongoose.Schema({
    account : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "account", 
        required : [true , "Account is required for a ledger entry"],
        index : true ,
        immutable : true
    },

    amount : {
        type : Number ,
        required : [true , "Amount is required for a ledger entry "],
        immutable : true 
    },
    
    transaction : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "transaction",
        required : [true , "transaction is required for a ledger enrty"],
        index : true ,
        immutable : true 
    },

    type:{
        type : String ,
        enum : {
            values : ["CREDIT" , "DEBIT"],
            message : "Type  can either be CREDIT or DEBIT",
        },
        reuired : [true , "Ledger entry type is required"],
        immutable : true,
    }
})

function preventLedgerModification(){
    throw new Error("Ledger entries cannot be modified once created")
}

ledgerSchema.pre('findOneAndUpdate' , preventLedgerModification);
ledgerSchema.pre('updateOne' , preventLedgerModification);
ledgerSchema.pre('updateMany' , preventLedgerModification);
ledgerSchema.pre('update' , preventLedgerModification);
ledgerSchema.pre('deleteMany' , preventLedgerModification);
ledgerSchema.pre('deleteOne' , preventLedgerModification);
ledgerSchema.pre('findOneAndDelete' , preventLedgerModification);
ledgerSchema.pre('findByIdAndDelete' , preventLedgerModification);
ledgerSchema.pre('findOneAndReplace' , preventLedgerModification);

const ledgerModel = mongoose.model("ledger" , ledgerSchema)

module.exports = ledgerModel
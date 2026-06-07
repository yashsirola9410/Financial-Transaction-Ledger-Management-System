const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const userSchema = new mongoose.Schema({
    email:{
        type : String,
        required : [true, "Email is required for user creation"],
        trim : true,
        unique : [true , "Email already exists"],
        lowercase : true ,
        match : [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , "Please provide a valid email address"]
    },

    name : {
        type : Srting,
        required:[true , "Name is required for an account"]
    },

    password : {
        type : String,
        required : [true , "Password is required"],
        minlength : [6 , "password should contain min 6 characters"],
        select : false 
    },

    systemUser : {
        type : Boolean,
        default : false,
        immutable : true,
        select : false
    }
},{
   timestamps : true 
})


//for securing the password
userSchema.pre("save" , async function(){
    if(!this.isModified("password")){
        return
    }

    const hash = await bcrypt.hash(this.password , 10)
    this.password = hash

    return
})


//for checking the user identity during login
userSchema.methods.comparePassword = async function(password){
    console.log(password , this.password)
    return await bcrypt.compare(password , this.password)
}


//final model making 
const userModel = mongoose.model("user" , userSchema)
module.exports = userModel


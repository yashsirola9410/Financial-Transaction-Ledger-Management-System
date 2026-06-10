const userModel =  require("../models/user.model")
const  jwt = require("jsonwebtoken")
const emailService = require("../services/email.service")
const tokenBlackListModel = require("../models/blacklist.models")


//user register controller and 
//POST /api/auth/register

async function userRegisterController(req , res){
      const {email , password , name } = req.body

        //check if user with the email already exists in the database
        const isExists =  await userModel.findOne({
            email:email
        })

        if(isExists){
            return res.status(422).json({
                message: "User with this email already exists",
                status:"failed"
            })
        }

        const user = await userModel.create({
            email, password, name 
        })

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn:"2d"})

        res.cookie("token", token)
        res.status(201).json({
            user:{
                _id:user._id,
                email:user.email,
                name:user.name
            },
            token
        })

        await emailService.sendRegisterEmail(user.email , user.name)
}


async function userLoginController(req , res){
    const {email , password} = req.body

    const user = await userModel.findOne({email}).select("+password")

    if(!user){
        return res.status(401).json({
            message:"Invalid email or password",
        })
    }

    const isMatch = await user.comparePassword(password)

    if(!isMatch){
        return res.status(401).json({
            message:"Invalid email or password"
        })
    }

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn:"2d"})

    res.cookie("token" , token)

    res.status(201).json({
        user:{
            _id:user._id,
            email:user.email,
            name:user.name
        },
        token
        })
}

//logout controller 
async function userLogoutController(req, res) {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[ 1 ]

    if (!token) {
        return res.status(200).json({
            message: "User logged out successfully"
        })
    }



    await tokenBlackListModel.create({
        token: token
    })

    res.clearCookie("token")

    res.status(200).json({
        message: "User logged out successfully"
    })

}



module.exports = {
    userRegisterController,
    userLoginController,
    userLogoutController
}
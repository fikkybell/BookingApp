import User from "../models/User.js"
import CryptoJS from "crypto-js"
import jwt from "jsonwebtoken"
export const register = async (req, res, next)=>{
    try{
     const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password:CryptoJS.AES.encrypt(
            req.body.password,
            "secret"
          ).toString()
     })
     await newUser.save()
     res.status(201).json("User has been created successfully")
    }catch(err){
     next(err)
    }
}

export const login = async (req, res, next)=>{
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(401).json("Wrong username!");
    
        const hashedPassword = CryptoJS.AES.decrypt(
          user.password,
          "secret"
        );
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    
        OriginalPassword !== req.body.password &&
          res.status(401).json("Wrong password!");
    
        const accessToken = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_SEC,
          {expiresIn:"3d"}
        );
    
        const { password, ...others } = user._doc;
    
        res.cookie("access_token", accessToken, {
            httpOnly: true
        }).status(200).json({...others, accessToken});
      } catch (err) {
        next(err)
      }
}
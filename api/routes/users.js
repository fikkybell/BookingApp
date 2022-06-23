import  express from "express";
import { deleteUser, getUser, getUserById, updateUser } from "../controllers/user.js";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, 
//  (req,res,next)=>{
//     res.send("Hello user")
//  }
// )

// router.get("/checkauthentication/:id", verifyTokenAndAuthorization, 
//  (req,res,next)=>{
//     res.send("Hello user, you are logged in and you can delete your account")
//  }
// )

router.put("/:id", verifyTokenAndAuthorization, updateUser)

router.delete("/:id", verifyTokenAndAuthorization, deleteUser)

router.get("/:id", verifyTokenAndAuthorization, getUserById)

router.get("/", verifyTokenAndAdmin, getUser)

export default router
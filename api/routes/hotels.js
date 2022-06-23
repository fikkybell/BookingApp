import  express from "express";
import { createHotel, deleteHotel, getHotel, getHotelById, updateHotel } from "../controllers/hotel.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";
import { verifyTokenAndAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/",verifyTokenAndAdmin, createHotel)

router.put("/:id",verifyTokenAndAdmin, updateHotel)

router.delete("/:id", deleteHotel)

router.get("/:id", getHotelById)

router.get("/", getHotel)
    
export default router
import  express from "express";
import { createRoom, deleteRoom, getRoom, getRoomById, updateRoom } from "../controllers/room.js";
import { verifyTokenAndAdmin } from "../utils/verifyToken.js";

const router = express.Router();
router.post("/:hotelid",verifyTokenAndAdmin, createRoom)

router.put("/:id/:hotelid",verifyTokenAndAdmin, updateRoom)

router.delete("/:id/:hotelid",verifyTokenAndAdmin, deleteRoom)

router.get("/:id", getRoomById)

router.get("/", getRoom)


export default router
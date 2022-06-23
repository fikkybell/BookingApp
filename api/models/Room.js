import mongoose from "mongoose"

//creating    Rooms schema

const    RoomSchema = new mongoose.Schema({
    title:{type:String, required:true},
    price:{type:String, required:true},
    desc:{type:String, required:true},
    maxPeople:{type:Number, required:true},
    roomNumber:{type:[{number:Number, unavailableDates:[{
        type:[Date]
    }]}]},

},
    {timestamps:true}
)

export default mongoose.model("Room", RoomSchema)
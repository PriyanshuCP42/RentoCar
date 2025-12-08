
import { date, required, string } from "joi";
import mongoose from "mongoose";
const {ObjectId}=mongoose.Schema.Types
const bookingSchema=new mongoose.Schema({
    car:{type:ObjectId,ref:'car',required:true},
    user:{type:ObjectId,ref:'user',required:true},
    owner:{type:ObjectId,ref:'user',required:true},
    pickupDate:{type:date,required:true},
    returnDate:{type:date,required:true},
    status:{type:string,enum:['pending','confirmed','cancelled'],default:'pending'},
    price:{type:Number,required:true}
},{timestamps:true})

const Booking= mongoose.model('Booking',bookingSchema)

export default Booking
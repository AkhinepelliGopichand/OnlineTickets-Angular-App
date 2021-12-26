const mongoose=require('mongoose');

const busesSchema=new mongoose.Schema({
    type:String,
    from:String,
    to:String,
    Departure:String,
    Arrival:String,
    fare:String,
    travels:String,
    seats:{type:Number,default:0},
    bookedSeats:Array
})

module.exports=mongoose.model('buses',busesSchema,'buses')
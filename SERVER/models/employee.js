const mongoose=require('mongoose');

const EmpSchema=new mongoose.Schema({
    name:String,
    id:String,
    desg:String,
    salary:String,
    bonus:String,
    totalsal:String,
    
})

module.exports=mongoose.model('employee',EmpSchema,'Employees')
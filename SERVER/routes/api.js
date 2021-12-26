const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const User=require('../models/user')
const Buses=require('../models/buses')
const Emp=require('../models/employee')
const jwt=require('jsonwebtoken')

const db="mongodb+srv://Gopichand:Gopi1234@cluster0.wrsw2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(db,{ useUnifiedTopology: true,useNewUrlParser: true  },err=>{
    if(err)
    console.error(err)
    else{
        console.log('Connected to MongoDB');
    }
})


function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('UNA Request')
    }
    let token=req.headers.authorization.split(' ')[1]
    if(token==='null')
    return res.status(401).send('UNA Reequest')
    let payload=jwt.verify(token,'aGkNCg')
    if(!payload)
    return res.status(401).send('UNA Reeequest')
     req.userId=payload.subject
     next()
}

router.get('/',(req,res)=>{
    res.send('Hey from API')
})

router.post('/register',async(req,res)=>{
    let userData=req.body;
    let user=new User(userData)
    await user.save((err,regi)=>{
        if(err){
            console.log(err)
        }else{
            let payload={subject:regi._id}
            let token=jwt.sign(payload,'aGkNCg')
            res.status(200).send({token,regi})
        }
    })
});


router.post('/login',async(req,res)=>{
let userData=req.body
await User.findOne({email:userData.email},(err,user)=>{
    if(err){
        res.send(err)
    }else{
      if(!user)
      res.status(401).json('Enter a valid Email')
      else{
          if(user.password !== userData.password)
          res.json('Please recheck your password')
          else{
          let payload={subject:user._id}
          let token=jwt.sign(payload,'aGkNCg')
          res.status(200).send({token,user})
          }
      }

    }
})
})
   //To Add New Buses to the DB
    router.post('/addbuses',async(req,res)=>{
        let busData=req.body
        let bus=new Buses(busData)
        await bus.save((err,busd)=>{
            if(err)
            res.status(401).send(err)
            else
            res.status(200).send(busd)
        })

    })
    // Finding a bus from DB based on From and To Location
    router.post('/buses',async(req,res)=>{
        let BD=req.body;
       await Buses.find({$and: [{from:BD.source},{to:BD.destination}]},(err,bus)=>{
           if(err){
           res.status(401).send('No Bus Found')
           }
           else{
               res.status(200).send(bus)
           }
       })
    })

//    Update bus seats and blocked seats
    router.put('/busesupdate/:id',async(req,res)=>{
        let BD=req.body;
       await Buses.findOne({_id:req.params.id},(err,bus)=>{
           if(err){
           res.status(401).send('No Bus Found')
           }
           else{
               bus.seats=BD.seats,
               bus.bookedSeats=BD.bookedSeats
               bus.save((err,bus)=>{
                   if(err)
                   res.status(401).send('Error in updating')
                   else
                   res.status(200).send({message:"Update Sucess",bus})
               })
              
           }
       })
    })

    // Updating  Booked Seats in the bus
    router.put('/bookedseats',async(req,res)=>{
        let BD=req.body;
        console.log('Req Recevied from Front End',BD)
       await Buses.findById({_id:BD.id},(err,bus)=>{
           if(err){
           res.status(401).send('No Bus Found')
           }
           else{
               bus.bookedSeats=BD.bookedSeats
               bus.save((err,bus)=>{
                   if(err)
                   res.status(401).send('Error in updating')
                   else
                   res.status(200).send({message:"Update Sucess",bus})
               })   
              
           }
       })
    })


//   To Delete a bus in the DB
    router.delete('/deletebus/:id',async(req,res)=>{
        let b_id=req.params.id
       await Buses.findOne({_id:b_id},(err,bus)=>{
            if(err)
                res.status(200).send('error in finding bus');
            else {
                bus.remove(err=>{
                    if(err)
                    res.send('Unable to remove')
                    else{
                        res.send('Removed Successfully')
                    }
                })
            }
        })
    })

// To see the buses in DB
    router.get('/seebuses',async(req,res)=>{
        await Buses.find((err,buses)=>{
            if(err)
            res.status(401).send('Error Occured')
            else
            res.status(200).send(buses)
        })
    })


    // Add Employee in DB
    router.post('/addemp',async(req,res)=>{
        let newemp=req.body;
        // console.log(req.body)
        let emp=new Emp(newemp)
        await emp.save((err,emp)=>{
            if(err)
            res.status(401).send(err)
            else
            res.status(200).send({message:'saved Successfully',emp})
        })
    })
    
// Get emp table
    router.get('/getemp',async(req,res)=>{
        await Emp.find((err,emps)=>{
            if(err)
            res.status(401).send('Error Occured')
            else
            res.status(200).send(emps)
        })
    })
// Edit emp record
    router.put('/editemp',async(req,res)=>{
        console.log('PUT REQUEST SUCCESS',req.body)
        await Emp.findOne({_id:req.body._id},(err,emp)=>{
            if(err){
                res.status(200).send('error in finding employee');   
            }
            if(emp==null){
                res.status(404).send('No Emp found')
            }
            else{
                console.log(emp)
                // res.status(200).send('Emp found');   
                emp.name=req.body.values.name;
                emp.desg=req.body.values.desg;
                emp.salary=req.body.values.salary;
                emp.id=req.body.values.id;
                emp.bonus=req.body.values.bonus;
                emp.save((err,empl)=>{
                    if(err)
                    res.status(401).send('Error in updating')
                    else
                    res.status(200).send({message:"Update Sucess",empl})
                })
            }
        })
    })
    
// To delete a employee record
    router.delete('/deleteemp/:id',async(req,res)=>{
        let b_id=req.params.id
        console.log(b_id)
       await Emp.findOne({_id:b_id},(err,bus)=>{
            if(err)
                res.status(200).send('error in finding bus');
                else {
                    if(bus){
                    bus.remove(err=>{
                        if(err)
                        res.send('Unable to remove')
                        else{
                            res.send('Removed Successfully')
                        }
    
                    }) 
                    }else{
                    res.send('Delete Failed')
                }
            }
        })
    })
module.exports=router
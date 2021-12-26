const express=require('express')
const bodyParser=require('body-parser')
const PORT=3000;
const app=express()
const cors=require('cors')
const api=require('./routes/api')
app.use(bodyParser.json())
app.use(cors())

app.use('/api',api)

app.listen(PORT,()=>{
    console.log('server runnin on',PORT);
})

const  express = require("express")
const app = express()
require("dotenv").config()
const mongoose = require('mongoose');
const jwt  = require("jsonwebtoken");

const fs = require('fs')
const publicKey = fs.readFileSync("./public.key","utf-8")
const productRouter = require('./router/product')
const userRouter =require("./router/user")



app.use(express.json())
const auth =((req,res,next)=>{
        
     
    try{
        //   const header = req.get('Authorization')
        const token = req.get('Authorization').split('Bearer ')[1]
        console.log(token)
        var decoded = jwt.verify(token, publicKey)
        //iat is time stamp and email is payload which we defined
        // { email: 'chethanb2asdw1222@example.com1', iat: 1691929007 }
        if(decoded.email){
            next()
        }else{
            res.sendStatus(401) 
        }
    }catch(err){
        res.sendStatus(401)
    }
    console.log(decoded)
})


const authController = require("./router/auth")



app.use("/user",auth,userRouter.router)
app.use("/auth",authController.router)
app.use('/products',productRouter.router);
//db connection

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/userinfo');
  console.log("db is connected")
}
app.listen(process.env.PORT_NUMBER,()=>{
    console.log(`the server is runing on port ${process.env.PORT_NUMBER}`)
})

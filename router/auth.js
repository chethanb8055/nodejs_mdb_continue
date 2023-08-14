const  express = require("express")
// const q = express()
const authController = require('../controller/auth')
const router = express.Router()
 




router
.post('/singUp', authController.createUser)
.post('/login', authController.login)



exports.router =router;
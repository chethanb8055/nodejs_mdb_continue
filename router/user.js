const  express = require("express")
// const q = express()
const userController = require('../controller/user')
const router = express.Router()

router
.get('/', userController.getAllUsers)
// .post('/', userController.createUser)
.put('/:id', userController.replaceUser)
.patch('/:id', userController.updateUser)
.delete('/:id', userController.deleteUser);

exports.router =router
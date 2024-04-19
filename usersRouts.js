const express=require("express")
const usersController=require('../controllers/usersController.js')

const usersRouter=express.Router()

usersRouter.route('/')
.get(usersController.getAllUsers)
.post(usersController.addUsers)
usersRouter.route('/:id')
.put(usersController.replaceUsers)
.delete(usersController.deleteUsers)

module.exports=usersRouter;
const express=require("express")
const productsController=require('../controllers/productsController.js')

const productsRouter=express.Router()

productsRouter.route('/')
.get(productsController.getAllProducts)
.post(productsController.addProducts)
productsRouter.route('/:id')
.put(productsController.replaceProduct)
.delete(productsController.deleteUser)

module.exports=productsRouter;
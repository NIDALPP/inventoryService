const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const catControllers=require('../controllers/categoryController')

router.post('/createProduct', productController.addProduct)
router.post('/findProduct',productController.findProduct)
router.post('/findAll',productController.findAllProducts)
router.post('/deleteProduct',productController.deleteProduct)
router.post('/updateProduct',productController.updateProduct)
router.post('/createCat',catControllers.createCat)
router.post('/findCat',catControllers.findCat)
router.post('/findAllCat',catControllers.findAll)
router.post('/updateCat',catControllers.updateCat)



module.exports=router
const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const catControllers=require('../controllers/categoryController')

router.post('/createProduct', productController.addProduct)
router.get('/findOneProduct',productController.findProduct)
router.get('/findProducts',productController.findAllProducts)
router.post('/deleteProduct',productController.deleteProduct)
router.post('/updateProduct',productController.updateProduct)
router.post('/createCat',catControllers.createCat)
router.post('/findOneCat',catControllers.findCat)
router.post('/findCat',catControllers.findAll),
router.post('/updateCat',catControllers.updateCat)



module.exports=router
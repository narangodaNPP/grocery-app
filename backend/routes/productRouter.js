const router = require('express').Router()
const productControl = require('../controllers/productControl')


router.get('/products', productControl.getProduct)
router.post('/products', productControl.createProduct)

router.delete('/products/:id', productControl.deleteProduct)
router.put('/products/:id', productControl.updateProduct)

module.exports = router

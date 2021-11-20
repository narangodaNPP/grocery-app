const router = require('express').Router()
const checkoutControl = require('../controllers/checkoutControl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.get('/checkout', auth, authAdmin, checkoutControl.getCheckout)
router.post('/checkout', auth, checkoutControl.createCheckout)
    
module.exports = router

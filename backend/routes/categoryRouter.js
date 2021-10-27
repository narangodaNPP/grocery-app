const router = require('express').Router()
const categoryControl = require('../controllers/categoryControl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.get('/category', categoryControl.getCategories)
router.post('/category', auth, authAdmin, categoryControl.createCategory)
router.delete('/category/:id', auth, authAdmin, categoryControl.deleteCategory)
router.put('/category/:id', auth, authAdmin, categoryControl.updateCategory)

module.exports = router
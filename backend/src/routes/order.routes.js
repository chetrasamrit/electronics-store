const router = require('express').Router()
const {
  placeOrder,
  getMyOrders,
  getOrder,
  getAllOrders,
  updateOrderStatus,
} = require('../controllers/order.controller')
const { protect, adminOnly } = require('../middleware/auth')

router.use(protect)

router.post('/', placeOrder)
router.get('/my', getMyOrders)
router.get('/:id', getOrder)

router.get('/', adminOnly, getAllOrders)
router.put('/:id/status', adminOnly, updateOrderStatus)

module.exports = router

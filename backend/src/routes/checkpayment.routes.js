const router = require('express').Router()
const { checkpayment } = require('../controllers/checkpayment.controller')

router.post('/orders/:id/check_payment', checkpayment)

module.exports = router

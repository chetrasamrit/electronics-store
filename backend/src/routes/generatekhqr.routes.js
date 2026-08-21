const router = require('express').Router()
const { generatekhqr } = require('../controllers/generatekhqr.controller')

router.post('/orders/:id/generate_qrcode', generatekhqr)

module.exports = router

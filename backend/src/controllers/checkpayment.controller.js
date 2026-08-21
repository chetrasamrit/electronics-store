const User = require('../models/User')
const Order = require('../models/Order')
const axios = require('axios')

const checkpayment = async (req, res) => {
  const { id } = req.params
  const { qr_md5 } = req.body

  try {
    const user = await User.findById(id)
    if (!user) return res.status(404).json({ success: false, message: 'User not found' })

    const order = await Order.findOne({ user: id, qr_md5 })
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' })

    if (order.paid && order.status === 'paid') {
      return res.status(200).json({
        success: true,
        message: 'Payment already confirmed',
        data: { id: order._id, bakongHash: order.bakongHash, paid_at: order.paid_at },
      })
    }

    if (order.qr_expiration && Date.now() > order.qr_expiration) {
      return res.status(400).json({ success: false, message: 'QR code has expired.' })
    }

    if (order.qr_md5 !== qr_md5) {
      return res.status(400).json({ success: false, message: 'Invalid QR code' })
    }

    if (!process.env.BAKONG_PROD_BASE_API_URL || !process.env.BAKONG_ACCESS_TOKEN) {
      return res.status(400).json({
        success: false,
        message: 'Missing required environment variables: BAKONG_PROD_BASE_API_URL or BAKONG_ACCESS_TOKEN',
      })
    }

    const response = await axios.post(
      `${process.env.BAKONG_PROD_BASE_API_URL}/check_transaction_by_md5`,
      { md5: order.qr_md5 },
      { headers: { Authorization: `Bearer ${process.env.BAKONG_ACCESS_TOKEN}` } }
    )

    const data = response.data
    console.log('response:', data)

    if (data.responseCode === 0 && data.data?.hash) {
      await order.updateOne({
        bakongHash: data.data.hash,
        fromAccountId: data.data.fromAccountId,
        toAccountId: data.data.toAccountId,
        currency: data.data.currency,
        totalAmount: data.data.amount,
        paid: true,
        paid_at: new Date(),
        status: 'paid',
        transaction_id: data.data.hash,
      })

      console.log('Payment confirmed! ✅')
      return res.status(200).json({
        success: true,
        message: 'Payment confirmed',
        data: { id: order._id, bakongHash: data.data.hash, paid_at: order.paid_at },
      })
    }

    console.log('Payment not found ❌')
    return res.status(404).json({ success: false, message: 'Payment not found' })
  } catch (error) {
    console.log('Payment error:', error)
    return res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = { checkpayment }

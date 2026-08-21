const User = require('../models/User')
const Order = require('../models/Order')
const { BakongKHQR, khqrData, IndividualInfo } = require('bakong-khqr')

const generatekhqr = async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findById(id)
    if (!user) return res.status(404).json({ success: false, message: 'User not found' })

    const expirationTimestamp = Date.now() + 5 * 60 * 1000

    const optionalData = {
      currency: khqrData.currency.usd,
      amount: 0.1,
      expirationTimestamp,
    }

    const individualInfo = new IndividualInfo(
      process.env.BAKONG_ACCOUNT_USERNAME,
      process.env.BAKONG_ACCOUNT_NAME,
      'PHNOM PENH',
      optionalData
    )

    const KHQR = new BakongKHQR()
    const qrData = KHQR.generateIndividual(individualInfo)

    if (!qrData || !qrData.data || !qrData.data.qr) {
      throw new Error('KHQR generation failed')
    }

    console.log('qr:', qrData.data.qr)
    console.log('md5:', qrData.data.md5)

    const order = await Order.create({
      user: user._id,
      totalAmount: 0.1,
      status: 'pending',
      currency: 'USD',
      payment_method: 'khqr',
      paid: false,
      qr_code: qrData.data.qr,
      qr_md5: qrData.data.md5,
      qr_expiration: expirationTimestamp,
    })

    return res.status(201).json({
      success: true,
      message: 'KHQR generated successfully!',
      data: {
        merchant_name: process.env.BAKONG_ACCOUNT_NAME,
        id: order._id,
        qr_code: order.qr_code,
        qr_md5: order.qr_md5,
        amount: order.totalAmount,
        currency: order.currency,
        qr_expiration: new Date(order.qr_expiration).toISOString(),
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to generate KHQR',
      error: error.message,
    })
  }
}

module.exports = { generatekhqr }

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

const authRoutes = require('./routes/auth.routes')
const productRoutes = require('./routes/product.routes')
const cartRoutes = require('./routes/cart.routes')
const orderRoutes = require('./routes/order.routes')
const generateKhqrRoutes = require('./routes/generatekhqr.routes')
const checkPaymentRoutes = require('./routes/checkpayment.routes')

const app = express()

app.use(helmet())
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }))
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/khqr', generateKhqrRoutes)
app.use('/api/khqr', checkPaymentRoutes)

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

app.use((_req, res) => res.status(404).json({ message: 'Route not found' }))

app.use((err, _req, res, _next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({ message: err.message || 'Internal server error' })
})

module.exports = app

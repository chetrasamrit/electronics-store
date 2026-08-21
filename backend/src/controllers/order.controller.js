const Order = require('../models/Order')
const Cart = require('../models/Cart')
const Product = require('../models/Product')

async function placeOrder(req, res, next) {
  try {
    const { shippingAddress } = req.body
    if (!shippingAddress) return res.status(400).json({ message: 'Shipping address is required' })

    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product')
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' })
    }

    const items = cart.items.map((i) => ({
      product: i.product._id,
      name: i.product.name,
      image: i.product.image,
      price: i.product.price,
      quantity: i.quantity,
    }))

    const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

    const order = await Order.create({ user: req.user._id, items, shippingAddress, totalAmount })
    await Cart.findOneAndDelete({ user: req.user._id })
    res.status(201).json(order)
  } catch (err) {
    next(err)
  }
}

async function getMyOrders(req, res, next) {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    next(err)
  }
}

async function getOrder(req, res, next) {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) return res.status(404).json({ message: 'Order not found' })
    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' })
    }
    res.json(order)
  } catch (err) {
    next(err)
  }
}

async function getAllOrders(req, res, next) {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    next(err)
  }
}

async function updateOrderStatus(req, res, next) {
  try {
    const { status } = req.body
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, ...(status === 'delivered' ? { paidAt: new Date() } : {}) },
      { new: true, runValidators: true }
    )
    if (!order) return res.status(404).json({ message: 'Order not found' })
    res.json(order)
  } catch (err) {
    next(err)
  }
}

module.exports = { placeOrder, getMyOrders, getOrder, getAllOrders, updateOrderStatus }

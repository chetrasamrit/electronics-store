const Cart = require('../models/Cart')
const Product = require('../models/Product')

async function getCart(req, res, next) {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product')
    res.json(cart || { items: [] })
  } catch (err) {
    next(err)
  }
}

async function addToCart(req, res, next) {
  try {
    const { productId, quantity = 1 } = req.body
    const product = await Product.findById(productId)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    if (!product.inStock) return res.status(400).json({ message: 'Product is out of stock' })

    let cart = await Cart.findOne({ user: req.user._id })
    if (!cart) cart = new Cart({ user: req.user._id, items: [] })

    const existing = cart.items.find((i) => i.product.toString() === productId)
    if (existing) {
      existing.quantity += quantity
    } else {
      cart.items.push({ product: productId, quantity })
    }
    await cart.save()
    res.json(await cart.populate('items.product'))
  } catch (err) {
    next(err)
  }
}

async function updateCartItem(req, res, next) {
  try {
    const { quantity } = req.body
    const cart = await Cart.findOne({ user: req.user._id })
    if (!cart) return res.status(404).json({ message: 'Cart not found' })

    const item = cart.items.find((i) => i.product.toString() === req.params.productId)
    if (!item) return res.status(404).json({ message: 'Item not in cart' })

    if (quantity <= 0) {
      cart.items = cart.items.filter((i) => i.product.toString() !== req.params.productId)
    } else {
      item.quantity = quantity
    }
    await cart.save()
    res.json(await cart.populate('items.product'))
  } catch (err) {
    next(err)
  }
}

async function removeFromCart(req, res, next) {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
    if (!cart) return res.status(404).json({ message: 'Cart not found' })
    cart.items = cart.items.filter((i) => i.product.toString() !== req.params.productId)
    await cart.save()
    res.json(await cart.populate('items.product'))
  } catch (err) {
    next(err)
  }
}

async function clearCart(req, res, next) {
  try {
    await Cart.findOneAndDelete({ user: req.user._id })
    res.json({ message: 'Cart cleared' })
  } catch (err) {
    next(err)
  }
}

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart }

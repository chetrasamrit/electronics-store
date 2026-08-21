const Product = require('../models/Product')

async function getProducts(req, res, next) {
  try {
    const { category, search, inStock, page = 1, limit = 20 } = req.query
    const filter = {}
    if (category) filter.category = category
    if (inStock !== undefined) filter.inStock = inStock === 'true'
    if (search) filter.$text = { $search: search }

    const skip = (Number(page) - 1) * Number(limit)
    const [products, total] = await Promise.all([
      Product.find(filter).skip(skip).limit(Number(limit)).sort({ createdAt: -1 }),
      Product.countDocuments(filter),
    ])
    res.json({ products, total, page: Number(page), pages: Math.ceil(total / Number(limit)) })
  } catch (err) {
    next(err)
  }
}

async function getProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
  } catch (err) {
    next(err)
  }
}

async function createProduct(req, res, next) {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (err) {
    next(err)
  }
}

async function updateProduct(req, res, next) {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
  } catch (err) {
    next(err)
  }
}

async function deleteProduct(req, res, next) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json({ message: 'Product deleted' })
  } catch (err) {
    next(err)
  }
}

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct }

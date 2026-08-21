const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, min: 0 },
    image: { type: String, required: true },
    category: { type: String, required: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviews: { type: Number, default: 0, min: 0 },
    badge: { type: String },
    specs: [{ type: String }],
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
)

productSchema.index({ name: 'text', brand: 'text', category: 'text' })

module.exports = mongoose.model('Product', productSchema)

const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
)

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: { type: [orderItemSchema], default: [] },
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
    totalAmount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'paid'],
      default: 'pending',
    },
    paidAt: { type: Date },
    payment_method: { type: String },
    currency: { type: String },
    qr_code: { type: String },
    qr_md5: { type: String },
    qr_expiration: { type: Number },
    paid: { type: Boolean, default: false },
    paid_at: { type: Date },
    bakongHash: { type: String },
    fromAccountId: { type: String },
    toAccountId: { type: String },
    transaction_id: { type: String },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Order', orderSchema)

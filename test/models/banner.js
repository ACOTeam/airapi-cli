const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')

/* @apiModel CouponHistory
 {
    userId: String,
    couponId: String
 }
 */
const schema = new mongoose.Schema({
  userId: String,
  couponId: String
}, {
  collection: 'yd_couponHistory',
  strict: true
})

schema.plugin(timestamps, {
  createdAt: 'createdAt',
  updatedAt: 'modifiedAt'
})

module.exports = schema

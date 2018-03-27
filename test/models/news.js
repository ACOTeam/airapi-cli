const mongoose = require('mongoose')

/* @apiModel News
 {
   title : string, //标题
   region : objectId // 区域id
   isValid : boolean //是否有效
 }
 */
module.exports = new mongoose.Schema({
  title: String,
  region: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Region'
  },
  isValid: {
    type: Boolean,
    default: true
  }
}, {
  collection: 'News'
})

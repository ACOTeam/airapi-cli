# Model

@apiModel  :
@apiModel {modelName} 

Instruction: defind Models，The definition of the model  format is : " FieldName ： Type ,  Description " 


Example:

```
CouponHistory.js

const mongoose = load('mongoose')


/* @apiModel CouponHistory
 {
    userId: String,  // id of user
    couponId: String  // coupon id
 }
 */
module.exports = new mongoose.Schema({
  userId: String,
  couponId: String
}, {
  collection: 'CouponHistory'
})

```
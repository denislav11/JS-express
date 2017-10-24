const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let orderSchema = new mongoose.Schema({
    creator: { type: ObjectId, ref: "User", required: true },
    product: { type: ObjectId, ref: "Product", required: true },
    dateOrderdedOn: { type: Date, required: true },
    toppings: [{ type: String }],
    status: { type: String, default: "Pending" }
});

module.exports = mongoose.model('Order', orderSchema);
const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const Order = mongoose.model('Order');
const User = mongoose.model('User');

module.exports = {
    customize: (req, res) => {
        let productId = req.params.id;
        Product.findById(productId)
            .then((product) => {
                res.render('orders/customize', product);
            }).catch(err => {
                console.log(err);
                res.redirect('/');
            });
    },
    checkout: (req, res) => {
        let body = req.body;
        let productId = body.product_id;
        let userId = res.locals.currentUser._id;
        let toppings = body.topping;
        if (toppings === undefined) {
            toppings = [];
        }
        let orderObj = {
            creator: userId,
            product: productId,
            dateOrderdedOn: new Date(Date.now()).toLocaleString(),
            toppings: toppings
        };

        Order.create(orderObj)
            .then((createdOrder) => {
                User.findById(userId).then((user) => {
                    user.orders.push(createdOrder._id);
                    user.save().then((user) => {
                        res.redirect('/orders/details/' + createdOrder._id);
                    }).catch(err => {
                        console.log(err);
                        res.redirect('/');
                    })
                })
            }).catch(err => {
                console.log(err);
                res.redirect('/');
            })
    },
    details: (req, res) => {
        let orderId = req.params.id;
        Order.findById(orderId)
            .populate('product')
            .then((order) => {
                res.render('orders/details', order);
            }).catch(err => {
                console.log(err);
                res.redirect('/');
            })
    }
}
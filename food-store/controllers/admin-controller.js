const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const Order = mongoose.model('Order');

module.exports = {
    index: {
        get: (req, res) => {
            Product.find({})
                .then((products) => {
                    let chickenDoners = products.filter(pr => pr.category === 'Chicken');
                    let beefDoners = products.filter(pr => pr.category === 'Beef');
                    let lambDoners = products.filter(pr => pr.category === 'Lamb');
                    res.render('admin/index', {
                        chickenDoners,
                        beefDoners,
                        lambDoners
                    });
                });
        }
    },
    products: {
        create: {
            get: (req, res) => {
                res.render('admin/products/create');
            },
            post: (req, res) => {
                let productData = req.body;
                let toppings;
                if (productData.toppings !== '') {
                    toppings = productData.toppings.split(',');
                }

                let productObj = {
                    category: productData.category,
                    imageUrl: productData.imageUrl,
                    size: productData.size,
                    toppings
                }
                Product.create(productObj)
                    .then((createdProduct) => {
                        res.redirect('/admin/index');
                    }).catch(err => {
                        res.locals.globalError = err;
                        res.render('admin/products/create');
                    })
            }
        },
        delete: (req, res) => {
            let productId = req.params.id;
            Product.findByIdAndRemove(productId)
                .then((product) => {
                    res.redirect('/admin/index');
                }).catch(err => {
                    console.log(err);
                    res.redirect('/admin/index');
                })
        },
        edit: {
            get: (req, res) => {
                let productId = req.params.id;
                Product.findById(productId).then(product => {
                    product.toppings = product.toppings.join(',');
                    res.render('admin/products/edit', product);
                });
            },
            post: (req, res) => {
                let productId = req.params.id;
                let productData = req.body;

                let toppings;
                if (productData.toppings !== '') {
                    toppings = productData.toppings.split(',');
                }

                Product.findById(productId)
                    .then((product) => {
                        product.category = productData.category;
                        product.imageUrl = productData.imageUrl;
                        product.size = productData.size;
                        product.toppings = toppings;

                        product.save().then((edittedProduct) => {
                            res.redirect('/admin/index');
                        }).catch(err => {
                            res.locals.globalError = err;
                            res.render('admin/products/edit', product);
                        })
                    })
            }
        }
    },
    orders: {
        get: (req, res) => {
            const s = ['Pending', 'Delivered']
            Order.find({})
                .populate('product')
                .then((orders) => {
                    res.render('admin/orders/status', { orders });
                })
        },
        post: (req, res) => {
            const statuses = {
                pending: "Pending",
                inProgress: "In Progress",
                inTransit: "In Transit",
                delivered: "Delivered"
            };

            let body = req.body;
            let orderIds = body.id;
            let orderStatuses = body.status;

            for (let i = 0; i < orderIds.length; i++) {
                let id = orderIds[i];
                let status = statuses[orderStatuses[i]];
                Order.findById(id).then((order) => {
                    order.status = status;
                    order.save();
                })
            }

            res.redirect('/admin/index');
        }
    }
}
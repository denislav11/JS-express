const Product = require('mongoose').model('Product');

module.exports = {
    index: (req, res) => {
        Product.find({})
            .then((products) => {
                let chickenDoners = products.filter(pr => pr.category === 'Chicken');
                let beefDoners = products.filter(pr => pr.category === 'Beef');
                let lambDoners = products.filter(pr => pr.category === 'Lamb');

                res.render('home/index', {
                    chickenDoners,
                    beefDoners,
                    lambDoners
                });
            });
    }
};
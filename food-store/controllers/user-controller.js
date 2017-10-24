const encryption = require('../util/encryption');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Order = mongoose.model('Order');

module.exports = {
    registerGet: (req, res) => {
        res.render('users/register');
    },
    registerPost: async (req, res) => {
        const reqUser = req.body;
        const salt = encryption.generateSalt();
        const hashedPass =
            encryption.generateHashedPassword(salt, reqUser.password);
        try {
            const user = await User.create({
                username: reqUser.username,
                hashedPass,
                salt,
                firstName: reqUser.firstName,
                lastName: reqUser.lastName,
                roles: []
            });
            req.logIn(user, (err) => {
                if (err) {
                    res.locals.globalError = err;
                    res.render('users/register', user);
                } else {
                    if (user.isAdmin) {
                        res.redirect('/admin/index');
                    } else {
                        res.redirect('/');
                    }
                }
            });
        } catch (e) {
            console.log(e);
            res.locals.globalError = e;
            res.render('users/register');
        }
    },
    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    },
    loginGet: (req, res) => {
        res.render('users/login');
    },
    loginPost: async (req, res) => {
        const reqUser = req.body;
        try {
            const user = await User.findOne({ username: reqUser.username });

            if (!user) {
                errorHandler('Invalid user data');
                return;
            }
            if (!user.authenticate(reqUser.password)) {
                errorHandler('Invalid user data');
                return;
            }
            req.logIn(user, (err) => {
                if (err) {
                    errorHandler(err);
                } else {
                    if (user.isAdmin) {
                        res.redirect('/admin/index');
                    } else {
                        res.redirect('/');
                    }
                }
            });
        } catch (e) {
            errorHandler(e);
        }

        function errorHandler(e) {
            console.log(e);
            res.locals.globalError = e;
            res.render('users/login');
        }
    },
    orders: {
        status: (req, res) => {
            let userId = res.locals.currentUser._id;

            Order.find({ creator: userId })
                .populate('product')
                .then((orders) => {
                    res.render('orders/status', { orders });
                })

        }
    }
};

function dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}
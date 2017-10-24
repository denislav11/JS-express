const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {

    //Home
    app.get('/', controllers.home.index);

    //User
    app.get('/register', controllers.user.registerGet);
    app.post('/register', controllers.user.registerPost);
    app.post('/logout', controllers.user.logout);
    app.get('/login', controllers.user.loginGet);
    app.post('/login', controllers.user.loginPost);
    app.get('/orders/status', restrictedPages.isAuthed, controllers.user.orders.status);

    //Admin
    app.get('/admin/index', restrictedPages.hasRole('Admin'),
        controllers.admin.index.get);

    //Admin-Products    
    app.get('/admin/products/create', restrictedPages.hasRole('Admin'),
        controllers.admin.products.create.get);
    app.post('/admin/products/create', restrictedPages.hasRole('Admin'),
        controllers.admin.products.create.post);
    app.post('/admin/products/delete/:id', restrictedPages.hasRole('Admin'),
        controllers.admin.products.delete);
    app.get('/admin/products/edit/:id', restrictedPages.hasRole('Admin'),
        controllers.admin.products.edit.get);
    app.post('/admin/products/edit/:id', restrictedPages.hasRole('Admin'),
        controllers.admin.products.edit.post);
    app.get('/admin/orders/status', restrictedPages.hasRole('Admin'),
        controllers.admin.orders.get);
    app.post('/admin/orders/status', restrictedPages.hasRole('Admin'),
        controllers.admin.orders.post);

    //Orders
    app.get('/orders/:id', restrictedPages.isAuthed, controllers.orders.customize);
    app.post('/orders/checkout', restrictedPages.isAuthed, controllers.orders.checkout);
    app.get('/orders/details/:id', restrictedPages.isAuthed, controllers.orders.details);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};
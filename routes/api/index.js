const router = require('express').Router();

const categoryRoutes = require('./categories-routes');
const employeeRoutes = require('./employee-routes');
const productRoutes = require('./products-routes');

router.use('/categories', categoryRoutes);
router.use('/employees', employeeRoutes);
router.use('/products', productRoutes);

module.exports = router; 
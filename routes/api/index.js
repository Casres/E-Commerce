const router = require('express').Router();

const categoryRoutes = require('./categories-routes');

router.use('/categories', categoryRoutes);

module.exports = router; 
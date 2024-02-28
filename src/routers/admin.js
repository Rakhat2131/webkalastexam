const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');

// Middleware для проверки аутентификации и роли админа
router.use((req, res, next) => {
    next();
});

router.post('/country', adminController.addCountry);
router.post('/countries/delete/:countryName', adminController.deleteCountry);
router.get('/countries', adminController.getAllCountries);
router.get('/dashboard', adminController.dashboard);
router.get('/countries/add', adminController.addCountryGET);
router.post('/countries/add', adminController.addCountry);

module.exports = router;

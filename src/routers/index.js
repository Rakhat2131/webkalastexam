const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const indexController = require('../controller/indexController');
const newsApi = require("../api/news");


router.use(bodyParser.urlencoded({ extended: true }));
router.get('/news', newsApi.getNews);
router.post('/news', newsApi.getNews);

router.get("/home", indexController.getIndexPage);
router.get('/logout', indexController.logout);

router.get('/timezone/:countryCode', indexController.timezone);
router.get('/countries', indexController.countries);

module.exports = router;
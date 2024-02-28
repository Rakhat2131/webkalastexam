const Country = require('../models/./country');
const express = require('express');
const router = express.Router();
const { getTimeZoneInfoByCountryCode } = require('../api/time-zone');
const {getCountry} = require("../models/country");


const indexController = {
    getIndexPage: (req, res) => {
        if (req.isAuthenticated()) {
            return res.redirect('/auth/login');
        }
        res.render('home');
    },




// Route to fetch all countries
    countries: async (req, res) => {
        try {
            const countries = await getAllCountries(); // Call the function to fetch all countries
            res.json(countries);
        } catch (error) {
            console.error('Error fetching countries:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },


    timezone: async (req, res) => {
        const { countryCode } = req.params;
        try {
            const countryData = await getCountry(countryCode);
            const { lat, lng } = countryData;
            const timeZoneInfo = await getTimeZoneInfoByCountryCode(lat, lng);
            res.json(timeZoneInfo);
        } catch (error) {
            console.error(`Error fetching timezone for country code ${countryCode}:`, error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },



    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    }
};

module.exports = indexController;

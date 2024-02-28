const express = require('express');
const router = express.Router();
const CountryModel = require('../models/country');

const API_KEY = process.env.TIME_ZONE_API_KEY;
const axios = require('axios');

async function getTimeZoneInfoByCountryCode(lat, lng) {
    try {
        const response = await axios.get(`http://api.timezonedb.com/v2.1/get-time-zone?key=${API_KEY}&format=json&by=position&lat=${lat}&lng=${lng}`);
        const data = response.data;

        if (data.status === "OK") {
            const result = {
                formatted: data.formatted
            };
            return result;
        } else {
            throw new Error(data.message || "Unknown error occurred");
        }
    } catch (error) {
        console.error(`Error fetching time zone info: ${error.message}`);
        throw error;
    }
}

module.exports = { getTimeZoneInfoByCountryCode };


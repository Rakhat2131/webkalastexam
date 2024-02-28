const {getAllCountries, CountryCreate , DeleteCountry} = require('../models/country')


const adminController = {
    addCountry: async (req, res) => {
        try {
            const { countryName, lat, lng } = req.body;
            await CountryCreate( countryName, lat, lng );
            res.redirect('/admin/countries');
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },


    addCountryGET: async (req, res) => {
        try {
            res.render('addCountry' , null)
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    deleteCountry: async (req, res) => {
        const countryName = req.params.countryName;
        console.log(countryName)
        try {
            await DeleteCountry(countryName)
            res.redirect('/admin/countries');
        } catch (error) {
            console.error('Error deleting country:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    getAllCountries: async (req, res) => {
        try {
            const countries = await getAllCountries()
            console.log(countries)
            res.render('countries', { countries: countries });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    dashboard: async (req, res) => {
        res.render('dashboard');
    }
};

module.exports = adminController;

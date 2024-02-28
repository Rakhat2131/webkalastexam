const client = require('../services/mongo')




exports.CountryCreate = async (countryName, lat, lng) => {


    try {
        const c = await client.db("countryGuide1").collection("country");
        await c.insertOne({
            countryName :countryName,
            lat : parseInt(lat , 10),
            lng : parseInt(lng , 10)
        })
    } catch (err) {

    }


};


exports.DeleteCountry = async (countryname) => {
    try{
        const c = await client.db("countryGuide1").collection("country");
        await c.deleteOne({countryName : countryname})
    }catch (err)
    {
        console.log(err)
        throw err
    }
}

exports.getCountry = async (countryName) => {
    try {
        const c = await client.db("countryGuide1").collection("country");
        const countryData = await c.findOne({ countryName });
        return countryData; // Return the country data if found
    } catch (err) {
        console.error(err);
        throw err;
    }
};


exports.getAllCountries = async ()=> {
    try {
        const c = await client.db("countryGuide1").collection("country");
        return await c.find().toArray();
    } catch (err) {
        console.log(err)
    }

}


const mongoose = require('mongoose');
async function connect() {
    try {
        const URL = process.env.DB_URL;
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connect to database successfully");
    } catch (error) {
        console.log("Connect to database failed " + error);
    };
};

module.exports = {connect};
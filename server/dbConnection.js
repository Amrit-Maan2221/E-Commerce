const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();

exports.connectDatabase = function () {
    mongoose.connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then((data) => {
            console.log(`Mongodb connected with server: ${data.connection.host}`);
        }).catch((e) => {
            console.log(`no connection`);
        });
}
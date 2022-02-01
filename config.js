const MongoStore = require("connect-mongo");
require("dotenv").config();
const advancedOptions = { useNewUrlParser:true, useUnifiedTopology:true }

module.exports = {
    mongoDb:{
        connectionStr: process.env.MONGO_CONNECTION
    },
    session:{
        store:MongoStore.create({
            mongoUrl:process.env.MONGO_CONNECTION,
            mongoOptions:advancedOptions

        }),
        secret:process.env.SECRET_SESSION, 
        resave:true,
        saveUninitialized:true
    },
    jwt:{
        PRIVATE_KEY:process.env.PRIVATE_KEY_JWT
    }
}
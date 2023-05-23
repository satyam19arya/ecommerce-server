const mongoose = require('mongoose');

module.exports = async () => {
    const mongoUri = process.env.DATABASE;
    try{
        mongoose.connect(mongoUri);
        console.log("Database Connected Successfully");
    }catch(e){
        console.log(e);
        process.exit(1);
    }
};
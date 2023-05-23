const mongoose = require('mongoose');
const { error } = require('../utils/responseWrapper');

const validateMongodbId = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid){
        return res.send(error(409, 'Invalid id'));
    }else{
        return true;
    }
}

module.exports = validateMongodbId;
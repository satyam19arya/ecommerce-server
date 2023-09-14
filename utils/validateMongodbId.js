const User = require('../models/UserModel');

const validateMongodbId = async (id) => {
    const user = await User.findById(id);

    return !!user;
}

module.exports = validateMongodbId;
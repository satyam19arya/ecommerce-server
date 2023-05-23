const User = require('../models/UserModel');
const { error, success } = require('../utils/responseWrapper');
const validateMongoDbId = require('../utils/validateMongodbId');

const getAllUsers = async (req, res) => {
    try{
        const getAllUsers = await User.find();
        if(!getAllUsers){
            return res.send(error(409, 'No user found'));
        }
        return res.send(success(201, getAllUsers));

    }catch(e){
        return res.send(error(500,e.message));
    }
}

const getaUsers = async (req, res) => {
    try{
        const {id} = req.params;
        validateMongoDbId(id);
        const getaUsers = await User.findById(id);
        if(!getaUsers){
            return res.send(error(409, 'User not found'));
        }
        return res.send(success(201, {getaUsers}));

    }catch(e){
        return res.send(error(500,e.message));
    }
}

const deleteUser = async (req, res) => {
    try{
        const {id} = req.params;
        validateMongoDbId(id);
        const deleteUser = await User.findByIdAndDelete(id);
        return res.send(success(201, {deleteUser}));

    }catch(e){
        return res.send(error(500,e.message));
    }
}

const updateUser = async (req, res) => {
    try{
        const id = req._id;
        validateMongoDbId(id);
        const updateUser = await User.findByIdAndUpdate(id, {
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
            mobile: req?.body?.mobile,
        },{
            new: true,
        });

        return res.send(success(201, {updateUser}));

    }catch(e){
        return res.send(error(500,e.message));
    }
}

const blockUser = async (req, res) => {
    try{
        const {id} = req.params;
        validateMongoDbId(id);
        const blockUser = await User.findByIdAndUpdate(id, {
            isBlocked: true,
        },{
            new: true,
        });

        return res.send(success(201, "User blocked"));

    }catch(e){
        return res.send(error(500,e.message));
    }
}

const unblockUser = async (req, res) => {
    try{
        const {id} = req.params;
        validateMongoDbId(id);
        const unblockUser = await User.findByIdAndUpdate(id, {
            isBlocked: false,
        },{
            new: true,
        });

        return res.send(success(201, "User unblocked"));

    }catch(e){
        return res.send(error(500,e.message));
    }
}

module.exports = {
    getAllUsers,
    getaUsers,
    deleteUser,
    updateUser,
    blockUser,
    unblockUser,
}
const { error } = require("../utils/responseWrapper");
const User = require('../models/UserModel');

module.exports = async (req, res, next) => {
    console.log("I am inside requireAdmin middleware");
    try{
        const user =await User.findById(req._id);
        console.log(user);

        if(user.role !== "admin"){
            return res.send(error(401, 'You are not an admin'));
        }else{
            next();
        }
    
    }catch(e){
        return res.send(error(500,e.message));
    }
}
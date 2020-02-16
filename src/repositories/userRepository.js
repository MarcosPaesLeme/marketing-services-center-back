const Users = require('../models/userModel');

exports.createUser = async (data) => {
    let users = new Users(data);
    return await users.save();
}

exports.authenticate = async (user) => {
    const res = await Users.findOne(user)
    return res;
};

exports.updateUser = async (user) => {
    return Users.findByIdAndUpdate(user._id, user);
};

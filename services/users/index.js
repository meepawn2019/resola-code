const CustomError = require('../../error');
const User = require('../../models/user');

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({
      where: { email },
      attributes: [
        'id',
        'email',
        'createdAt',
        'updatedAt',
      ],
    });
    return user?.dataValues;
  } catch (error) {
    throw new CustomError(error.message, error.status);
  }
};

const createUserService = async (user) => {
  try {
    const newUser = await User.create(user);
    return newUser?.dataValues;
  } catch (error) {
    throw new CustomError(error.message, error.status);
  }
};

module.exports = {
  createUserService,
  getUserByEmail,
};

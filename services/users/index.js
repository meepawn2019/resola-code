const CustomError = require('../../error');
const User = require('../../models/user');

const getUsersService = async () => {
  try {
    const users = await User.findAll({
      attributes: [
        'id',
        'email',
        'created_at',
        'updated_at',
      ],
    });
    // get user data from the first row
    return users.map((user) => user.dataValues);
  } catch (error) {
    throw new CustomError(error.message, error.status);
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({
      where: { email },
      attributes: [
        'id',
        'email',
        'password',
        'created_at',
        'updated_at',
      ],
    });
    return user.dataValues;
  } catch (error) {
    throw new CustomError(error.message, error.status);
  }
};

const createUserService = async (user) => {
  try {
    console.log(123);
    const newUser = await User.create(user);
    console.log(456);
    return newUser.dataValues;
  } catch (error) {
    console.log(error);
    throw new CustomError(error.message, error.status);
  }
};

module.exports = {
  getUsersService,
  createUserService,
  getUserByEmail,
};

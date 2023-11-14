const CustomError = require('../../error');
const { getUsersService } = require('../../services/users');

const getUsersController = async (req, res) => {
  // get users from database using sequelize
  try {
    const users = await getUsersService();
    res.json(users);
  } catch (error) {
    throw new CustomError(error.message, error.status);
  }
};

module.exports = {
  getUsersController,
};

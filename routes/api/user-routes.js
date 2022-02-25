const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/user-controller');

// to get api users // 
router.route('/').get(getUsers).post(createUser);

// to get api user id // 
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

// to get api friends id // 
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
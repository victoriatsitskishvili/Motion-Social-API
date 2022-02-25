const { user, thought } = require('../models');

const usercontroller = {
  // to get all the users //
  getUsers(req, res) {
    user.find()
    .populate({
        path: 'thought',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  // get a single user by the specific id // 
  getUserById({ params }, res) {
    user.findOne({ _id: params.id })
      .populate({
        path: 'comments',
        path: 'friends',
        select: '-__v'
      })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400); 
    });
},

    
  // to create a new user // 
  createUser({ body }, res) {
    user.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },


  // to update a user // 
  updateUser({ params, body }, res) {
    user.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },


  // to delete a user // 
   deleteUser({ params }, res) {
    user.findOneAndDelete({ _id: params.id })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  }
};


  // to add a friend to a list //

  addFriend({ params, body }, res) {
    user.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
    }

  // to remove a friend from a list // 
  removeFriend({ params, body }, res) {
    user.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true })
    .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err))
  };

module.exports = usercontroller;
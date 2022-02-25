const { thought, user } = require('../models');

const thoughtcontroller = {


  // get all thoughts // 
  getAllThoughts(req, res) {
    thoughts.find({})
      .sort({ _id: -1 })
      .then(dbThoughtsData => res.json(dbThoughtsData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // to get a though by specific id //

    thought.findOne({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought found with this id });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },


  // to create a thought //
  createThought(req, res) {
    thought.create(req.body)
      .then((dbThoughtData) => {
        return user.findOneAndUpdate(
          { _id: req.body.userId },
          { new: true },
          { $push: { thoughts: dbThoughtData._id } }
          
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'Thought was created but user not found with this id' });
        }

        res.json({ message: 'Thought was created' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },


  // to update a thought // 
  updateThought(req, res) {
    thought.findOneAndUpdate({ _id: req.params.thoughtId }, 
        { $set: req.body }, 
        { runValidators: true, new: true })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },


  // to delete a thought //
  deleteThought(req, res) {
    thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }

        //  to remove an id from thoughts //
        return user.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { new: true }
          { $pull: { thoughts: req.params.thoughtId } }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'Thought was created but user not found with this id' });
        }
        res.json({ message: 'Thought was deleted' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // to add a reaction to a thought // 

  addReaction(req, res) {
    thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { runValidators: true, new: true },
      { $addToSet: { reactions: req.body } }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },


  // to remove a reaction from a thought // 
  removeReaction(req, res) {
    thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { runValidators: true, new: true },
      { $pull: 
        { reactions: 
            { reactionId: req.params.reactionId } } }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = thoughtcontroller;
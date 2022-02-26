const router = require('express').Router();
const {
  getAllThoughts,
  getOneThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thought-controller');

// to get api thoughts // 
router.route('/').get(getAllThoughts).post(createThought);

// to get api thoughts id //
// localhost:3001/api/thoughts/:thoughtId/
router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought);

// to get api reactions //
// localhost:3001/api/thoughts/:thoughtId/reactions/
router.route('/:thoughtId/reactions').post(addReaction);

// to get api reaction id //

// localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      maxlength: 280,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      get: timestamp => dateFormat(timestamp),
      default: Date.now

    }
  },
  {
    toJSON: {getters: true},
    id: false
  }
);

module.exports = reactionSchema;
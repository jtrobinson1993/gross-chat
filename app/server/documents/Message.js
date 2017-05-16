const Mongoose = require('../utils/mongoose');

const MessageSchema = new Mongoose.Schema({
  channel: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

const Message = Mongoose.model('Message', MessageSchema);

module.exports = {
  Model: Message
};

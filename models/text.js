const mongoose = require('mongoose')
const Schema = mongoose.Schema

const savedItemSchema = new Schema({
  traditional: {
    type: String,
    default: ''
  },
  simplified: {
    type: String,
    default: ''
  },
  pinyin: {
    type: String,
    default: ''
  },
  meaning: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
})

const stickySchema = new Schema({
  content: {
    type: String,
    maxlength: 350
  },
}, {
  timestamps: true
})

const textSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  source: String,
  content: {
    type: String,
    required: true
  },
  savedItems: [savedItemSchema],
  stickies: [stickySchema]
}, {
  timestamps: true
})

module.exports = mongoose.model('Text', textSchema)
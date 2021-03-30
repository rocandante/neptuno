const mongoose = require('mongoose')

const { Schema } = mongoose

const task = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 128
  },
  description: {
    type: String,
    trim: true,
    maxlength: 255,
    default: ''
  },
  completed: {
    type: Boolean,
    default: false
  },
  url: {
    type: String,
    trim: true,
    default: ''
  },
  dueDate: {
    type: Date,
    default: null
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('task', task)

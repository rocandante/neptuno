const mongoose = require('mongoose')
const { body } = require('express-validator')

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

const sanitizers = [
  body('title').escape(),
  body('description').escape(),
  body('completed').toBoolean(),
  body('dueDate').toDate()
]

module.exports = { 
  Model: mongoose.model('task', task),
  sanitizers
}

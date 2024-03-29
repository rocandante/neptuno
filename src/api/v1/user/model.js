const mongoose = require('mongoose')
const { hash, compare } = require('bcryptjs')
const { body } = require('express-validator')
const { roles } = require('../../../config/roles')

const { Schema } = mongoose

const userSchema = new Schema({
  username: { 
    type: String, 
    unique: true, 
    required: true,
    minlength: 5,
    trim: true
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
    maxlength: 64
  },
  lastname: {
    type: String,
    trim: true,
    maxlength: 64
  },
  email: { 
    type: String, 
    unique: true, 
    required: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email is not valid']
  },
  password: { 
      type: String, 
      required: true,
      minlength: 6,
      trim: true
  },    
  role: { 
      type: String, 
      enum: roles, 
      required: true,
      default: 'user' 
  },
  isActive: { 
      type: Boolean, 
      default: true 
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

userSchema
  .virtual('name')
  .get( function getName() {
    return `${this.firstname} ${this.lastname}`
  })
  .set( function setName(name) {
    const [firstname = '', lastname = ''] = name.split(' ')
    this.firstname = firstname
    this.lastname = lastname
  })

userSchema.pre('save', async function save(next) {
  if (this.isNew || this.isModified('password')) {
    this.password = await hash(this.password, 10)
  }

  next()
})

userSchema.methods.verifyPassword = function verifyPassword(password) {
  return compare(password, this.password)
}

const sanitizers = [
  body('username').escape(),
  body('firstname').escape(),
  body('lastname').escape(),
  body('email').isEmail().normalizeEmail(),
  body('isActive').toBoolean()
]

const sanitizerLogin = [
  body('login').escape()
]

module.exports = {
  Model: mongoose.model('user', userSchema),
  sanitizers,
  sanitizerLogin
}


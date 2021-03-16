const mongoose = require('mongoose')

const { Schema } = mongoose

const user = new Schema({
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
      enum: [ "user", "autor", "admin" ], 
      required: true 
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

user
  .virtual('name')
  .get( function getName() {
    return `${this.firstname} ${this.lastname}`
  })
  .set( function setName(name) {
    const [firstname = '', lastname = ''] = name.split(' ')
    this.firstname = firstname
    this.lastname = lastname
  })

module.exports = mongoose.model('user', user)

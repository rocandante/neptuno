const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        unique: true, 
        required: true,
        minlength: 5,
        trim: true
    },
    name: { 
        type: String, 
        required: true
    },
    email: { 
        type: String, 
        unique: true, 
        required: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingresa un email válido']
    },
    password: { 
        type: String, 
        required: true,
        minlength: 6,
        trim: true
    },    
    rol: { 
        type: String, 
        enum: [ "lector", "editor", "admin" ], 
        required: true 
    },
    isActive: { 
        type: Boolean, 
        default: true 
    },
    createdOn: { 
        type: Date, 
        default: Date.now 
    }
})

module.exports = mongoose.model('User', userSchema)
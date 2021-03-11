const mongoose = require('mongoose')

// Verifica si el id es un objeto valido en MongoDB
function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id)
}

module.exports = {
  isValidId
}

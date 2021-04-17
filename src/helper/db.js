const mongoose = require('mongoose')
const config = require('../config/config')

const { pagination } = config

const paginationParseParams = ({
  limit = pagination.limit,
  page = pagination.page,
  skip = pagination.skip,
}) => ({
  limit: parseInt(limit, 10),
  page: parseInt(page, 10),
  skip: skip ? parseInt(skip, 10) : (page - 1) * limit
})

// Verifica si el id es un objeto valido en MongoDB
function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id)
}

module.exports = {
  paginationParseParams,
  isValidId
}

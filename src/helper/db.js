const mongoose = require('mongoose')
const config = require('../config/config')

const { pagination, sortDefault } = config

const paginationParseParams = ({
  limit = pagination.limit,
  page = pagination.page,
  skip = pagination.skip,
}) => ({
  limit: parseInt(limit, 10),
  page: parseInt(page, 10),
  skip: skip ? parseInt(skip, 10) : (page - 1) * limit
})

// Establece el criterio de ordenar por usando el formato:
// campo : (desc|asc)
const sortByFilter = (query) => {
  const { sortby } = query
  let sort = ''

  if (sortby) {
    const sortingCriteria = [];
    sortby.split(',').forEach((sortOption) => {
      const [key, order] = sortOption.split(':')
      sortingCriteria.push((order === 'desc' ? '-' : '') + key)
    })

    sort = sortingCriteria.join(' ')
  } else {
    sort = sortDefault
  }

  return sort
}

// Verifica si el id es un objeto valido en MongoDB
function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id)
}

module.exports = {
  paginationParseParams,
  sortByFilter,
  isValidId
}



module.exports = {
  create,
  getAll,
  getOne,
  update,
  deleteOne
}

function create (req, res, next) {
  const { body = {} } = req
  res.json(body)
}

function getAll (req, res, next) {
  res.json({})
}

function getOne (req, res, next) {
  const { params = {} } = req
  const { id } = params

  res.json({
    id
  })
}

function update (req, res, next) {
  const { body = {}, params = {} } = req
  const { id } = params

  res.json({
    id,
    body
  })
}

function deleteOne (req, res, next) {
  const { params = {} } = req
  const { id } = params

  res.json({
    id
  })
}

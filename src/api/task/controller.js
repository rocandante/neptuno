const Model = require('./model')

module.exports = {
  create,
  getAll,
  getOne,
  update,
  deleteOne
}

async function create (req, res, next) {
  const { body = {} } = req
  const document = new Model(body)

  try {
    const doc = await document.save()
    res.status(201)
    res.json(doc)
  } catch (err) {
    next( new Error(err) )
  }
  
}

async function getAll (req, res, next) {
  try {
    const docs = await Model.find({}).exec()
    res.status(200)
    res.json(docs)
  } catch (err) {
    next( new Error(err))
  }
  
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

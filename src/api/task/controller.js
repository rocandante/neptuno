const Model = require('./model')
const db = require('../../helper/db')

module.exports = {
  create,
  getAll,
  getOne,
  update,
  deleteOne,
  id
}

async function create (req, res, next) {
  const { body = {} } = req
  const document = new Model(body)

  try {
    const doc = await document.save()
    res.status(201)
    res.json({
      success: true,
      data: doc
    })
  } catch (err) {
    next( new Error(err) )
  }
  
}

async function getAll (req, res, next) {
  try {
    const docs = await Model.find({}).exec()
    res.status(200)
    res.json({
      success: true,
      data: docs
    })
  } catch (err) {
    next( new Error(err))
  }
  
}

async function getOne (req, res, next) {
  const { doc = {} } = req
  
  res.json({
    success: true,
    data: doc
  })

}

async function update (req, res, next) {
  const { doc = {}, body = {} } = req
  
  Object.assign(doc, body)

  try {
    const updated = await doc.save()

    res.status(201)
    res.json({
      success: true,
      data: updated
    })
  } catch (err) {
    next( new Error(err))
  }
}

async function deleteOne (req, res, next) {
  const { doc = {} } = req

  try {
    const removed = await doc.remove()
    res.status(201)
    res.json({
      success: true,
      data: removed
    })
  } catch (err) {
    next( new Error(err))
  }

}

async function id (req, res, next, id) {

  if (!db.isValidId(id)) return next({
    message: `${id} is not a valid id type`,
    statusCode: 400,
    level: 'warn'
  })

  try {
    const doc = await Model.findById(id)

    if (!doc) {
      const message = `${Model.modelName} not found`

      return next({
        message,
        statusCode: 404,
        level: 'warn'
      })
    }

    req.doc = doc
    next()
    
  } catch (err) {
    next( new Error(err))
  }
}

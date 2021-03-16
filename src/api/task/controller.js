const Model = require('./model')
const db = require('../../helper/db')

const { paginationParseParams } = db

/**
 * Se encarga de devolver una lista de campos ordenada
 * 
 * @param {*} task - el objeto que contiene la tarea
 */
function basicInfo(task) {
  const { id, title, description, url, dueDate, createdAt } = task
  return { id, title, description, url, dueDate, createdAt }
}

async function create (req, res, next) {
  const { body = {} } = req
  const document = new Model(body)

  try {
    const doc = await document.save()
    res.status(201)
    res.json({
      success: true,
      data: basicInfo(doc)
    })
  } catch (err) {
    next( new Error(err) )
  }
  
}

async function getAll (req, res, next) {
  const { query = {} } = req
  let { limit, page, skip } = paginationParseParams(query)

  const all = Model.find({}).sort({'createdAt': 'desc'}).skip(skip).limit(limit)
  const count = Model.countDocuments()

  try {
    const data = await Promise.all([all.exec(), count.exec()])
  
    const [ docs, total ] = data
    const pages = Math.ceil(total / limit)

    res.status(200)
    res.json({
      success: true,
      data: docs.map( x => basicInfo(x) ),
      meta: {
        limit,
        skip,
        total,
        page,
        pages
      }
    })
  } catch (err) {
    next( new Error(err))
  }
  
}

async function getOne (req, res, next) {
  const { doc = {} } = req
  
  res.json({
    success: true,
    data: basicInfo(doc) 
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
      data: basicInfo(updated)
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
      data: basicInfo(removed) 
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


module.exports = {
  create,
  getAll,
  getOne,
  update,
  deleteOne,
  id
}

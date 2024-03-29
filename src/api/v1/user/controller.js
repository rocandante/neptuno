const { Model } = require('./model')
const db = require('../../../helper/db')
const { signToken } = require('../../../middleware/auth')

const { paginationParseParams, sortByFilter } = db

/**
 * Se encarga de devolver una lista de campos ordenada
 * 
 * @param {*} user - el objeto que contiene el usuario
 */
function basicInfo(user) {
  const { id, username, name, email, role, isActive, createdAt } = user
  return { id, username, name, email, role, isActive, createdAt }
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
  const { limit, page, skip } = paginationParseParams(query)
  const sort = sortByFilter(query)

  const all = Model.find({}).sort(sort).skip(skip).limit(limit)
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

/**
 * Devuelve los datos del usuario logueado
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function getProfile (req, res, next) {
  const { doc = {} } = req
  
  res.json({
    success: true,
    data: basicInfo(doc) 
  })
}

/**
 * Actualiza el perfil del usuario logueado
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function updateProfile (req, res, next) {
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

/**
 * Verifica que el id enviado al endpoint sea válido
 * y que exista en los documentos guardados
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @param {*} id - tipo ObjectID de MongoDB
 * @returns 
 */
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

/**
 * Se encarga de validar las credenciales del usuario enviadas
 * en el objeto request y si son validas, genera el token
 * de autenticación
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function login (req, res, next) {
  const { body = {} } = req
  const { login = '', password = '' } = body

  // patrón para validar si el String contiene @ tipo email
  const pattern = /.+\@.+\..+/
  let result = {}

  // se valida si se cumple el patrón
  if (login.match(pattern)) {
    result =  { email: login }
  } else {
    result =  { username: login }
  }
  
  try {
    const user = await Model.findOne(result).exec()

    // valida que si exista el usuario
    if (!user) {
      const message = 'Email or password are invalid'

      return next({
        success: false,
        message,
        statusCode: 401,
        level: 'info'
      })
    }

    // valida si el usuario está activo
    if (!user.isActive) {
      const message = 'User is not active'

      return next({
        success: false,
        message,
        statusCode: 401,
        level: 'info'
      })
    }

    const verified = await user.verifyPassword(password)

    if (!verified) {
      const message = 'Email or password are invalid'

      return next({
        success: false,
        message,
        statusCode: 401,
        level: 'info'
      })
    }

    const { _id } = user
    const token = signToken({ sub: _id })

    return res.json({
      success: true,
      data: basicInfo(user),
      meta: {
        token
      }
    })
  } catch (err) {
    next( new Error(err))
  }

}

/**
 * Se encarga le registrar un usuario nuevo y generar el
 * token para su autenticación
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function signup (req, res, next) {
  const { body = {} } = req
  const document = new Model(body)

  // Rol por defecto para los nuevos usuarios
  document.role = 'user'

  try {
    const doc = await document.save()

    const { _id } = doc
    const token = signToken({ sub: _id })

    res.status(201)
    res.json({
      success: true,
      data: basicInfo(doc),
      meta: {
        token
      }
    })
  } catch (err) {
    next( new Error(err) )
  }
  
}

module.exports = {
  create,
  getAll,
  getOne,
  update,
  deleteOne,
  getProfile,
  updateProfile,
  id,
  login,
  signup
}

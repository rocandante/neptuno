const router = require('express').Router()
const controller = require('./controller')

/*
* /api/tasks/ POST      - Create
* /api/tasks/ GET       - Read all
* /api/tasks/:id GET    - Read one
* /api/tasks/:id PUT    - Update
* /api/tasks/:id DELETE - Delete
*/

router
  .route('/')
  .post(controller.create)
  .get(controller.getAll)

router
  .route('/:id')
  .get(controller.getOne)
  .put(controller.update)
  .delete(controller._delete)
 

module.exports = router

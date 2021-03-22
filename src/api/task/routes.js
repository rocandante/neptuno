const router = require('express').Router({
  mergeParams: true
})
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
  .post(controller.parentId, controller.create)
  .get(controller.parentId, controller.getAll)

router.param('id', controller.id)

router
  .route('/:id')
  .get(controller.parentId, controller.getOne)
  .put(controller.parentId, controller.update)
  .delete(controller.parentId, controller.deleteOne)
 

module.exports = router

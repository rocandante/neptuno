const router = require('express').Router({
  mergeParams: true
})
const controller = require('./controller')
const { auth, owner } = require('../../middleware/auth')

/*
* /api/tasks/ POST      - Create
* /api/tasks/ GET       - Read all
* /api/tasks/:id GET    - Read one
* /api/tasks/:id PUT    - Update
* /api/tasks/:id DELETE - Delete
*/

router
  .route('/')
  .post(auth, controller.parentId, controller.create)
  .get(auth, controller.parentId, controller.getAll)

router.param('id', controller.id)

router
  .route('/:id')
  .get(auth, controller.parentId, controller.getOne)
  .put(auth, owner, controller.parentId, controller.update)
  .delete(auth, owner, controller.parentId, controller.deleteOne)
 

module.exports = router

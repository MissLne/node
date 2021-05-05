const Router = require('koa-router')

const momentRouter = new Router({prefix: '/moment'})

const {
  verifyAuth,
  verifyPermission,
  aa
} = require('../middleware/auth.middleware')
const {
  verifyUser
} = require('../middleware/user.middleware')

const {
  create,
  detail,
  list,
  update
} = require('../controller/moment.controller')

momentRouter.post('/',verifyAuth,create)
momentRouter.get('/:momentId',detail)
momentRouter.get('/',list)
momentRouter.patch('/:momentId',verifyAuth,verifyPermission,update)

module.exports = momentRouter
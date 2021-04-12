const errorTypes = require('../constants/error-types')

const verifyUser = async (ctx,next) => {

  const {name,password} = ctx.requst.body
  
  if(!name || !password || name === '' || password === '') {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
    ctx.app.emit('error',error,ctx)
  }
  await next()
}

module.exports = {verifyUser}
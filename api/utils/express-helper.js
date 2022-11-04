// send 201 response with the message
const created = function(req, res, next) {
    res.created = function(message) {
      let data =
        typeof message === 'object'
          ? message
          : {
              message
            }
      return res.status(201).json({ success: true, data })
    }
    next()
  }
  
  // send 200 response
 const ok = function(req, res, next) {
    res.ok = function(message) {
      let data =
        typeof message === 'object'
          ? message
          : {
              message
            }
  
      return res.status(200).json({ success: true, data })
    }
    next()
  }
  
  // send 400 error -  either db created or validator error
  const error = function(req, res, next) {
    res.error = function(message) {
      let data =
        typeof message === 'object'
          ? message
          : {
              message
            }
      return res.status(400).json({ success: false, data })
    }
    next()
  }
  
  // send 401 error -  unauthorized access
  const unauthorized = function(req, res, next) {
    res.unauthorized = function(message) {
      const data = { error: message || 'Unauthorized access' }
      return res.status(401).json({
        success: false,
        data
      })
    }
    next()
  }
  
  // send 409 error -  conflict
  const conflict = function(req, res, next) {
    res.conflict = function(message) {
      const data = { error: message }
      return res.status(409).json({ success: false, data })
    }
    next()
  }
  
  // send 403 error -  forbidden
  const forbidden = function(req, res, next) {
    res.forbidden = function(message) {
      let data =
        typeof message === 'object'
          ? message
          : {
              message: message || 'forbidden'
            }
      return res.status(403).json({ success: false, data })
    }
    next()
  }

  module.exports = { created, ok, error, unauthorized, conflict, forbidden }
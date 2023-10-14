const jwt = require('jsonwebtoken')

exports.authentication = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({
      message: "invalid credential"
    })
  }

  const decodeToken = jwt.verify(token, 'secretKey')

  req.user.id = decodeToken.id

  if (decodeToken.role !== 'admin') {
    return res.status(403).json({
      message: "Unauthorized user"
    })
  }

  next()
}
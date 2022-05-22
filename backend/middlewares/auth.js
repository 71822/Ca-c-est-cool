const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    if(req.body.userId && req.body.userId !== decodeToken.userId){
      return res.status(401).json({
        statusbar: 401,
        message: 'Invalid user id'
      })
    }else{
      next()
    }
  }
  catch (err) {
    return res.status(500).json({
      statusbar: 500,
      message: err.message
    })
  }
}

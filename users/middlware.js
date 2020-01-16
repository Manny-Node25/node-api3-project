const User = require("./userDb")

function validateUserId(req, res, next) {
    User.getById(req.params.id)
      .then(user => {
        console.log("user", user)
        req.user = req.params.id
        if (user) next()
        else res.status(400).json({error: "user not found"})
        
      })
      .catch(err => {
        console.log(err)
        res.status(404).json({error: "user not found"})
      })
    // do your magic!
  }
  
  function validateUser(req, res, next) {
    // do your magic!
    console.log("req", req.body)
    const val = Object.values(req.body)
    console.log("va", val)
    if (!val.length) res.status(400).json({error: "missing user data"})
    if (!req.body.name) res.status(400).json({error: "missing required name field"})
    next()
  }
  
  function validatePost(req, res, next) {
    // do your magic!
    const val = Object.values(req.body)
    if (!val.length) res.status(400).json({error: "missing post data"})
    if (!req.body.text) res.status(400).json({error: "missing required text field"})
    next()
  }

  module.exports = {
      validatePost,
      validateUser,
      validateUserId
  }
const express = require('express');
const router = express.Router();
const User = require("./userDb")
const Post = require("../posts/postDb")
const { validateUserId, validateUser, validatePost } = require("./middlware")

router.post('/', (req, res) => {
  // do your magic!
  const { body } = req
  User.insert(body)
    .then(newUser => res.status(200).json(newUser))
    .catch(err => {
      console.log(err)
      res.send(500).json({error: "error adding user"})
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  const { body } = req
  if (!body.user_id) res.status(400).json({error: "missing required user_id field"})
  if (Number(body.user_id) !== Number(req.params.id)) res.status(400).json({error: "can't add post to different user"})
  Post.insert(body)
    .then(newPost => {
      res.status(200).json(newPost)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: "can't connect to server"})
    })
});

router.get('/', (req, res) => {
  // do your magic!
  User.get()
    .then(users => res.status(200).json(users))
    .catch(err => {
      console.log(err)
      res.status(500).json({error: "error retrieving the users"})
    })

});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  console.log("lsdfj",req.user)
  const { id } = req.params
  User.getById(id)
    .then(user => {
      if (req.user) res.status(200).json(user)
      else res.status(404).json({error: "user not found"})
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: "error retrieving user"})
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  console.log("id posts")
  const { id } = req.params
  User.getUserPosts(id)
    .then(users => {
      console.log(users)
      res.status(200).json(users)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: "error retrieving users posts"})
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params
  User.remove(id)
    .then(deleted => {
      if (req.user) res.status(200).json(deleted)
      else res.status(404).json({error: "user not found"})
    })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
  const { id } = req.params
  const { body } = req
  User.update(id,body)
    .then(updated => {
      if (req.user) res.status(200).json(updated)
      else res.status(404).json({error: "user not found"})
    })
});

//custom middleware



module.exports = router;
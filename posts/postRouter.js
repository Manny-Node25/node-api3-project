const express = require('express');

const router = express.Router();
const Post = require("./postDb")

router.get('/', (req, res) => {
  // do your magic!
  Post.get()
    .then(post => res.status(200).json(post))
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "error retreiving the posts"})
    })
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  const { id } = req.params
  Post.getById(id)
    .then(post => res.status(200).json(post))
    .catch(err => {
      console.log(err)
      res.status(404).json({error: "post not found"})
    })
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  const { id } = req.params
  Post.remove(id)
    .then(deleted => {
      if (deleted !== 0) res.status(200).json({ message: 'The post has been deleted ' });
      else res.status(404).json({ message: 'The post doesnt exist' });
    })
});

router.put('/:id', validatePostId, (req, res) => {
  const { id } = req.params
  const { body } = req
    Post.update(id, body)
      .then(updated => {
        console.log(updated)
        if (updated) res.status(200).json(updated)
        else res.status(404).json({error: "post doesn't exist"})
      })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  if (req.params.id) next()
  else res.status(403).json({error: "Must include ID"})
}

module.exports = router;
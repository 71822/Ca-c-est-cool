const express = require('express');
const router = express.Router();
const post = require('../services/post');


/* GET posts */
router.get('/multiplePosts', async function (req, res, next) {
  try {
    res.json(await post.getMultiplePosts(req.query));
  } catch (err) {
    console.error(`Error while get posts`, err.message);
    next(err);
  }
});


/* GET post by :id */
router.get('/post/:id', async function (req, res, next) {
  try {
    res.json(await post.getPost(req.params.id));
  } catch (err) {
    console.error(`Error while get post`, err.message);
    next(err);
  }
});


/* POST post */
router.post('/createPost', async function (req, res, next) {
  try {
    res.json(await post.createPost(req.body));
  } catch (err) {
    console.error(`Error while creating post`, err.message);
    next(err);
  }
});



/* PUT update post */
router.put('/postUpdate/:id', async function (req, res, next) {
  try {
    res.json(await post.updatePost(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating post`, err.message);
    next(err);
  }
});


/* DELETE post */
router.delete('/postDelete/:id', async function (req, res, next) {
  try {
    res.json(await post.removePost(req.params.id));
  } catch (err) {
    console.error(`Error while deleting post`, err.message);
    next(err);
  }
});

module.exports = router;

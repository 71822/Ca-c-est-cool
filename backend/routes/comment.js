const express = require('express');
const router = express.Router();
const comment = require('../services/comment');


/* GET comment by_2(idPost) :id */
router.get('/comment/:id', async function (req, res, next) {
  try {
    res.json(await comment.getComment(req.params.id));
    console.log();
  } catch (err) {
    console.error(`Error while get post`, err.message);
    console.log(err);
    next(err);
  }
});


/* GET comments */
router.get('/multipleComments', async function(req, res, next) {
  try {
    res.json(await comment.getMultipleComments(req.query));
  } catch (err) {
    console.error(`Error while get comments`, err.message);
    next(err);
  }
});



/* POST comment */
router.post('/createComment', async function(req, res, next) {
  try {
    res.json(await comment.createComment(req.body));
  } catch (err) {
    console.error(`Error while creating comment`, err.message);
    next(err);
  }
});



/* PUT update comment */
router.put('/commentUpdate/:id', async function(req, res, next) {
  try {
    res.json(await comment.updateComment(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating comment`, err.message);
    next(err);
  }
});


/* DELETE comment */
router.delete('/commentDelete/:id', async function(req, res, next) {
  try {
    res.json(await comment.removeComment(req.params.id));
  } catch (err) {
    console.error(`Error while deleting comment`, err.message);
    next(err);
  }
});

module.exports = router;

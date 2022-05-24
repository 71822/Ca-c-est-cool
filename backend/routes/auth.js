const express = require('express');
const router = express.Router();
const auth = require('../services/auth');


/* POST create member */
router.post('/signup', async function (req, res, next) {
  try {
    res.json(await auth.signup(req.body));
  } catch (err) {
    console.error(`Error while signup`, err.message);
    next(err);
  }
});


router.post('/signin', async function (req, res, next) {
  try {
    res.json(await auth.signin(req.body));
  } catch (err) {
    console.error(`Error while signin`, err.message);
    next(err);
  }
});


module.exports = router;

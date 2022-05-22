const express = require('express');
const router = express.Router();
const membre = require('../services/membre');

/* GET membres */
router.get('/multipleMembre', async function(req, res, next) {
  try {
    res.json(await membre.getMultiple(req.query));
  } catch (err) {
    console.error(`Error while get membre`, err.message);
    next(err);
  }
});


/* GET membre by :id */
router.get('/membre/:id', async function(req, res, next) {
  try {
    res.json(await membre.getMembre(req.params.id));
  } catch (err) {
    console.error(`Error while get membre`, err.message);
    next(err);
  }
});


/* PUT update membre */
router.put('/membreUpdate/:id', async function(req, res, next) {
  try {
    res.json(await membre.updateMembre(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating membre`, err.message);
    next(err);
  }
});


/* DELETE membre */
router.delete('/membreDelete/:id', async function(req, res, next) {
  try {
    res.json(await membre.removeMembre(req.params.id));
  } catch (err) {
    console.error(`Error while deleting membre`, err.message);
    next(err);
  }
});


module.exports = router;

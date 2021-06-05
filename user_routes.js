const express = require('express');
const { func } = require('joi');
const router = express.Router();
const Users = require('./users.js');

//route that requests for all users in the database
router.get('/', async function(req, res, next) {
    try {
      res.json(await Users.getUsers(req.query.page));
    } catch (err) {
      console.log("test1")
      console.log(`Error while getting users`);
      next(err)
    }
  });

//route for adding a user to the database
router.post('/add', async function(req, res, next) {
  try {
    res.json(await Users.create(req.body));
  } catch (err) {
    console.error(`error while creating user`)
    next(err)
  }
})


router.get('/:id', async function(req, res, next) {
  try {
    res.json(await Users.getUserdata(req.params.id));
  } catch (err) {
    console.error(`error changing user data`)
    next(err)
  }
})

//route for editing the state of the user
//the amount of the checkedout books will be changed
router.put('/checkout/:id', async function(req, res, next) {
    try {
      res.json(await Users.updateCheckedoutBooks(req.params.id, req.body));
  } catch (err) {
    console.error(`error updating user`)
    next(err)
  }
})

//route for deleting user based on id
router.delete('/delete/:id', async function(req, res, next) {
  try {
    res.json(await Users.deleteUser(req.params.id))
  } catch (err) {
    console.error(`error deleting user`)
    next(err)
  }
})

  module.exports = router;

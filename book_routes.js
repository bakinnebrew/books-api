const express = require('express');
const router = express.Router();
const Books = require('./books.js');

router.get('/', async function(req, res, next) {
  try {
    res.json(await Books.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting books `, err.message);
    next(err);
  }
});

router.post('/add', async function(req, res, next) {
  try {
    res.json(await Books.create(req.body));
  } catch (err) {
    console.error(`error while creating book`)
    next(err)
  }
})

router.get(`/:id`, async function(req, res, next) {
  try {
    res.json(await Books.getSingle(req.params.id));
  } catch(err) {
    console.error(`error while getting book`, err.message)
    next(err)
  }
})

router.put('/edit/:id', async function(req, res, next) {
  try {
    res.json(await Books.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating book`, err.message)
    next(err)
  }
});

router.put('/checkout/:id', async function(req, res, next) {
  try {
    res.json(await Books.checkout(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while checking out book`, err.message)
    next(err)
  }
});

router.get('/checkedout/:id', async function(req, res, next) {
  try {
    res.json(await Books.getCheckedoutBooks(req.query.page, req.params.id));
  } catch (err) {
    console.error(`error getting checkedout books`, err.message)
    next(err)
  }
});

router.put('/turn_in/:id', async function(req, res, next) {
  try {
    res.json(await Books.turnInBook(req.params.id, req.body));
  } catch (err) {
    console.log(`error turning in book`, err.message)
    next(err)
  }
})

router.delete('/delete/:id', async function(req, res, next) {
  try {
    res.json(await Books.deleteBook(req.params.id, req.body));
  } catch (err) {
    console.log(`error deleting book`, err.message)
    next(err)
  }
})

module.exports = router;

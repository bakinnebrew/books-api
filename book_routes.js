const express = require('express');
const router = express.Router();
const Books = require('./books.js');

//'homepage' route that renders a list of all books
router.get('/', async function(req, res, next) {
  try {
    res.json(await Books.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting books `, err.message);
    next(err);
  }
});

//route for adding a book
router.post('/add', async function(req, res, next) {
  try {
    res.json(await Books.create(req.body));
  } catch (err) {
    console.error(`error while creating book`)
    next(err)
  }
})

//route for rendering data for single book based on id as parameter
router.get(`/:id`, async function(req, res, next) {
  try {
    res.json(await Books.getSingle(req.params.id));
  } catch(err) {
    console.error(`error while getting book`, err.message)
    next(err)
  }
})

//route for editing the data of book based on book id as a paramter
router.put('/edit/:id', async function(req, res, next) {
  try {
    res.json(await Books.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating book`, err.message)
    next(err)
  }
});

//route for 'checking out' a book based on book id
//this route changes data of book from checkedout: false, to true
//it also adds the 'borrower' to the book object 
router.put('/checkout/:id', async function(req, res, next) {
  try {
    res.json(await Books.checkout(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while checking out book`, err.message)
    next(err)
  }
});

//route that loads all books checkedut by a user with the id as the  function parameter
router.get('/checkedout/:id', async function(req, res, next) {
  try {
    res.json(await Books.getCheckedoutBooks(req.query.page, req.params.id));
  } catch (err) {
    console.error(`error getting checkedout books`, err.message)
    next(err)
  }
});

//similar to the checkout route, this reverts the book back to its default object state
//removing the 'borrower' value to the relevant key, and 'checkedout' to false
router.put('/turn_in/:id', async function(req, res, next) {
  try {
    res.json(await Books.turnInBook(req.params.id, req.body));
  } catch (err) {
    console.log(`error turning in book`, err.message)
    next(err)
  }
})

//deletes a book from the database, and consequently the DOM, based on book id
router.delete('/delete/:id', async function(req, res, next) {
  try {
    res.json(await Books.deleteBook(req.params.id, req.body));
  } catch (err) {
    console.log(`error deleting book`, err.message)
    next(err)
  }
})

module.exports = router;

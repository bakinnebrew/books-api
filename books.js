const db = require('./db');
const helper = require('./helper.js');
const config = require('./config.js');
//
//FUNCTIONS FOR ENGAGING WITH THE MYSQL DATABASE
//


//GET request, selects multiple books
async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, author, checkedout, borrower, borrower_id, checkout_date, due_date 
    FROM books LIMIT ?,?`, 
    [offset, config.listPerPage]
  );
  const books = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    books,
    meta
}
}

//GET request, selects single book based on id
async function getSingle(id){
  const book = await db.query(
    `SELECT id, name, author, checkedout, borrower, borrower_id, checkout_date, due_date 
    FROM books WHERE id = ${id}`
  );
console.log(book)

  return {
    book
}
}

//selects all checkedout books where the borrower_id  = id as parameter
async function getCheckedoutBooks(page =1, id){
  console.log("borrower id: "+ id)
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, author, checkedout, borrower, borrower_id, checkout_date, due_date 
    FROM books 
    WHERE borrower_id = ${id}
    LIMIT ?,?`,
    [offset, config.listPerPage]
  );
  const books = helper.emptyOrRows(rows);
  const meta = {page};
console.log(books)

  return {
    books,
    meta
}
}

//function for creating a book and saving it to the database
async function create(book){
  const result = await db.query(
    `INSERT INTO books
    (name, author, checkedout, borrower, borrower_id, checkout_date, due_date)
    VALUES
    (?,?,?,?,?,?,?)`,
    [
      book.name, book.author, 0, "",
      1, null, null
    ]
  );
  let message = "Error is creating book"

  if (result.affectedRows){
    message = "Book added succesfully"
  }

  return{message}
}

//function for updating book
async function update(id, book){
  const result = await db.query(
   `UPDATE books
    SET name=?, author=?
    WHERE id=?`,
    [
      book.title, book.author, id
    ]
  );

  let message = 'Error in updating book';

  if (result.affectedRows) {
    message = 'Book updated successfully';
  }

  return {message};
}

//function for updating state of book (checkout)
async function checkout(id, book){
  const result = await db.query(
    `UPDATE books
    SET checkedout=?, borrower=?, borrower_id=?
    WHERE id=${id}`,
    [
      true, book.borrower, book.borrower_id, 
    ]
  );

    
  let message = 'Error in checking out book';

  if (result.affectedRows) {
    message = 'Book updated successfully';
  }

  return {message}
}

//function for updating state of book (turn in)
//state will be reverted back to what it was prior to being checkedout
async function turnInBook(id, book){
  const result = await db.query(
    `UPDATE books
    SET checkedout=?, borrower=?, borrower_id=?
    WHERE id=${id}`,
    [
      book.checkedout, "", 0
    ]
  );
  let message = 'Error in turning book';

  if (result.affectedRows) {
    message = 'Book turned in successfully';
  }

  return {message}

}

//function for deleting book
async function deleteBook(id) {
  const result = await db.query(
    `DELETE FROM books WHERE id=${id}`
  );
  let message = 'Error in deleting user';

    if (result.affectedRows) {
      message = 'book deleted successfully';
    }
  
    return {message};
}

module.exports = {
  getMultiple,
  getSingle,
  create,
  update,
  checkout,
  getCheckedoutBooks,
  turnInBook,
  deleteBook  
}

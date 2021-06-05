const db = require('./db');
const helper = require('./helper.js');
const config = require('./config.js');

//
//FUNCTIONS BELOW ENGAGE WITH THE MYSQL DATABASE
//


//function for requesting all users
async function getUsers(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT id, first_name, last_name, user_name, checkedout_books, overdue_books
      FROM Users LIMIT ?,?`,
      [offset, config.listPerPage]
    );
    const users = helper.emptyOrRows(rows)
    const meta = {page}
  
  return{
    users,
    meta
  }
  }

//function for adding a user to the database
  async function create(user){
    const user_name = user.first_name + " " + user.last_name
    const result = await db.query(
      `INSERT INTO Users
      (first_name, last_name, user_name, checkedout_books, overdue_books)
      VALUES
      (?,?,?,?,?)`,
      [
        user.first_name, user.last_name, user_name, 
        0, 0
      ]
    );
    let message = "Error in creating user"
  
    if (result.affectedRows){
      message = "user added succesfully"
    }
  
    return{message}
  }

//function for retrieving the amount of checkedout books based on user id
  async function getUserdata(id){
    console.log(id)
    const user = await db.query(
      `SELECT id, user_name, checkedout_books
      FROM Users WHERE id = ${id}`
    );
    console.log(user)

    return{
      user
    }
  }

//function for updating the amount of checkout books a user has
  async function updateCheckedoutBooks(id, user){
    const result = await db.query(
      `UPDATE Users
      SET checkedout_books=?
      WHERE id = ${id}`,
      [
        user.checkedout_books
      ]
    );
    let message = 'Error in updating user';

  if (result.affectedRows) {
    message = 'user updated successfully';
  }

  return {message}

  }

 //function for deleting user based on id
  async function deleteUser(id){
    const result = await db.query(
      `DELETE FROM Users WHERE id=${id}`
    );
    let message = 'Error in deleting user';

    if (result.affectedRows) {
      message = 'user deleted successfully';
    }
  
    return {message};

  }


module.exports = {
    getUsers,
    create,
    getUserdata,
    updateCheckedoutBooks,
    deleteUser

  }
  

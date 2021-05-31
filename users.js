const db = require('./db');
const helper = require('./helper.js');
const config = require('./config.js');

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
  
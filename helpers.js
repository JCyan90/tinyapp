const bcrypt = require('bcrypt');
const users = require('./databases/users');

function generateRandomString() {
  return Math.random().toString(36).substring(6);
};

// Return the user object which match the email address
const getUserByEmail = (email, database) => {
  return Object.values(database).find(user => user.email === email);
};

// Return an object of URLs with same userID as the user
const urlsForUser = (id, db) => {
  let filtered = {};
  for (let urlID of Object.keys(db)) {
    if (db[urlID].userID === id) {
      filtered[urlID] = db[urlID];
    }
  }
  return filtered;
};

// Add a user to the users database
const addUser = (email, password, db) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const id = generateRandomString();
  db[id] = {
    id,
    email,
    password: hashedPassword
  };
  return id;
};

module.exports = { getUserByEmail, generateRandomString, urlsForUser, addUser };
const bcrypt = require('bcrypt');
const urlDatabase = require('./databases/urls');
const users = require('./databases/users');

const getUserByEmail = (email, database) => {
  return Object.values(database).find(user => user.email === email);
};

function generateRandomString() {
  return Math.random().toString(36).substring(6);
};

const urlsForUser = (id) => {
  let filtered = {};
  for (let urlID of Object.keys(urlDatabase)) {
    if (urlDatabase[urlID].userID === id) {
      filtered[urlID] = urlDatabase[urlID];
    }
  }
  return filtered;
};

const addUser = (email, password) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const id = generateRandomString();
  users[id] = {
    id,
    email,
    password: hashedPassword
  };
  return id;
};

module.exports = { getUserByEmail, generateRandomString, urlsForUser, addUser };
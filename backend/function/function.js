const bcrypt = require("bcrypt");


function hashPassword(plainTextPassword) {
  const salt = bcrypt.genSaltSync(10);
  const mdp = bcrypt.hashSync(plainTextPassword, salt);
  return mdp;
}

function comparePasswords(plainTextPassword, hash) {
  return bcrypt.compareSync(plainTextPassword, hash);
}


module.exports = {
  hashPassword,
  comparePasswords
}

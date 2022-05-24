const db = require('./db');
const helper = require('../helper');
const fonction = require('../function/function');
const jwt = require('jsonwebtoken');
require("dotenv").config();


//cree un membre
async function signup(membre) {
  let req = `INSERT INTO membre(nom, prenom, email, motPasse, photo) VALUES(?,?,?,?,?)`;
  let values = [membre.nom, membre.prenom, membre.email, fonction.hashPassword(membre.motPasse), membre.photo];
  const result = await db.query(req, values)
  let message = 'Error in creating membre';
  if (result.affectedRows) {
    message = 'Membre created successfully';
  }
  console.log(message);
  return { message };
}

//connexion
async function signin(membre) {
  let req = `SELECT id, email, motPasse FROM membre WHERE email=?`;
  let values = [membre.email];
  const rows = await db.query(req, values);
  const data = helper.returnData(rows);

  let token = '';
  let id = '';
  let pass = '';
  for (let property of data) {
    let results = fonction.comparePasswords(membre.motPasse, property.motPasse);
    if (results) {
      message = 'Bienvenu sur votre compte !';
      token = jwt.sign({ userId: id }, process.env.JWT_SECRET, {expiresIn: "3d"});
      id = property.id;
      pass = true;
    }
  }

  if (token) {
    message = {message, token, id, pass};
  }else{
    message = {"message" : 'Connexion échouée', "pass": false};
  }
  //console.log(message);
  return { message };
}



module.exports = {
  signup,
  signin
}











//   const db = require('./db');
// const helper = require('../helper');
// const fonction = require('../function/function');


// //cree un membre
// async function signup(membre) {
//   let req = `INSERT INTO membre(nom, prenom, email, motPasse, photo) VALUES(?,?,?,?,?)`;
//   let values = ["", "", membre.email, fonction.hashPassword(membre.motPasse), ""];

//   const result = await db.query(req, values)
//   let message = 'Error in creating membre';
//   if (result.affectedRows) {
//     message = 'Membre created successfully';
//   }
//   console.log(message);
//   return { message };
// }

// //connexion
// async function signin(membre) {
//   let req = `SELECT email, motPasse FROM membre WHERE email=?`;
//   let values = [membre.email];
//   const rows = await db.query(req, values);
//   const data = helper.returnData(rows);

//   let response = '';
//   for (let property of data) {
//     let results = fonction.comparePasswords(membre.motPasse, property.motPasse);
//     if (results) {
//       response = 'ok';
//     }
//   }
//   let message = 'Error connection';
//   if (response == 'ok') {
//     message = 'Vous êtes connecté';
//   }
//   console.log(message);
//   return { message };
// }

// module.exports = {
//   signup,
//   signin
// }

const db = require('./db');
const helper = require('../helper');
const fonction = require('../function/function');
const tokenVerif = require('../middlewares/auth');


//lire la liste des membre
async function getMultiple() {
  if(tokenVerif){
    const rows = await db.query(`SELECT nom, prenom, email, motPasse, photo FROM membre`);
    const data = helper.returnData(rows);
    return {
      data
    }
  }
}

//lire un membre
async function getMembre(id) {
  if(tokenVerif){
    let req = `SELECT id, nom, prenom, email, motPasse FROM membre WHERE id=?`;
    let values = [id];
    console.log(values);
    const rows = await db.query(req, values);
    const data = helper.returnData(rows);
    console.log(data);
    return {data}
  }
}


//update membre
async function updateMembre(id, membre) {
  if(tokenVerif){
    let req = `UPDATE membre SET nom=?, prenom=?, email=?, motPasse=?, photo=?`;
    let values = [membre.nom, membre.prenom, membre.motPasse, membre.photo];
    console.log(values);
    const rows = await db.query(req, values);
    let message = 'Error in updating membre';
    if (result.affectedRows) {
      message = 'Membre updated successfully';
    }
    return { message };
  }
}

//delete membre
async function removeMembre(id) {
  if(tokenVerif){
    const result = await db.query(`DELETE FROM membre WHERE id=${id}`);
    let message = 'Error in deleting membre';
    if (result.affectedRows) {
      message = 'Membre deleted successfully';
    }
    return { message };
  }
}

module.exports = {
  getMultiple,
  getMembre,
  updateMembre,
  removeMembre
}

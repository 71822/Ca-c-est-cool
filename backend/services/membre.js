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
    let req = `SELECT id, nom, prenom, email, motPasse, photo FROM membre WHERE id=?`;
    let values = [id];
    const rows = await db.query(req, values);
    const data = helper.returnData(rows);
    return {data}
  }
}


//update membre
async function updateMembre(id, membre) {
  if(tokenVerif){
    let req = `UPDATE membre SET nom=?, prenom=?, email=?, motPasse=?, photo=? WHERE id=?`;
    let values = [membre.nom, membre.prenom, membre.email, membre.motPasse, membre.photo, parseInt(id)];
    const rows = await db.query(req, values);
    let message = 'Error in updating membre';
    if (rows) {
      message = 'Membre updated successfully';
      console.log(message);
    }
    return { message };
  }
}

//delete membre
async function removeMembre(id) {
  console.log('deletebackid'+id);
  if(tokenVerif){
    let req = `DELETE FROM commentaire WHERE id_1=?`;
    let values = [id];
    const rows = await db.query(req, values);
    if(rows){
      let req = `DELETE FROM poste WHERE id_1=?`;
      let values = [id];
      const rows = await db.query(req, values);
    }if(rows){
      let req = `DELETE FROM membre WHERE id=?`;
      let values = [id];
      const rows1 = await db.query(req, values);
      message = 'Membre deleted successfully';
      console.log(message)
    }else{
      message = 'Error deleted membre';
      console.log(message)
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

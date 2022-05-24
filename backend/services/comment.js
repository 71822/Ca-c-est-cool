const db = require('./db');
const helper = require('../helper');



//lire la liste des comments
async function getMultipleComments() {
  const rows = await db.query(`SELECT texte, pouce, createdAt FROM commentaire`);
  const data = helper.returnData(rows);
  return {
    data
  }
}

//cree un comment
async function createComment(commentaire) {
  if(tokenVerif){
    let date= Date();
    let req = `INSERT INTO commentaire(texte, pouce, createdAt) VALUES(?,?,?)`;
    let values = [commentaire.texte, commentaire.pouce, date];
    const result = await db.query(req, values)
  }
  let message = 'Error in creating comment';
  if (result.affectedRows) {
    message = 'Comment created successfully';
  }
  return { message };
}

//update comment
async function updateComment(id, commentaire) {
  if(tokenVerif){
    let date= Date();
    let req = `UPDATE commentaire SET texte=?, pouce=?, createdAt=? WHERE id=?`;
    let values = [commentaire.texte, commentaire.pouce, date, parseInt(id)];
    const rows = await db.query(req, values);
    let message = 'Error in updating comment';
    if (rows) {
      message = 'Comment updated successfully';
    }
    return { message };
  }
}

//delete comment
async function removeComment(id) {
  if(tokenVerif){
    let req = `DELETE FROM commentaire WHERE id_1=?`;
    let values = [id];
    const rows = await db.query(req, values);
    if(rows){
      message = 'Comment deleted successfully';
      console.log(message);
    }
    return { message };
  }
}

module.exports = {
  getMultipleComments,
  createComment,
  updateComment,
  removeComment
}

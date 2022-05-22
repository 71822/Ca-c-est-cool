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
  const result = await db.query(
    `INSERT INTO commentaire(texte, pouce, createdAt)
    VALUES(${commentaire.texte}, ${commentaire.pouce}, ${commentaire.createdAt})`
  );
  let message = 'Error in creating comment';
  if (result.affectedRows) {
    message = 'Comment created successfully';
  }
  return { message };
}

//update comment
async function updateComment(id, commentaire) {
  const result = await db.query(
    `UPDATE commentaire SET texte="${commentaire.texte}", pouce=${commentaire.pouce}, createdAt=${commentaire.createdAt}"
    WHERE id=${id}`
  );
  let message = 'Error in updating comment';
  if (result.affectedRows) {
    message = 'Comment updated successfully';
  }
  return { message };
}

//delete comment
async function removeComment(id) {
  const result = await db.query(`DELETE FROM commentaire WHERE id=${id}`);
  let message = 'Error in deleting comment';
  if (result.affectedRows) {
    message = 'Comment deleted successfully';
  }
  return { message };
}

module.exports = {
  getMultipleComments,
  createComment,
  updateComment,
  removeComment
}

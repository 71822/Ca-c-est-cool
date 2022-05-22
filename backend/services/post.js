const db = require('./db');
const helper = require('../helper');
const tokenVerif = require('../middlewares/auth');


//lire la liste des posts
async function getMultiplePosts() {
  if(tokenVerif){
    const rows = await db.query(`SELECT title, contenu, pouce, imagePost, createdAt FROM poste`);
    const data = helper.returnData(rows);
    console.log(data);
    return {data}
  }
}

//lire un post
async function getPost(id) {
  if(tokenVerif){
    const rows = await db.query(`SELECT title, contenu, pouce, imagePost, createdAt FROM poste WHERE id=${id}`);
    const data = helper.returnData(rows);
    return {data}
  }
}

//cree un post
async function createPost(poste) {
  const result = await db.query(
    `INSERT INTO poste(title, contenu, pouce, imagePost, createdAt)
    VALUES(${poste.title}, ${poste.contenu}, ${poste.pouce}, ${poste.imagePost}, ${poste.createdAt})`
  );
  let message = 'Error in creating post';
  if (result.affectedRows) {
    message = 'Post created successfully';
  }
  return { message };
}

//update post
async function updatePost(id, poste) {
  if(tokenVerif){
    const result = await db.query(
      `UPDATE poste
      SET title="${poste.title}", contenu=${poste.contenu}, pouce=${poste.pouce}, imagePost=${poste.imagePost}, createdAt=${poste.createdAt}"
      WHERE id=${id}`
    );
    let message = 'Error in updating post';
    if (result.affectedRows) {
      message = 'Post updated successfully';
    }
    return { message };
  }
}

//delete post
async function removePost(id) {
  if(tokenVerif){
    const result = await db.query(`DELETE FROM poste WHERE id=${id}`);
    let message = 'Error in deleting post';
    if (result.affectedRows) {
      message = 'Post deleted successfully';
    }
    return { message };
  }
}

module.exports = {
  getMultiplePosts,
  getPost,
  createPost,
  updatePost,
  removePost
}

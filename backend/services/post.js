const db = require('./db');
const helper = require('../helper');
const tokenVerif = require('../middlewares/auth');


//lire la liste des posts
async function getMultiplePosts() {
  if(tokenVerif){
    const rows = await db.query(`SELECT title, contenu, pouce, imagePost, createdAt FROM poste ORDER BY id DESC`);
    const data = helper.returnData(rows);
    return {data}
  }
}

//lire un post
async function getPost(id) {
  if(tokenVerif){
    let req = `SELECT title, contenu, pouce, imagePost, createdAt FROM poste WHERE id=?`;
    let values = [id];
    const rows = await db.query(req, values);
    const data = helper.returnData(rows);
    return {data}
  }
}

//cree un post
async function createPost(post) {
  if(tokenVerif){
      let date= Date();
      let req = `INSERT INTO poste(title, contenu, pouce, imagePost, createdAt, id_1) VALUES(?,?,?,?,?,?)`;
      let values = [post.title, post.contenu, 0, post.imagePost, date, post.id_1];
      const result = await db.query(req, values)
      let message = 'Error in creating post';
      if (result.affectedRows) {
        message = 'Post created successfully';
      }
      return { message };
  }
}

//update post
async function updatePost(id, poste) {
    if(tokenVerif){
      let date= Date();
      let req = `UPDATE poste SET title=?, contenu=?, pouce=?, imagePost=?, createdAt=? WHERE id=?`;
      let values = [poste.title, poste.contenu, poste.pouce, poste.imagePost, date, parseInt(id)];
      const rows = await db.query(req, values);
      let message = 'Error in updating post';
      if (rows) {
        message = 'Post updated successfully';
      }
      return { message };
    }
}

//delete post
async function removePost(id) {
  if(tokenVerif){
    let req = `DELETE FROM commentaire WHERE id_1=?`;
    let values = [id];
    const rows = await db.query(req, values);
    if(rows){
      let req = `DELETE FROM poste WHERE id_1=?`;
      let values = [id];
      const rows = await db.query(req, values);
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
  getMultiplePosts,
  getPost,
  createPost,
  updatePost,
  removePost
}

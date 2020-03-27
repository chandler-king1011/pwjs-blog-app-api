const mysql = require("mysql");
require('dotenv').config();
const dbConfig = require("../../database/database");



class Post {
    constructor() {
        this.dbConn = mysql.createPool(dbConfig);
    }
    getAll(res) {
        this.dbConn.query("SELECT * FROM posts", 
        (err, results) => { 
            if (err) {
                res.status(400).send({"error": err});
            } else {
                res.status(200).send(results);
            }
        });

    }
    getOneBlog(postId, res) {
        this.dbConn.query("SELECT * FROM posts WHERE posts_id = ?", 
        [postId], 
        (err, results) => {
            if(err) {
                res.status(400).send(err);
            } else {
                res.status(200).send(results);
            }
        })
    }
    add(newPost, res) {
        this.dbConn.query("INSERT INTO posts SET ?", 
        [newPost], 
        (err, results) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(200).send(results);
            }
        })
    }
}

module.exports = Post;
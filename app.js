const express = require("express");
const fileUpload = require("express-fileupload");
require('dotenv').config();
const cloudinary = require('cloudinary').v2


const Post = require("./api/models/posts");
const port = process.env.PORT || 5000;
const app = express();
const postData = new Post();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));


app.get("/api/posts", (req, res) => {
    postData.getAll(res);  
})


app.get("/api/posts/:post_id", (req, res) => {
    postData.getOneBlog(req.params.post_id, res);

});

app.post("/api/posts", (req, res) => {
    const newPost = {
        "posts_title": req.body.title,
        "posts_content": req.body.content,
        "posts_date": `${Date.now()}`,
        "posts_img": ""
    }
    const image = new Promise((resolve, reject) => {
        cloudinary.uploader.upload(req.files.post_image.tempFilePath, 
            (error, result) => {
                if (error) {
                    reject(newPost)
                } else {
                    newPost.posts_img = result.secure_url;
                    resolve(newPost);
                }
        })
    })
    
    image.then(resolve => {
        postData.add(resolve, res);
    }).catch(error => {
        res.status(400).send({"Message": "Please add an image.", "error": error});
    });
    
})


app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
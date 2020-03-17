const express = require("express");
const multer = require("multer");
const Post = require("./api/models/posts");
require('dotenv').config();


const app = express();
const postData = new Post();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`);
    }
})
const upload = multer({storage: storage});

const getExt = (mimeType) => {
    switch(mimeType){
        case "image/png":
            return ".png"
        case "image/jpeg":
            return  ".jpeg"
        default:
            return ".png"
    }
}



app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});
app.use('/uploads', express.static("uploads"));

app.get("/api/posts", (req, res) => {
    res.status(200).send(postData.getAll());  
})


app.get("/api/posts/:post_id", (req, res) => {
    const singlePost = postData.getOneBlog(req.params.post_id);
    if(singlePost) {
        res.status(200).send(singlePost);
    } else {
        res.status(404).send("Not Found");
    }
    
});

app.post("/api/posts", upload.single("post-image"), (req, res) => {
    const fileName = ((req.file.path).slice(8));
    const newPost = {
        "id": `${Date.now()}`,
        "title": req.body.title,
        "content": req.body.content,
        "added_date": `${Date.now()}`,
        "post_image": `uploads/${fileName}`
    }
    postData.add(newPost);
    res.status(200).send(newPost);
})


app.listen(port, () => console.log(`Listening on http://localhost:3000${port}`));
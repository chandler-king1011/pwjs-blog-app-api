const express = require("express");
const multer = require("multer");
const Post = require("./api/models/posts");
require('dotenv').config();

const port = process.env.PORT || 5000;
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
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
app.use('/uploads', express.static("uploads"));

app.get("/api/posts", (req, res) => {
    postData.getAll(res);  
})


app.get("/api/posts/:post_id", (req, res) => {
    postData.getOneBlog(req.params.post_id, res);

});

app.post("/api/posts", upload.single("post-image"), (req, res) => {
    const fileName = ((req.file.path).slice(8));
    const newPost = {
        "posts_id": `${Date.now()}`,
        "posts_title": req.body.title,
        "posts_content": req.body.content,
        "posts_date": `${Date.now()}`,
        "posts_img": `uploads/${fileName}`
    }
    postData.add(newPost, res);
})


app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
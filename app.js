const express = require("express");
const Post = require("./api/models/posts");


const app = express();
const postData = new Post();



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

app.post("/api/posts", (req, res) => {
    postData.add(post);
    res.status(200).send();
})


app.listen(3000, () => console.log("Listening on http://localhost:3000"));
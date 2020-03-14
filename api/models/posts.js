const fs = require("fs");
const PATH = "./data.json";

class Post {
    constructor() {

    }
    getAll() {
        return this.readData();

    }
    getOneBlog(postId) {
        const allPosts = this.readData();
        const singlePost = allPosts.find((post) => post.id == postId);
        return singlePost;
    }
    add(newPost) {
        const currentPosts = this.readData();
        currentPosts.unshift(newPost);
        this.storeData(currentPosts);
    }
    readData() {
        let rawData = fs.readFileSync(PATH);
        let data = JSON.parse(rawData);
        return data
    }
    storeData(rawData) {
        let data = JSON.stringify(rawData);
        fs.writeFileSync(PATH, data);
    }
}

module.exports = Post;
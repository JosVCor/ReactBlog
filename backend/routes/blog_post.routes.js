const {
    createPost,
    findAllPosts,
    findOnePost,
    updatePost,
    deletePost,
    findAllPostsByCategory,
    incrementViews
} = require('../controllers/blog_posts.controller');
const multer = require('multer');

// Configure multer middleware
const storage = multer.memoryStorage();
const upload = multer({ storage });


module.exports = app => {
    app.get("/api/blog_post/:id", findOnePost);

    app.put("/api/blog_post/:id", updatePost);

    app.delete("/api/blog_post/:id", deletePost);

    app.post("/api/blog_post/create", upload.single('file'), createPost);

    app.get("/api/blog_post", findAllPosts);

    app.get("/api/blog_post/category/:id", findAllPostsByCategory);

    app.put("/api/blog_post/:id/views", incrementViews)
}

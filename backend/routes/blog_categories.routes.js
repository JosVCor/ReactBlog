const {
    createCategory,
    findAllCategories,
    findOneCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/blog_categories.controller");

module.exports = app => {
    app.get("/api/blog_categories/:id", findOneCategory);

    app.put("/api/blog_categories/:id", updateCategory);

    app.delete("/api/blog_categories/:id", deleteCategory);

    app.post("/api/blog_categories", createCategory);

    app.get("/api/blog_categories", findAllCategories);
}
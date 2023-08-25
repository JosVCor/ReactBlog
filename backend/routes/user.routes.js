const{
    register,
    login,
    logout,
    findAllUsers,
    findOneUser,
    updateUser,
    deleteUser
}   = require("../controllers/user.controller");

module.exports = app => {
    app.get("/api/users/:id", findOneUser);

    app.put("/api/users/:id", updateUser);

    app.delete("/api/users/:id", deleteUser);

    app.post("/api/users", register);

    app.post("/api/login", login);

    app.post("/api/logout", logout)

    app.get("/api/users", findAllUsers);


}
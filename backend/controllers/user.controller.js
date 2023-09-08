const express = require('express');
const User = require("../models/user.js");

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    register: (request, response) => {
        const {username, email, password, confirmPassword, isAdmin} = request.body;

        // Perform password and confirmPassword validation
        if (password !== confirmPassword) {
            return response.status(400).json({message: "Passwords do not match"});
        }

        // Generate a salt and hash the password
        bcryptjs.genSalt(10, (err, salt) => {
            if (err) {
                return response.status(500).json({message: "Server error"});
            }

            bcryptjs.hash(password, salt, (err, hash) => {
                if (err) {
                    return response.status(500).json({message: "Server error"});
                }

                // Create a new user with the hashed password
                User.create({username, email, password: hash, confirmPassword, isAdmin})
                    .then((newlyCreatedUser) => {
                        response.json(newlyCreatedUser);
                    })
                    .catch((err) => {
                        response.status(400).json(err);
                    });
            });
        });
    },

    findAllUsers: (request, response) => {
        User.find()
            .then(allUsers => response.json(allUsers))
            .catch(err => response.status(400).json(err))
    },

    findOneUser: (request, response) => {
        User.findById(request.params.id)
            .then(one => response.json(one))
            .catch(err => response.status(400).json(err))
    },

    updateUser: (request, response) => {
        User.findByIdAndUpdate(request.params.id, request.body, {new: true, runValidators: true},)
            .then(update => response.json(update))
            .catch(err => response.status(400).json(err))
    },

    deleteUser: (request, response) => {
        User.findByIdAndDelete(request.params.id)
            .then(result => response.json(result))
            .catch(err => response.status(400).json(err))
    },

    login: (request, response) => {
        const {username, password} = request.body;
        User.findOne({username: username})
            .then(user => {
                if (user === null) {
                    response.status(400).json({message: "Invalid login attempt"})
                } else {
                    bcryptjs.compare(password, user.password)
                        .then(passwordIsValid => {
                            if (passwordIsValid) {
                                response.cookie("usertoken",
                                    jwt.sign({
                                        _id: user._id,
                                        username: user.username
                                    }, process.env.JWT_SECRET),
                                    {
                                        httpOnly: true,
                                        expires: new Date(Date.now() + 900000)
                                    }
                                )
                                    .json({message: "Successfully logged in"})
                            } else {
                                response.status(400).json({message: "Invalid login attempt"})
                            }
                        })
                        .catch(err => response.status(400).json({message: "Invalid login attempt"}))
                }
            })
    },

    logout: (request, response) => {
        response.clearCookie('usertoken');
        response.json({message: "You have successfully logged out"});
    }
}
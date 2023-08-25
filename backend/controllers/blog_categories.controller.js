const express = require('express');
const Category = require("../models/blog_categories.js");

module.exports = {
    createCategory: (request, response) => {
        Category.create(request.body)
            .then(newlyCreatedCategory => response.json(newlyCreatedCategory))
            .catch(err => response.status(400).json(err))
    },

    findAllCategories: (request, response) => {
        Category.find()
            .then(allCategories => response.json(allCategories))
            .catch(err => response.status(400).json(err))
    },

    findOneCategory: (request, response) => {
        Category.findById(request.params.id)
            .then(one => response.json(one))
            .catch(err => response.status(400).json(err))
    },

    updateCategory: (request, response) => {
        Category.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true },)
            .then(update => response.json(update))
            .catch(err => response.status(400).json(err))
    },

    deleteCategory: (request, response) => {
        Category.findByIdAndDelete(request.params.id)
            .then(result => response.json(result))
            .catch(err => response.status(400).json(err))
    }
}
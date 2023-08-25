const express = require('express');
const Post = require("../models/blog_posts.js");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
require('dotenv').config();


const s3Client = new S3Client({
    region: 'us-west-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

module.exports = {
    createPost: async (request, response) => {
        const { title, content, category, isFeatured, excerpt, views } = request.body;
        const file = request.file;

        // Upload the file to S3 bucket
        const params = {
            Bucket: "jvcblogpostimages",
            Key: `${Date.now().toString()}_${file.originalname}`,
            Body: file.buffer,
        };

        try {
            const command = new PutObjectCommand(params);
            const data = await s3Client.send(command);

            console.log('Data:', data); // Check the data object

            // Create a new blog post with the image URL
            const newPost = new Post({
                title,
                content,
                category,
                isFeatured,
                excerpt,
                views,
                img: `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`  // Use the S3 object URL as the image URL
            });

            console.log('New Post:', newPost); // Check the newPost object

            // Save the new blog post to the database
            const newlyCreatedPost = await newPost.save();

            console.log('Newly Created Post:', newlyCreatedPost); // Check the newlyCreatedPost object

            response.json(newlyCreatedPost);
        } catch (err) {
            console.error(err);
            response.status(500).json({ error: 'Failed to upload file to S3' });
        }
    },



    // createPost: async (request, response) => {
    //     const {title, content, category, isFeatured,img} = request.body;
    //     Post.create(request.body)
    //         .then(newlyCreatedPost => response.json(newlyCreatedPost))
    //         .catch(err => response.status(400).json(err))
    // },

    findAllPosts: (request, response) => {
        Post.find()
            .then(allPosts => response.json(allPosts))
            .catch(err => response.status(400).json(err))
    },

    findAllPostsByCategory: (request, response) => {
        Post.find({category: request.params.id})
            .populate('category')
            .then(allPosts => {
                response.json(allPosts);
            })
            .catch(err => {
                response.status(500).json({errors: err});
            });
    },

    findOnePost: (request, response) => {
        Post.findById(request.params.id)
            .then(one => response.json(one))
            .catch(err => response.status(400).json(err))
    },

    updatePost: (request, response) => {
        Post.findByIdAndUpdate(request.params.id, request.body, {new: true, runValidators: true})
            .then(update => response.json(update))
            .catch(err => response.status(400).json(err))
    },

    incrementViews: (request, response) => {
        Post.findByIdAndUpdate(request.params.id, {$inc: {views: 1}}, {new: true, runValidators: true})
            .then(update => response.json(update))
            .catch(err => response.status(400).json(err))
    },

    deletePost: (request, response) => {
        Post.findByIdAndDelete(request.params.id)
            .then(result => response.json(result))
            .catch(err => response.status(400).json(err))
    },
}
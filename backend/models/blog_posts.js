const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [3, 'Title must be at least 3 characters long'],

    },
    content: {
        type: String,
        required: true,
        minLength: [10, 'Content must be at least 10 characters long'],
    },
    excerpt: {
        type: String,
        required: true,
        minLength: [10, 'Excerpt must be at least 10 characters long'],
    },
    img: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogCategory',
        required: true,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    views: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}   , { timestamps: true });

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;

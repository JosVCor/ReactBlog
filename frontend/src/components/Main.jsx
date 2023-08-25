import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import "../styles/Main.css"

export const Main = () => {

    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]);
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8000/api/blog_post")
            .then(response => {
                setPosts(response.data)
                console.log("posts")
            })
            .catch(err => console.log(err))

        axios.get("http://localhost:8000/api/blog_categories")
            .then(response => {
                setCategories(response.data)
                console.log("categories")
            })
            .catch(err => console.log(err))
    }, [])

    const deletePost = (deleteId) => {
        console.log(deleteId)

        axios.delete(`http://localhost:8000/api/blog_post/${deleteId}`)
            .then(response => {
                console.log(response.data)
                setPosts(posts.filter(post => post._id !== deleteId))
            })
            .catch(err => console.log(err))
    }

    const deleteCategory = (deleteId) => {
        console.log(deleteId)

        axios.delete(`http://localhost:8000/api/blog_categories/${deleteId}`)
            .then(response => {
                console.log(response.data)
                setCategories(categories.filter(category => category._id !== deleteId))
            })
            .catch(err => console.log(err))
    }

    const incrementViews = (postId) => {
        axios.put(`http://localhost:8000/api/blog_post/${postId}/views`)
            .then(response => {
                console.log(response.data)
                setPosts(posts.map(post => {
                    if (post._id === postId) {
                        return response.data
                    }
                    return post
                }))
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="container">

            <div>
                <div className="category">
                    {isAdminLoggedIn && (
                        <Link to="/createcategory">
                            <button>Add Category</button>
                        </Link>
                    )}
                    {Array.isArray(categories) && (
                        categories.map((category, i) => {
                            return (
                                <div key={category._id}>

                                    <Link key={category._id} className="catlink" to={"/viewcategories/" + category._id}>
                                        <h3>{category.name}</h3>
                                    </Link>
                                    {isAdminLoggedIn && (
                                        <button onClick={() => deleteCategory(category._id)}>Delete Category</button>
                                    )}
                                </div>
                            )
                        })
                    )}
                </div>

                <div className="featured">
                    <div className="fp">
                        <h1>Featured Posts</h1>
                    </div>
                    {isAdminLoggedIn && (
                        <Link to="/createpost">
                            <button>Add Post</button>
                        </Link>
                    )}
                    {Array.isArray(posts) && (
                        posts.filter((posts) => posts.isFeatured).map((post, i) => {
                            const category = categories.find((category) => category._id === post.category)
                            const categoryName = category ? category.name : "No Category"
                            return (
                                <Link key={post._id} className="featuredlink" to={"/viewpost/" + post._id}>
                                    <div className="featuredcard"
                                         onClick={() => incrementViews(post._id)}
                                         key={post._id}>
                                        <img className="featuredimg" src={post.img} alt="blog"/>
                                        <div className="postextra">
                                            <p className="postcreatedat">{new Date(post.createdAt).toLocaleDateString("en-GB")}</p>
                                            <p className="postviews">Views: {post.views}</p>
                                            <p className="catname">{categoryName}</p>
                                        </div>
                                        <h3>{post.title}</h3>
                                        <p className="postexcerpt">{post.excerpt}</p>
                                        <button onClick={() => deletePost(post._id)}>Delete Post</button>
                                    </div>
                                </Link>

                            )

                        })
                    )}

                    <div className="fp2"></div>
                </div>


            </div>
        </div>
    )
}

import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams} from 'react-router-dom';
import '../../styles/viewCategories.css';


export const ViewCategories = (props) => {
    console.log("ViewCategories props", props)
    const {category_id} = useParams();
    const [category, setCategory] = useState({});
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/blog_categories/" + category_id)
            .then(response => {
                console.log(response.data)
                setCategory(response.data)
            })
            .catch(err => console.log(err))

        axios.get("http://localhost:8000/api/blog_post")
            .then(response => {
                console.log(response.data)
                setPosts(response.data)
            })
            .catch(err => console.log(err))
    }, [category_id])


    if (!category) {
        return "Loading..."
    }

    const deletePost = (deleteId) => {
        console.log(deleteId)

        axios.delete(`http://localhost:8000/api/blog_post/${deleteId}`)
            .then(response => {
                console.log(response.data)
                setPosts(posts.filter(post => post._id !== deleteId))
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="containercat">
            <h1>{category.name}</h1>
            {posts.filter((post) => post.category === category_id).map((post) => (
                <div className="postcard" key={post._id}>
                    <Link to={"/viewpost/" + post._id}>
                        <img className="postimg" src={post.img} alt=""/>
                    </Link>
                    <div className="postextra">
                        <p className="postviews">Views: {post.views}</p>
                        <p className="postcreatedat">{new Date(post.createdAt).toLocaleDateString("en-GB")}</p>
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <button onClick={() => deletePost(post._id)}>Delete Post</button>
                    {/* Render other post details */}
                </div>
            ))}
            {posts.filter((post) => post.category === category_id).length === 0 && (
                <p>No posts for this category</p>
            )}
        </div>
    )
}
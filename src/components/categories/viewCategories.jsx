import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams} from 'react-router-dom';

export const ViewCategories = (props) => {
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

    return (
        <div>
            <h1>Posts for Category: {category.name}</h1>
            {posts.filter((post)=>post.category === category_id).map((post) => (
                <div key={post._id}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    {/* Render other post details */}
                </div>
            ))}
            {posts.filter((post)=>post.category === category_id).length === 0 && (
                <p>No posts for this category</p>
            )}
        </div>
    )
}
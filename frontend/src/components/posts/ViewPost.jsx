import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import {useParams} from "react-router-dom";
import '../../styles/ViewPost.css';

export const ViewPost = () => {
    const {post_id} = useParams();
    const [post, setPost] = useState([]);
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [isMobile, setIsMobile] = useState(false);

    const renderPlainText = (html) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        return tempDiv.innerText;
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/blog_post/${post_id}`)
            .then(res => {
                setPost(res.data);
                return axios.get(`http://localhost:8000/api/blog_post/category/${res.data.category}`)
            })
            .then((res) => {
                setRelatedPosts(res.data)
            })
            .catch(err => console.log(err));
    }, [post_id]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        }
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const incrementViews = (postId) => {
        axios.put(`http://localhost:8000/api/blog_post/${postId}/views`)
            .then(response => {
                console.log(response.data)
                setPost(post.map(post => {
                    if (post._id === postId) {
                        return response.data
                    }
                    return post
                }))
            })
            .catch(err => console.log(err))
    }



    return (
        <div className="containerpost">
            <div className="col1">
                <div className="viewcard">
                    <img className="viewimg" src={post.img} alt=""/>
                    <div className="postextra">
                        <p className="relateddate">{new Date(post.createdAt).toLocaleDateString("en-GB")}</p>
                        <p className="relatedview">Views: {post.views}</p>
                    </div>
                    <h1>{post.title}</h1>
                    <p className="viewcontent" dangerouslySetInnerHTML={{ __html: post.content }}></p>
                </div>
            </div>

            {!isMobile && (
            <div className="col2">
                <h2>Related Post</h2>
                {relatedPosts.map((relatedPost) => (
                        <Link key={relatedPost._id}
                              onClick={() => incrementViews(relatedPost._id)}
                              to={`/viewpost/${relatedPost._id}`}>
                            <div className="relatedcard">
                                <h3>{relatedPost.title}</h3>
                                <img className="relatedimg" src={relatedPost.img} alt=""/>
                                <div className="relatedextra">
                                    <p className="relateddate">{new Date(relatedPost.createdAt).toLocaleDateString("en-GB")}</p>
                                    <p className="relatedview">Views: {relatedPost.views}</p>
                                </div>
                                <p className="relatedexcerpt">{renderPlainText(relatedPost.excerpt)}</p>
                            </div>
                        </Link>
                    )
                )}
            </div>
            )}
        </div>
    )
}
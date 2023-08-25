import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../styles/createPost.css';


export const CreatePost = () => {
    const navigate = useNavigate();
    console.log("create post")


    const [title, setTitle] = useState("");
    const [titleTouched, setTitleTouched] = useState(false);
    const [titleDirty, setTitleDirty] = useState(false);
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        setTitleDirty(true);
    };
    const handleTitleBlur = (e) => {
        setTitleTouched(true);
    };

    const isTitleInvalid = !title && titleTouched ? "Title is required" : "";

    const [content, setContent] = useState("");
    const [contentTouched, setContentTouched] = useState(false);
    const [contentDirty, setContentDirty] = useState(false);
    const [excerpt, setExcerpt] = useState("");
    const [excerptTouched, setExcerptTouched] = useState(false);
    const [excerptDirty, setExcerptDirty] = useState(false);
    const [category, setCategory] = useState("");
    const [categoryTouched, setCategoryTouched] = useState(false);
    const [categoryDirty, setCategoryDirty] = useState(false);
    const [img, setImg] = useState(null);
    const [imgTouched, setImgTouched] = useState(false);
    const [imgDirty, setImgDirty] = useState(false);
    const [categories, setCategories] = useState([]);
    const [isFeatured, setIsFeatured] = useState(false);
    const [errors, setErrors] = useState([]);

    const isFormValid = title && content && excerpt && category && img;

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/blog_categories");
            setCategories(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (value) => {
        setContent(value);
    }

    const createPost = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("excerpt", excerpt);
        formData.append("category", category);
        formData.append("isFeatured", isFeatured);
        formData.append("file", img);

        axios.post("http://localhost:8000/api/blog_post/create", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then((response) => {
                console.log(response.data);
                navigate("/posts");
            })
            .catch((err) => {
                console.log(err);
                if (err.response) {
                }
                const {errors: responseErrors} = err.response?.data || {};
                if (responseErrors) {
                    const messages = Object.keys(responseErrors).map(
                        (error) => responseErrors[error].message
                    );
                    setErrors(messages);
                } else {
                    setErrors(["An error occurred. Please try again."]);
                }
            });
    }

    return (
        <div className="container">
            <h1 className="formtitle">Create Post</h1>
            <div className="formcard">

                {errors.map((err, index) => <p key={index} style={{color: "red"}}>{err}</p>)}
                <form onSubmit={createPost} encType="multipart/form-data" method="post">
                    <div className="textcontent">

                        <div>
                            <label className="formlabel">Post Title</label>
                            <input className="inputfield"
                                   type="text"
                                   value={title}
                                   onBlur={handleTitleBlur}
                                   onChange={handleTitleChange}/>
                            {isTitleInvalid && <p style={{color: "red"}}>Please enter a title</p>}
                        </div>
                        <br/>
                        <div>
                            <label className="formlabel">Post Category</label>
                            <select className="formcat" value={category} onChange={e => setCategory(e.target.value)}>
                                <option className="formcatop" value="">Select a Category</option>
                                {categories.map((cat, index) => (
                                    <option key={index} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="formlabel">Is Featured?</label>
                            <input className="custom-checkbox" type="checkbox" checked={isFeatured}
                                   onChange={e => setIsFeatured(e.target.checked)}/>
                        </div>

                    </div>
                    <div className="selectcontent">

                        <div>
                            <label className="formlabel">Excerpt</label>
                            <textarea className="formexcerpt" value={excerpt}
                                      onChange={e => setExcerpt(e.target.value)}/>
                        </div>

                        <br/>

                        <div>
                            <label className="formlabel">Post Image</label>
                            <input className="formimg" type="file" name="file"
                                   onChange={e => setImg(e.target.files[0])}/>
                        </div>

                        <br/>

                    </div>
                    <div>
                        <label className="formlabel">Post Content</label>
                        <ReactQuill theme="snow"
                                    className="ql-error" // Add a dynamic class
                                    value={content} onChange={e => handleChange(e)}/>
                    </div>
                    <br/>
                    <div>
                        <input className={`formbtn ${!isFormValid ? 'disabledbutton' : ''}`}
                               type="submit"
                               disabled={!isFormValid}
                               value="Create"/>
                    </div>
                </form>
            </div>
        </div>
    )
}
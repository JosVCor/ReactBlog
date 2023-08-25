import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import "../../styles/createCategory.css"


export const CreateCategory = () => {
    let navigate = useNavigate();

    const [name, setName] = useState("");

    const [errors, setErrors] = useState([]);

    const createCategory = (e) => {
        e.preventDefault();

        const newCategory = {name};

        axios
            .post("http://localhost:8000/api/blog_categories", newCategory)
            .then((response) => {
                console.log(response.data);
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
                const { errors: responseErrors } = err.response?.data || {};
                if (responseErrors) {
                    const messages = Object.keys(responseErrors).map(
                        (error) => responseErrors[error].message
                    );
                    setErrors(messages);
                } else {
                    setErrors(["An error occurred. Please try again."]);
                }
            });
    };

    return (
        <div className="catcontainer">
            {errors.map((err, index) => <p key={index} style={{color: "red"}}>{err}</p>)}
            <form className="catform" onSubmit={createCategory}>
                <label>Category Name:</label>
                <input className="catlabel" type="text" value={name} onChange={e => setName(e.target.value)}/>
                <br/>
                <input className="catbtn" type="submit" value="Create"/>
            </form>
        </div>
    )
}
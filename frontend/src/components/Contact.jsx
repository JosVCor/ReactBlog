import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import "../styles/contact.css"

export const Contact = () => {

    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]);
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

    return (
        <div className="container">
            <div>
                <div className="contact">
                    <div className="fp"><h1 className="contact-title">Joseph Corrigan</h1></div>
                    <div className="contact-info1">
                        <div>
                            <h2>Email</h2>
                            <a href="mailto:josephvincentse@gmail.com">
                                <h3>josephvincentse@gmail.com</h3>
                            </a>
                        </div>
                        <div>
                            <h2>Number</h2>
                            <h3>1-847-217-4641</h3>
                        </div>
                    </div>
                    <div className="contact-info2">
                        <div>
                            <h2>Github</h2>
                            <a href="https://github.com/JosVCor">
                                <i className="fa-brands fa-github fa-2xl"></i>
                            </a>
                        </div>
                        <div className="linkedin">
                            <h2>LinkedIn</h2>
                            <a href="https://www.linkedin.com/in/joseph-corrigan-663405274/">
                                <i className="fa-brands fa-linkedin fa-2xl"></i>
                            </a>
                        </div>
                    </div>

                    <div className="fp2"></div>
                </div>

            </div>
        </div>
    )
}

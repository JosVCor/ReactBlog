import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import "../styles/about.css"

export const About = () => {

    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]);
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

    return (
        <div className="container">
            <div>
                <div className="about">
                    <div className="fp"><h1 className="about-title">About Me</h1></div>
                    <div className="about-text">
                        <h2>
                            Welcome to my world of web development! I'm Joseph Corrigan, a frontend developer with a
                            knack for turning digital dreams into visually captivating and user-friendly realities.
                            <br/>
                            <br/>
                            With an eye for detail and a strong sense of time management, I thrive in collaborative
                            environments where I exceed project deadlines. Problem-solving is my forte, and I relish
                            overcoming intricate challenges to deliver innovative solutions that cater to user needs.
                            <br/>
                            <br/>
                            My tech toolbox includes mastery of AWS services, proficiency in Atlassian tools, and a deep
                            understanding of both frontend and backend technologies. I specialize in crafting scalable,
                            secure applications that harness the potential of cloud computing.
                            <br/>
                            <br/>
                            Explore my portfolio, and you'll find projects like a fully functional blog application, a
                            dynamic e-commerce website, and a cloud-based client onboarding application. Each project
                            reflects my commitment to excellence and my passion for creativity in the world of web
                            development.
                            <br/>
                            <br/>
                            Join me on this exciting journey through the digital realm, where every line of code tells a
                            story, and every pixel paints a picture.
                            <br/><br/>
                            Let's embark on this adventure together!
                        </h2>
                    </div>
                    <div className="fp2"></div>
                </div>

            </div>
        </div>
    )
}

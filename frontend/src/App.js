import {Link, Route, Routes, useNavigate} from 'react-router-dom';
import {useState} from "react";
import './App.css';
import {CreateCategory} from "./components/categories/createCategory";
import {CreatePost} from "./components/posts/createPost";
import {Registration} from "./components/auth/registration";
import {Login} from "./components/auth/login";
import {Main} from "./components/Main";
import {ViewCategories} from "./components/categories/viewCategories";
import {ViewPost} from "./components/posts/ViewPost";

function App() {
    console.log("App.js")

    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)

    const navigate = useNavigate()
    const handleCreateCategory = (category) => {
        console.log(category);
        navigate("/")
    }
    const handleCreatePost = (post) => {
        console.log(post);
        // navigate("/createPost")
    }
    const handleRegistration = (user) => {
        console.log(user);
        // navigate("/createUser")
    }
    const handleLogin = (user) => {
        console.log(user);
        setIsAdminLoggedIn(true)
        navigate("/createpost")
    }

    const handleLogout = () => {
        setIsAdminLoggedIn(false)
    }

    return (
        <div className="App">
            <div className="header">
                <div className="logo">
                    <Link className="sitelogo" to="/"><h1>JVC Blogs</h1></Link>
                </div>
                {isAdminLoggedIn &&
                    <>
                        <Link className="navlink" to="/createcategory">Create Category</Link>
                        <Link className="navlink" to="/createpost">Create Post</Link>
                        <Link className="navlink" onClick={handleLogout} to="/">Logout</Link>
                    </>
                }
                <Link className="navlink" to="/register">Register</Link>
                <Link className="navlink" to="/login">Login</Link>
            </div>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/createcategory" element={<CreateCategory onCreate={handleCreateCategory}/>}/>
                <Route path="/createpost" element={<CreatePost onCreate={handleCreatePost}/>}/>
                <Route path="/register" element={<Registration onCreate={handleRegistration}/>}/>
                <Route path="/login" element={<Login onLogin={handleLogin}/>}/>
                <Route path="/viewcategories/:category_id" element={<ViewCategories/>}/>
                <Route path="/viewpost/:post_id" element={<ViewPost/>}/>
            </Routes>
            <div className="footer">
                <div className="footerlogo">
                    <Link className="sitefooterlogo" to="/"><h1>JVC Blogs</h1></Link>
                </div>
                <div>
                    <ul className="navlist">
                        <li className="navlink"><Link className="navlink" to="">About</Link></li>
                        <li className="navlink"><Link className="navlink" to="">Contact</Link></li>
                    </ul>
                </div>
                <p className="mb-2 mt-t footer-text">Joseph Corrigan Blog made with React</p>
            </div>

        </div>
    );
}

export default App;

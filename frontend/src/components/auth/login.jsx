import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "../../styles/login.css"

export const Login = ({onLogin}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault();

        const userData = {username, password};

        axios.post("http://localhost:8000/api/login", userData, {withCredentials: true})
            .then((response) => {
                console.log(response.data);
                console.log(password)
                // Store the token as a cookie upon successful login
                const token = response.data.token
                Cookies.set("usertoken", token)
                onLogin();
            })
            .catch((err) => {
                if (err.response && err.response.data) {
                    console.log(err.response.data);
                    setLoginError(err.response.data);
                } else {
                    console.log(err);
                    setLoginError("An error occurred. Please try again later.")
                }
            });
    };

    return (
        <div className="container">
            <h1 className="logintitle">Login</h1>
            {loginError && <p style={{color: 'red'}}>{loginError.message}</p>}
            <div className="logincard">
                <form className="loginform" onSubmit={handleLogin}>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
                    <br/>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <br/>
                    <input className="loginbtn" type="submit" value="Login"/>
                </form>
            </div>
        </div>
    )
}
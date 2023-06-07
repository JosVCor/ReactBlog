import React, { useState } from "react";
import axios from "axios";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        const userData = {username, password};

        axios.post("http://localhost:8000/api/login", userData, {withCredentials: true})
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err.response.data);
                setLoginError(err.response.data);
            });
    };

    return (
        <div>
            <h1>Login</h1>
            {loginError && <p style={{color: 'red'}}>{loginError}</p>}
            <form onSubmit={handleLogin}>
                <label>Username</label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
                <br/>
                <label>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                <br/>
                <input type="submit" value="Login"/>
            </form>
        </div>
    )
}
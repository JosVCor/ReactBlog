import React, {useState} from 'react';
import axios from "axios";
import "../../styles/register.css"

export const Registration = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [registrationError, setRegistrationError] = useState("");

    const handleRegistration = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setRegistrationError("Passwords do not match!");
        } else{
            const userData = {username, password, confirmPassword, email, isAdmin};

            console.log('registration data:',userData);

        axios.post("http://localhost:8000/api/users", userData)
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err.response.data);
                setRegistrationError(err.response.data);
            });
        }
    };

    return (
        <div className="regcontainer">
            <h1>Register</h1>
            {registrationError && <p style={{color: 'red'}}>{registrationError.message}</p>}
            <form className="regform" onSubmit={handleRegistration}>
                <label className="username">Username:</label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
                <br/>
                <label className="email">Email:</label>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                <br/>
                <label className="password">Password:</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                <br/>
                <label className="confirm">Confirm Password:</label>
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                <br/>
                <label>Admin?</label>
                <input type="checkbox" checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)}/>
                <br/>
                <input className="regbtn" type="submit" value="Register"/>
            </form>
        </div>
    )
};

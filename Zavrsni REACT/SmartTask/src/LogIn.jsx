import Header from './Header.jsx'
import { useState } from "react";
import axios from 'axios';

function LogIn(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    
    const login = () => {
        const loginInfo = {
            username: username,
            password: password
        };
        axios.post('http://localhost:3000/api/login', loginInfo)
             .then(res => {
                setResponseMessage("We're all good!");
                props.setUser(res.data.user);
    })       
             .catch(err => {
                setResponseMessage("Username or password is incorrect, try again!")
                console.error(err);
             })
    }
    const signup = () => {
        const signUpInfo = {
            username: username,
            password: password
        }

        axios.post('http://localhost:3000/api/signup', signUpInfo)
            .then(res => {
                setResponseMessage("Your sign up was succesful, feel free to log in!");
            })
            .catch(err => {
                setResponseMessage("There has been a mistake, please try again...")
                console.log(err);
            })
    }

    const changeUsername = (e) => {
        setUsername(e.target.value);
    }
    const changePassword = (e) => {
        setPassword(e.target.value);
    }


    return (
        <>
        <Header></Header>
        <main>
            <h1>Hi there!</h1>
            <h3>Please log in to continue, if you are new here, feel free to sign up!</h3>
            <div id="logInContainer" className="flex">
                <h2>Log In</h2>

                <label htmlFor="username"> Username </label>
                <input type="text" id="username" value={username} onChange={changeUsername} />
                <label htmlFor="password"> Password </label>
                <input type="password" id="password" value={password} onChange={changePassword} />

                <span id="loginWarning">{responseMessage}</span>
                <button id="login" onClick={login}>Log In</button>
                <button id="signup" onClick={signup}>Sign Up</button>
            </div>
            </main>
            </>
    );

}

export default LogIn;
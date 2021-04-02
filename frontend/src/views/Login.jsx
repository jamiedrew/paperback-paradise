import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import "./Auth.css";

const Login = () => {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ user, setUser ] = useState();

    const history = useHistory();

    const login = async (event) => {

        event.preventDefault();

        try {

            const response = await axios.post("/auth/login", {
                email: email,
                password: password
            })

            setUser(response.data);

            localStorage.setItem("user", JSON.stringify(response.data));

            history.push("/account");
            window.location.reload();

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div id="form-container">

            <h3>Log In</h3>

            <form onSubmit={login}>
                <ul>

                    <li>
                        <input 
                            type="email"
                            name="email"
                            placeholder="email"
                            onChange={ (event) => setEmail(event.target.value) }
                            required
                        />
                    </li>

                    <li>
                        <input 
                            type="password"
                            name="password"
                            placeholder="password"
                            onChange={ (event) => setPassword(event.target.value) }
                            required
                        />
                    </li>
                    
                </ul>

                <button type="button" onClick={login}>Log In</button>
            </form>

            <p><a href="/auth/register">Register Account</a></p>

        </div>
    )
}

export default Login;
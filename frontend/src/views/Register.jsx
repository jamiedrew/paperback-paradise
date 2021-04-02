import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import "./Auth.css";

const Register = () => {

    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ user, setUser ] = useState();

    const history = useHistory();

    const register = async (event) => {
        event.preventDefault();

        try {
            await axios.post("/auth/register", {
                name: name,
                email: email,
                password: password
            });

        } catch (error) {
            console.error(error);
        }

        history.push("/account");
        window.location.reload();

    }

    return (
        <div id="form-container">
            <h3>Register Account</h3>
            
            <form onSubmit={register}>
                <ul>
                    <li>
                        <input
                            placeholder="name"
                            onChange={(event => setName(event.target.value))}
                            required />
                    </li>
                    <li>
                        <input
                            type="email"
                            placeholder="email"
                            onChange={(event => setEmail(event.target.value))}
                            required />
                    </li>
                    <li>
                        <input
                            type="password"
                            onChange={(event => setPassword(event.target.value))}
                            placeholder="password"
                            required />
                    </li>
                </ul>

                <button onClick={register}>Register</button>
            </form>

            <p>Already have an account? <a href="/auth/login">Log In</a></p>
        </div>
    )
}

export default Register;
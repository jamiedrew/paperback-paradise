import axios from "axios";

export const registerUser = (name, email, password) => async(dispatch) => {
    try {

        let newUser = axios.post("/auth/register", {
            name: name,
            email: email,
            password: password,
        })

        console.log(newUser);

    } catch (error) {
        console.log(error);
    }
}
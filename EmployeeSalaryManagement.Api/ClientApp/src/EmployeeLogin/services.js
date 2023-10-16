import axios from "axios";

export default { Login };

async function Login(loginModel) {
    console.log("loginModel", loginModel)
    const data = {
        email: loginModel.email,
        password: loginModel.password
    };

    const url = `https://localhost:44458/api/userLogin/Login?email=${loginModel.email}&password=${loginModel.password}`;

    try {
        const response = await axios.get(url, { data });

        return response.data;

    } catch (error) {
        // Handle any errors
        console.error('Error:', error);
        throw error;
    }
}
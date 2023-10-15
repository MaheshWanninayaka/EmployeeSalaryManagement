import axios from "axios";

export default { SaveEmployee };

async function SaveEmployee(loginModel) {
    console.log("loginModel", loginModel)
    //const data = {
    //    email: loginModel.email,
    //    password: loginModel.password
    //};

    const url = `https://localhost:44458/api/employee/SaveEmployee`;

    try {
        const response = await axios.post(url, loginModel);
        console.error('response:', response);
        return response.data;

    } catch (error) {
        // Handle any errors
        console.error('Error:', error);
        throw error;
    }
}
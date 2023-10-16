import axios from "axios";
import jwt_decode from "jwt-decode";

export default { SaveEmployee, getUserDetailsFromToken, GetEmployeeDetailsByEmpId };

async function SaveEmployee(loginModel) {
    
    const url = `https://localhost:44458/api/employee/SaveEmployee`;

    try {
        const response = await axios.post(url, loginModel);
        return response.data;

    } catch (error) {
        // Handle any errors
        console.error('Error:', error);
        throw error;
    }
}

function getUserDetailsFromToken() {
    var accessToken = localStorage.getItem("accessToken");
    var decoded = jwt_decode(accessToken);
    return decoded;
}

async function GetEmployeeDetailsByEmpId(empId) {
 

    const url = `https://localhost:44458/api/employee/GetEmployeeDetailsByEmpId?empId=${empId}`;

    try {
        const response = await axios.get(url);
        return response.data;

    } catch (error) {
        // Handle any errors
        console.error('Error:', error);
        throw error;
    }
}
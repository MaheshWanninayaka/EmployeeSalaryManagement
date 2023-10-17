import axios from "axios";
import jwt_decode from "jwt-decode";

export default { SaveEmployee, getUserDetailsFromToken, GetEmployeeDetailsByEmpId, UpdateEmployee };

async function SaveEmployee(saveModel) {
    
    const url = `https://localhost:44458/api/employee/SaveEmployee`;
    console.log("saveModel", saveModel)
    try {
        const response = await axios.post(url, saveModel);
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

async function UpdateEmployee(updateModel) {

    const url = `https://localhost:44458/api/employee/UpdateEmployee`;
    console.log("updateModel", updateModel)
    try {
        const response = await axios.post(url, updateModel);
        return response.data;

        console.log("response", response.data)

    } catch (error) {
        // Handle any errors
        console.error('Error:', error);
        throw error;
    }
}
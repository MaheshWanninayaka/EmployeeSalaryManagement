import axios from "axios";

export default { GetSalaryDetailsByEmpID };

async function GetSalaryDetailsByEmpID(empId) {
    console.log("empId", empId)
    

    const url = `https://localhost:44458/api/employee/GetSalaryDetailsByEmpID?empId=${empId}`;

    try {
        const response = await axios.get(url);
        console.log('response:', response.data);
        return response.data;

    } catch (error) {
        // Handle any errors
        console.error('Error:', error);
        throw error;
    }
}
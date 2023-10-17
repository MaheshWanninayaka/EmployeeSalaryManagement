import axios from "axios";

export default { GetSalaryDetailsByEmpID, GetSalaryDetailsMonthAndYearwise, GetAllEmployeeDetails };

async function GetSalaryDetailsByEmpID(empId) {
    console.log("empId", empId)
    

    const url = `https://localhost:44458/api/employee/GetSalaryDetailsByEmpID?empId=${empId}`;

    try {
        const response = await axios.get(url);
        return response.data;

    } catch (error) {
        // Handle any errors
        throw error;
    }
}

async function GetSalaryDetailsMonthAndYearwise(month,year,userId) {
    ///console.log("empId", empId)

    console.log("userId", userId)
    const url = `https://localhost:44458/api/employee/GetSalaryDetailsMonthAndYearwise?month=${month}&year=${year}&userId=${userId}`;


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

async function GetAllEmployeeDetails() {


    const url = `https://localhost:44458/api/employee/GetAllEmployeeDetails`;

    try {
        const response = await axios.get(url);
        return response.data;

    } catch (error) {
        // Handle any errors
        console.error('Error:', error);
        throw error;
    }
}
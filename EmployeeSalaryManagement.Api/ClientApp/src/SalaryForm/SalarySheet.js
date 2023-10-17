import { Fragment, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import service from './services';
import './SalarySheet.css';

function SalarySheet(props) {

    const location = useLocation();

    var empId = location.state.data;
    var isEmployee = localStorage.getItem("isEmployee");

    const [salaryList, setSalaryList] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [employeeList, setEmployeeList] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(0);

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2000 + 1 }, (_, index) => 2000 + index);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const monthNameToNumber = {
        'January': 1, 'February': 2, 'March': 3, 'April': 4, 'May': 5, 'June': 6,
        'July': 7, 'August': 8, 'September': 9, 'October': 10, 'November': 11, 'December': 12
    };

    const handleMonthChange = (e) => {
        setSelectedMonth(monthNameToNumber[e.target.value]);
    }

    const handleYearChange = (e) => {
        setSelectedYear(parseInt(e.target.value));
    }

    const handleEmployeeChange = (e) => {
        console.log("sds", e.target.value)
        setSelectedEmployee((e.target.value));
    }

    useEffect(() => {
        async function fetchEmp() {
            if (empId.userID > 0 && isEmployee === "false") {
                try {
                    let result;

                    result = await service.GetAllEmployeeDetails();

                    console.log("result", result);
                    setEmployeeList(result);
                } catch (error) {
                    console.error("Error fetching salary details:", error);
                }
            }
        }

        fetchEmp();

    }, [empId.userID, isEmployee])

    useEffect(() => {
        async function fetchData() {
            if (empId.userID > 0) {
                try {

                    let result;
                    console.log("isEmployee", isEmployee)
                    if (isEmployee === "true") {

                        if (selectedMonth === 0) {
                            // If the selected month is "All," fetch all salary details
                            result = await service.GetSalaryDetailsByEmpID(empId.userID);
                        } else {
                            // Fetch salary details for the selected month and year
                            result = await service.GetSalaryDetailsMonthAndYearwise(selectedMonth, selectedYear, empId.userID);
                        }

                        setSalaryList(result);
                    }
                    else {
                        console.log("selectedEmployee", selectedEmployee)
                        if (selectedMonth === 0) {
                            // If the selected month is "All," fetch all salary details
                            result = await service.GetSalaryDetailsByEmpID(parseInt(parseInt(selectedEmployee)));
                        } else {
                            // Fetch salary details for the selected month and year
                            result = await service.GetSalaryDetailsMonthAndYearwise(selectedMonth, selectedYear, parseInt(selectedEmployee));
                        }
                        setSalaryList(result);
                    }


                } catch (error) {
                    console.error("Error fetching salary details:", error);
                }
            }
        }

        fetchData();
    }, [empId.userID, selectedMonth, selectedYear, selectedEmployee]);

    function SalaryTable({ salaryList }) {
        return (
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Month</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salaryList.map((item, index) => (
                            <tr key={index}>
                                <td>{item.month.split("T")[0]}</td>
                                <td>{item.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <Fragment>
            <div className="month-year-picker-container">
                <div className="select-container">
                    <label>Month:</label>
                    <select value={months[selectedMonth - 1]} onChange={handleMonthChange}>
                        <option value="All">All</option>
                        {months.map((month) => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="select-container">
                    <label>Year:</label>
                    <select value={selectedYear} onChange={handleYearChange}>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                {isEmployee === "false" ?
                    <div className="select-container">
                        <label>Employee:</label>
                        <select value={selectedEmployee} onChange={handleEmployeeChange}>
                            {employeeList.map((x) => (
                                <option key={x.employeeId} value={x.employeeId}>
                                    {x.fullName}
                                </option>
                            ))}
                        </select>
                    </div>
                    : null}

                <p>Selected Month: {months[selectedMonth - 1]}</p>
                <p>Selected Year: {selectedYear}</p>
            </div>

            <div className="app-container">
                <h1 className="centered-heading">Salary List</h1>
                <SalaryTable salaryList={salaryList} />
            </div>
        </Fragment>
    );
}

export default SalarySheet;

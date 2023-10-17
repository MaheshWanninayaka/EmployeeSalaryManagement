import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Employee.css';
import service from './services';


function Employee() {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [salary, setSalary] = useState(0);
    const [joinDate, setJoinDate] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [enableError, setEnableError] = useState(false);
    const [errorMessages, setErrorMessages] = useState({});
    const [userID, setUserID] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const [successMessage, setSuccessMessage] = useState(""); 

    var isEmployee = localStorage.getItem("isEmployee");


    useEffect(() => {
        var userData = service.getUserDetailsFromToken();

        if (userData.employeeId > 0) {

            GetEmployeeDetailsByEmpId(parseInt(userData.employeeId));
            setUserID(parseInt(userData.employeeId));
        }
    }, []);

    const handleNameChange = (value) => {
        setFullName(value);
        setEnableError(false);
        clearError('fullName');
    }

    const handleEmailChange = (value) => {
        setEmail(value);
        setEnableError(false);
        clearError('email');
    }
    const handleSalaryChange = (value) => {
        setSalary(value);
        setEnableError(false);
        clearError('salary');
    }
    const handleDateChange = (value) => {
        setJoinDate(value);
        setEnableError(false);
        clearError('joinDate');
    }

    const handlePhoneNumberChange = (value) => {
        setPhoneNumber(value);
        setEnableError(false);
        clearError('phoneNumber');
    }

    const clearError = (fieldName) => {
        setErrorMessages({ ...errorMessages, [fieldName]: "" });
    }

    async function GetEmployeeDetailsByEmpId(empID) {
        var details = await service.GetEmployeeDetailsByEmpId(empID);
        console.log("details", details.joinDate.split("T")[0])

        if (details !== null) {
            setFullName(details.fullName.toString());
            setEmail(details.email);
            setSalary(details.salary);
            setJoinDate(details.joinDate.split("T")[0]);
            setPhoneNumber(details.phoneNumber);
        }
    }

    async function handleClear(e) {
        setFullName("");
        setEmail("");
        setSalary(0);
        setJoinDate("");
        setEnableError(false);
        setErrorMessages({});
        setSuccessMessage("")

    }

    const navigate = useNavigate();

    async function handleSave() {

        // Validate input fields
        const validationErrors = {};
        if (fullName === "") {
            validationErrors.fullName = "Full name is required";
        }
        if (email === "") {
            validationErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            validationErrors.email = "Invalid email format";
        }
        if (salary <= 0) {
            validationErrors.salary = "Salary must be greater than 0";
        }
        if (joinDate === "") {
            validationErrors.joinDate = "Join date is required";
        }
        if (!/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/.test(phoneNumber) && phoneNumber !== null) {
            validationErrors.phoneNumber = "Invalid phone number";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrorMessages(validationErrors);
            setEnableError(true);
        }
        else {
            if (isEmployee !== "true") {
                var data = { fullName: fullName, email: email, salary: salary, joinDate: joinDate, phoneNumber: phoneNumber, isActive: isActive, };
                var result = await service.SaveEmployee(data);
                if (result.employeeId > 0) {
                   // navigate("/");
                    setSuccessMessage("Employee saved successfully!");

                    setTimeout(() => {
                        setSuccessMessage("");
                    }, 2000);
                }
                else {
                    setEnableError(true);
                    setErrorMessages({ general: "Error saving employee... Please try again..." });
                }
            }
            else {
                var data = { fullName: fullName, email: email, salary: salary, joinDate: joinDate, phoneNumber: phoneNumber, isActive: isActive, employeeId: userID };
                var result = await service.UpdateEmployee(data);
                if (result.employeeId > 0) {
                    ////navigate("/");
                    setSuccessMessage("Employee updated successfully!");

                    setTimeout(() => {
                        setSuccessMessage("");
                    }, 2000);
                }
                else {
                    setEnableError(true);
                    setErrorMessages({ general: "Error saving employee... Please try again..." });
                }
            }
        }
    }

    const checkSalaryDetails = () => {

        const data = { userID: userID };
        navigate('/salarySheet', { state: { data } })
    }

    return (
        <Fragment>
            <h1 className='container'>Add employee details</h1>
            <button onClick={checkSalaryDetails}>Salary details</button>

            {successMessage && <div div className={`success-message center-text`}>{successMessage}</div>}
            <div>
                <div className="input-row">
                    <label className="label">Full name</label>
                    <input type="text" id={fullName} placeholder="Enter fullname" onChange={(e) => handleNameChange(e.target.value)} value={fullName} />
                    {errorMessages.fullName && <div className="error-message">{errorMessages.fullName}</div>}
                </div>

                <div className="input-row">
                    <label className="label">Email</label>
                    <input type="text" id={email} placeholder="Enter email" onChange={(e) => handleEmailChange(e.target.value)} disabled={isEmployee === "true"} value={email} />
                    {errorMessages.email && <div className="error-message">{errorMessages.email}</div>}
                </div>

                <div className="input-row">
                    <label className="label">Salary</label>
                    <input type="number" id={salary} placeholder="Enter salary" onChange={(e) => handleSalaryChange(e.target.value)} disabled={isEmployee === "true"} value={salary} />
                    {errorMessages.salary && <div className="error-message">{errorMessages.salary}</div>}
                </div>

                <div className="input-row">
                    <label className="label">Join date</label>
                    <input type="date" id={joinDate} onChange={(e) => handleDateChange(e.target.value)} disabled={isEmployee === "true"} value={joinDate} />
                    {errorMessages.joinDate && <div className="error-message">{errorMessages.joinDate}</div>}
                </div>

                <div className="input-row">
                    <label className="label">Phone number</label>
                    <input type="tel" id={phoneNumber} placeholder="Enter phone number" onChange={(e) => handlePhoneNumberChange(e.target.value)} value={phoneNumber} />
                    {errorMessages.phoneNumber && <div className="error-message">{errorMessages.phoneNumber}</div>}
                </div>

                <div className="input-row">
                    <label className="label">Is Active</label>
                    <input
                        type="checkbox"
                        checked={isActive}
                        onChange={() => setIsActive(!isActive)}
                        disabled={isEmployee === "true"}
                    />
                </div>

            </div>

            <br /><br />
            <div>
                <div>
                    <button className="btn1" onClick={(e) => handleClear(e)}>Clear</button>

                    <button onClick={(e) => handleSave()}>{isEmployee === "true" ? "Update" : "Save"}</button>
                </div>
            </div>

            {enableError ? <label className="red-label">Error saving employee... Please try again...</label> : null}
        </Fragment>

    )
}

export default Employee;
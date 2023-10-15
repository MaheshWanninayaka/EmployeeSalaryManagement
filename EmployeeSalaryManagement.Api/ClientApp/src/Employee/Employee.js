import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Employee.css';
import service from './services';

function Employee() {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [salary, setSalary] = useState(0);
    const [joinDate, setJoinDate] = useState("");
    const [enableError, setEnableError] = useState(false);

    const handleNameChange = (value) => {
        setFullName(value);
        setEnableError(false);
    }

    const handleEmailChange = (value) => {
        setEmail(value);
        setEnableError(false);
    }
    const handleSalaryChange = (value) => {
        setSalary(value);
        setEnableError(false);
    }
    const handleDateChange = (value) => {
        setJoinDate(value);
        setEnableError(false);
    }

    async function handleClear() {
        setFullName("");
        setEmail("");
        setSalary(0);
        setJoinDate("");
        setEnableError(false);

        window.location.reload();
    }

    const navigate = useNavigate();

    async function handleSave() {
        var data = { fullName: fullName, email: email, salary: salary, joinDate: joinDate };
        console.log("data", data)
        var result = await service.SaveEmployee(data);
        console.log("result", result)
        if (result.employeeId >0) {
            navigate("/");
        }
        else {
            setEnableError(true);
        }
    }



    return (
        <Fragment>
            <h1 className='container'>Add employee details</h1>

            <div>
                <div className="input-row">
                    <label className="label">Full name</label>
                    <input type="text" id={fullName} placeholder="Enter fullname" onChange={(e) => handleNameChange(e.target.value)} />
                </div>

                <div className="input-row">
                    <label className="label">Email</label>
                    <input type="text" id={email} placeholder="Enter email" onChange={(e) => handleEmailChange(e.target.value)} />
                </div>

                <div className="input-row">
                    <label className="label">Salary</label>
                    <input type="number" id={salary} placeholder="Enter salary" onChange={(e) => handleSalaryChange(e.target.value)} />
                </div>

                <div className="input-row">
                    <label className="label">Join date</label>
                    <input type="date" id={joinDate} onChange={(e) => handleDateChange(e.target.value)} />
                </div>
            </div>

            <br /><br />
            <div>
                <div>
                    <button className="btn1" onClick={(e) => handleClear()}>Clear</button>
                
                    <button onClick={(e) => handleSave()}>Save</button>
                </div>
            </div>

            {enableError ? <label className="red-label">Error saving employee... Please try again...</label> : null}
        </Fragment>

    )
}

export default Employee;
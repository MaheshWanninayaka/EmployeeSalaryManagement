import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Employee.css';
import service from './services';

function Employee() {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [salary, setSalary] = useState(0);
    const [joinDate, setJoinDate] = useState("");

    //const handleNameChange = (value) => {
    //    setFullName(value);
    //}

    //const handleEmailChange = (value) => {
    //    setEmail(value);
    //}
    //const handleSalaryChange = (value) => {
    //    setSalary(value);
    //}
    //const handleDateChange = (value) => {
    //    setJoinDate(value);
    //}

    async function handleClear() {
        setFullName("");
        setEmail("");
        setSalary(0);
        setJoinDate("");

        window.location.reload();
    }

    const navigate = useNavigate();

    async function handleLogin() {
        var data = { fullName: fullName, email: email, salary: salary, joinDate: joinDate };
        console.log("data", data)
        var result = await service.SaveEmployee(data);
        console.log("result", result)
        if (result != null) {
            navigate("/employee");
        }
        else {
            //setenableerror(true);
        }
    }



    return (
        <Fragment>
            <h1 className='container'>Add employee details</h1>

            <div>
                <div className="input-row">
                    <label className="label">Full name</label>
                    <input type="text" id={fullName} placeholder="Enter fullname" onChange={(e) => setFullName(e.target.value)} />
                </div>

                <div className="input-row">
                    <label className="label">Email</label>
                    <input type="text" id={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="input-row">
                    <label className="label">Salary</label>
                    <input type="number" id={salary} placeholder="Enter salary" onChange={(e) => setSalary(e.target.value)} />
                </div>

                <div className="input-row">
                    <label className="label">Join date</label>
                    <input type="date" id={joinDate} onChange={(e) => setJoinDate(e.target.value)} />
                </div>
            </div>

            <br /><br />
            <div>
                <div>
                    <button className="btn1" onClick={(e) => handleClear()}>Clear</button>
                
                    <button onClick={(e) => handleLogin()}>Save</button>
                </div>
            </div>
        </Fragment>

    )
}

export default Employee;
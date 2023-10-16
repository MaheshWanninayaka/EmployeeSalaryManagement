import { Fragment, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import service from './services';
import './SalarySheet.css';

function SalarySheet(props) {

    const location = useLocation();

    var empId = location.state.data;

    const [salaryList, setSalaryList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            console.log("empId", empId);
            if (empId.userID > 0) {
                try {
                    const result = await service.GetSalaryDetailsByEmpID(empId.userID);
                    console.log("result", result);
                    setSalaryList(result);
                } catch (error) {
                    console.error("Error fetching salary details:", error);
                }
            }
        }

        fetchData();
    }, [empId.userID]);

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
            <div className="app-container">
                <h1 className="centered-heading">Salary List</h1>
                <SalaryTable salaryList={salaryList} />
            </div>

        </Fragment>
    );
}

export default SalarySheet;
import React, { Component, Suspense } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import SalarySheet from './SalaryForm/SalarySheet';

const Login = React.lazy(() => import('./Login/Login'));
const Employee = React.lazy(() => import('./Employee/Employee'));
const EmpLogin = React.lazy(() => import('./EmployeeLogin/EmpLogin'));
const MainLogin = React.lazy(() => import('./MainLogin'));


export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Routes>
                <Route path="/" element={<Suspense fallback={<div>Loading...</div>}><MainLogin /></Suspense>} />
                <Route path="/employee" element={<Suspense fallback={<div>Loading employee...</div>}><Employee /></Suspense>} />
                <Route path="/empLogin" element={<Suspense fallback={<div>Loading employee login...</div>}><EmpLogin /></Suspense>} />
                <Route path="/salarySheet" element={<SalarySheet />} />
                <Route path="/Login" element={<Suspense fallback={<div>Loading...</div>}><Login /></Suspense>} />
            </Routes>
        );
    }
}

import React, { Component, Suspense } from 'react';
//import Login from './Login/Login';
import { Routes, Route } from 'react-router-dom';
//import Employee from './Employee/Employee';

const Login = React.lazy(() => import('./Login/Login'));
const Employee = React.lazy(() => import('./Employee/Employee'));
const EmpLogin = React.lazy(() => import('./EmployeeLogin/EmpLogin'));


export default class App extends Component {
    static displayName = App.name;

    render() {
        return (

            <Routes>
                <Route path="/" element={<Suspense fallback={<div>Loading...</div>}><Login /></Suspense>} />
                <Route path="/employee" element={<Suspense fallback={<div>Loading employee...</div>}><Employee /></Suspense>} />
                <Route path="/empLogin" element={<Suspense fallback={<div>Loading employee login...</div>}><EmpLogin /></Suspense>} />
            </Routes>
        );
    }
}

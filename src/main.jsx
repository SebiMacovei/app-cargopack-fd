import React from 'react'
import ReactDOM from 'react-dom/client'
import HomePage from './HomePage.jsx'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "./Authentication/Login.jsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Admin} from "./ Admin/Admin.jsx";
import {EmployeesTableList} from "./ Admin/Employees/EmployeesTableList.jsx";
import {StatusCurse} from "./ Admin/Trips/StatusCurse.jsx";
import {AddClients} from "./ Admin/AddClients/AddClients.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
        />
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<HomePage/>} />
                <Route exact path="/login" element={<Login/>} />
                <Route exact path="/addclients" element={<AddClients/>} />
                <Route exact path="/addpackages" element={<AddClients/>} />
                <Route exact path="/admin" element={<Admin/>} />
                <Route exact path="/emptablelist" element={<EmployeesTableList/>} />
                <Route exact path="/statscargo" element={<StatusCurse/>} />
            </Routes>
        </BrowserRouter>
    </>
)

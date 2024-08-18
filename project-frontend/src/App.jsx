import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/HomePage';
import AdminDashboard from './components/DashBoards/AdminDashboard';
import AddWorker from './components/AdminActions/AddWorker';
import HrDashboard from './components/DashBoards/HrDashboard';
import EmployeeDashboard from './components/DashBoards/EmployeeDashboard';
import ViewWorker from './components/AdminActions/ViewWorker';
import EditWorker from './components/AdminActions/EditWorker';
import AddEmployee from './components/HrActions/AddEmployee';
import AddLeave from './components/EmployeeActions/AddLeave';
import ManageLeave from './components/HrActions/ManageLeave';

function App() {
  return (
    <div style={{ backgroundImage: 'url(/blurred_14.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/:adminid" element={<AdminDashboard />} />
          <Route path="/addworker" element={<AddWorker />} />
          <Route path="/addemployee" element={<AddEmployee />} />
          <Route path="/employee/:id/addleave" element={<AddLeave />} />
          <Route path="/hr/:id" element={<HrDashboard />} />
          <Route path="/employee/:id" element={<EmployeeDashboard />} />
          <Route exact path='/viewworker/:id' element={<ViewWorker />} />
          <Route exact path='/editworker/:id' element={<EditWorker />} />
          <Route exact path='/hr/:hrid/manageleave/:workerid' element={<ManageLeave />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

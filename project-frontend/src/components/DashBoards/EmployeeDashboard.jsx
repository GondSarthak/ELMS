import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import TableDataForEmployee from '../../TableData/TableDataForEmployee';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';

const EmployeeDashboard = () => {
    const navigate = useNavigate();
    const [leaves, setLeaves] = useState([]);
    const [worker, setWorker] = useState({});
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [editedPassword, setEditedPassword] = useState('');
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [passwordValidationMessage, setPasswordValidationMessage] = useState('');
    const { id } = useParams();

    useEffect(() => {
        loadLeaves();
        loadWorker();
    }, []);

    const loadLeaves = async () => {
        try {
            const response = await axios.get(`http://localhost:6900/${id}/leaves`);
            setLeaves(response.data);
        } catch (error) {
            console.error('Error fetching leaves:', error);
        }
    };

    const loadWorker = async () => {
        try {
            const response = await axios.get(`http://localhost:6900/api/workers/${id}`);
            setWorker(response.data);
        } catch (error) {
            console.error('Error fetching worker:', error);
        }
    };

    const handleLogOut = () => {
        navigate("/");
    };

    const handleMyProfile = () => {
        setShowProfileModal(true);
    };

    const handlePasswordChange = (e) => {
        setEditedPassword(e.target.value);
        validatePassword(e.target.value);
    };

    const handleEditPassword = () => {
        setShowPasswordModal(true);
    };

    const handleUpdatePassword = async () => {
        try {
            const send = { password: editedPassword }
            await axios.put(`http://localhost:6900/api/workers/passwordUpdate/${id}`, send);
            // Update the worker state or reload the worker data
            loadWorker();
            setShowPasswordModal(false); // Close the password modal after successful edit
        } catch (error) {
            console.error('Error updating password:', error);
        }
    };

    const isPasswordValid = (password) => {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        return regex.test(password);
    };

    const validatePassword = (password) => {
        if (!isPasswordValid(password)) {
            setPasswordValidationMessage('Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number.');
        } else {
            setPasswordValidationMessage('');
        }
    };

    return (
        <div>
            <nav className="navbar navbar-dark bg-dark" style={{ height: '80px', paddingLeft: '20px' }}>
                <div className="navbar-brand">
                    Employee Leave Management
                </div>
                <div className="navbar-menu">
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="primary" id="dropdown-basic" style={{ marginRight: '30px', borderRadius: '9px', width: '100px', height: '45px', fontSize: '18px', backgroundColor: 'white', color: 'black', border: 'solid' }}>
                                            <strong>{worker.userName}</strong>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={handleMyProfile}>My Profile</Dropdown.Item>
                                            <Dropdown.Item onClick={handleLogOut}>Logout</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <section className="section" style={{ minHeight: 'calc(100vh - 80px)' }}>

                <div className='mt-4'>
                    <TableDataForEmployee leaveList={leaves} empid={id} />
                </div>
            </section>

            <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>{worker.userName}'s Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow' style={{ backgroundColor: 'rgb(33, 37, 41)' }}>
                                <h2 className='text-center m-4' style={{ color: 'white' }}>Profile Details</h2>
                                <div className='card'>
                                    <div className='card-header'>
                                        Details:
                                        <ul className='list-group list-group-flush'>
                                            <li className='list-group-item'> <b>Name: </b>{worker.userName}</li>
                                            <li className='list-group-item'> <b>Password: </b>{worker.password}</li>
                                            <li className='list-group-item'> <b>Email: </b>{worker.email}</li>
                                            <li className='list-group-item'> <b>Designation: </b>{worker.designation}</li>
                                            <li className='list-group-item'> <b>Joining Date: </b>{worker.joinDate}</li>
                                            <li className='list-group-item'> <b>Sick Leave Balance: </b>{worker.sickLeaveBalance}</li>
                                            <li className='list-group-item'> <b>casual Leave Balance: </b>{worker.casualLeaveBalance}</li>
                                            <li className='list-group-item'> <b>Privileged Leave Balance: </b>{worker.privilegeLeaveBalance}</li>
                                        </ul>
                                    </div>
                                    <div className='card-footer'>
                                        <button className='btn btn-secondary' onClick={handleEditPassword}>Edit Password</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)} style={{ backgroundColor: 'rgb(0,0,0,.7)' }}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor="editedPassword">New Password:</label>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="editedPassword"
                            className="form-control"
                            value={editedPassword}
                            onChange={handlePasswordChange}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>
                    <p className="text-danger mt-2">{passwordValidationMessage}</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleUpdatePassword}>Update Password</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EmployeeDashboard;

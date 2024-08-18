import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import HeaderComponent from '../HeaderComponent';

const AddLeave = () => {

    const { id } = useParams();

    const [leave, setLeave] = useState({
        startDate: '',
        endDate: '',
        leaveType: '',
        reason: '',
    });

    const { startDate, endDate, leaveType, reason } = leave;

    const onInputChange = (e) => {
        setLeave({ ...leave, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:6900/${id}/leaves/apply`, leave);
            // Extract the response data from the axios response object
            const responseData = response.data;
            // Display the returned string as a pop-up
            alert(responseData);
            window.history.back();
        } catch (error) {
            // Handle error if submission fails
            console.error('Error submitting leave application:', error);
            // Optionally, display an error pop-up
            alert('Error submitting leave application. Please try again later.');
        }
    }


    return (
        <div>
            <HeaderComponent />
            <div className='section' style={{ minHeight: 'calc(100vh - 0px)', marginTop: '20px' }}>
                <div className="row">
                    <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow' style={{ backgroundColor: 'rgb(33, 37, 41)' }}>
                        <h2 className='text-center m-4' style={{ color: 'white' }}>Add Leave</h2>

                        <form onSubmit={onSubmit}>
                            <div className='mb-3'>
                                <label htmlFor="startDate" className='form-label' style={{ color: 'white' }}>Start Date: </label>
                                <input type="date" className='form-control' name='startDate' value={startDate} onChange={onInputChange} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="endDate" className='form-label' style={{ color: 'white' }}>End Date: </label>
                                <input type="date" className='form-control' name='endDate' value={endDate} onChange={onInputChange} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="leaveType" className='form-label' style={{ color: 'white' }}>Leave Type: </label>
                                <select className="form-control" name="leaveType" value={leaveType} onChange={onInputChange}>
                                    <option value="">Select Leave Type</option>
                                    <option value="SICK_LEAVE">Sick Leave</option>
                                    <option value="CASUAL_LEAVE">Casual Leave</option>
                                    <option value="PRIVILEGE_LEAVE">Privilege Leave</option>
                                </select>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="reason" className='form-label' style={{ color: 'white' }}>Reason: </label>
                                <textarea className='form-control' rows='3' name='reason' value={reason} onChange={onInputChange}></textarea>
                            </div>
                            <button type='submit' className='btn btn-secondary'>Submit</button>
                            <Link className='btn btn-danger mx-2' onClick={() => window.history.go(-1)} to="#">Cancel</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddLeave;

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import HeaderComponent from '../HeaderComponent';

const EditWorker = () => {

    const { id } = useParams()

    const [worker, setWorker] = useState({

        userName: '',
        email: '',
        designation: '',
        joinDate: ''

    });

    const { userName, email, designation, joinDate } = worker

    const onInputChange = (e) => {
        setWorker({ ...worker, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        loadWorker()
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:6900/api/workers/${id}`, worker);
        window.history.back();
    }

    const loadWorker = async () => {
        const result = await axios.get(`http://localhost:6900/api/workers/${id}`);
        setWorker(result.data)
    }

    return (
        <div>
            <HeaderComponent></HeaderComponent>
            <div className='section' style={{ minHeight: 'calc(100vh - 0px)', marginTop: '20px' }}>
                <div className="row">
                    <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow' style={{ backgroundColor: 'rgb(33, 37, 41)' }}>
                        <h2 className='text-center m-4' style={{ color: 'white' }}>Edit Worker</h2>

                        <form onSubmit={(e) => onSubmit(e)}>


                            <div className='mb-3'>
                                <label htmlFor="userName" className='form-label' style={{ color: 'white' }}>User Name: </label>
                                <input type={"text"} className='form-control' placeholder='Enter User Name' name='userName' value={userName}
                                    onChange={(e) => onInputChange(e)} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="email" className='form-label' style={{ color: 'white' }}>Email: </label>
                                <input type={"text"} className='form-control' placeholder='Enter Email' name='email' value={email}
                                    onChange={(e) => onInputChange(e)} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="designation" className='form-label' style={{ color: 'white' }}>Designation: </label>
                                <select className="form-control" name="designation" value={designation} onChange={onInputChange}>
                                    <option value="">Select Designation</option>
                                    <option value="HR">HR</option>
                                    <option value="EMPLOYEE">EMPLOYEE</option>
                                </select>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="joinDate" className='form-label' style={{ color: 'white' }}>Joining Date: </label>
                                <input type={"date"} className='form-control' placeholder='Select Joining Date' name='joinDate' value={joinDate}
                                    onChange={(e) => onInputChange(e)} />
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

export default EditWorker
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import HeaderComponent from '../HeaderComponent';

const ViewWorker = () => {

    const [totalLeaves, setTotalLeaves] = useState(0);
    const [worker, setWorker] = useState({})

    const { id } = useParams();

    useEffect(() => {
        loadWorker()
    }, [])

    useEffect(() => {
        if (worker && worker.leaves) {
            setTotalLeaves(worker.leaves.length);
        }
    }, [worker]);


    const loadWorker = async () => {
        try {
            const response = await axios.get(`http://localhost:6900/api/workers/${id}`);
            setWorker(response.data);
        } catch (error) {
            console.error('Error fetching worker:', error);
        }
    }




    return (

        <div>
            <HeaderComponent></HeaderComponent>

            <div className='section' style={{ minHeight: 'calc(100vh - 0px)', marginTop: '20px' }}>
                <div className='row' >
                    <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow' style={{ backgroundColor: 'rgb(33, 37, 41)' }}>
                        <h2 className='text-center m-4' style={{ color: 'white' }}> Worker Details</h2>
                        <div className='card'>
                            <div className='card-header'>
                                Details:
                                <ul className='list-group list-group-flush'>
                                    <li className='list-group-item'> <b>Name: </b>{worker.userName}</li>
                                    <li className='list-group-item'> <b>Email: </b>{worker.email}</li>
                                    <li className='list-group-item'> <b>Designation: </b>{worker.designation}</li>
                                    <li className='list-group-item'> <b>Joining Date: </b>{worker.joinDate}</li>
                                    <li className='list-group-item'> <b>sick leave balance: </b>{worker.sickLeaveBalance}</li>
                                    <li className='list-group-item'> <b>casual leave balance: </b>{worker.casualLeaveBalance}</li>
                                    <li className='list-group-item'> <b>privileged leave balance: </b>{worker.privilegeLeaveBalance}</li>
                                </ul>
                            </div>
                        </div>
                        <button className='btn btn-secondary' style={{ marginTop: '20px' }} onClick={() => window.history.back()}>Go Back</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewWorker
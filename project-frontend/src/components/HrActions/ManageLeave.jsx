import React, { useEffect, useState } from 'react'
import ListOfLeaves from './ListOfLeaves'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import emailjs from 'emailjs-com';

const ManageLeave = () => {

    const [leaves, setLeaves] = useState([]);
    const [worker, setWorker] = useState({
        userName: '',
        email: '',
        sickLeaveBalance: '',
        casualLeaveBalance: '',
        privilegeLeaveBalance: '',
    });
    const { workerid } = useParams();

    // const { status } = leave;

    useEffect(() => {
        loadLeaves();
        loadWorker();
    }, []);

    const handleOnAccept = async (leaveid) => {
        try {

            const templateParamsforAccept = {
                to_email: worker.email,
                to_name: worker.userName,
                to_sick: worker.sickLeaveBalance,
                to_casual: worker.casualLeaveBalance,
                to_privileged: worker.privilegeLeaveBalance,
                to_status: "ACCEPTED"
            };

            await emailjs.send(
                'service_trg9i1h', // your service ID
                'template_nuxow9t', // your template ID
                templateParamsforAccept,
                'WGiT9_FyZ_d4Aq3nn' // your user ID
            );

            const updatedLeave = { status: "ACCEPTED" };
            await axios.put(`http://localhost:6900/${workerid}/leaves/${leaveid}`, updatedLeave);
            loadWorker();
            loadLeaves();

            alert("successfully sent to the worker's email !!")
            window.history.back();

        } catch (error) {
            console.error(error);
        }
    };

    const handleOnReject = async (leaveid) => {
        try {
            const updatedLeave = { status: "REJECTED" };
            await axios.put(`http://localhost:6900/${workerid}/leaves/${leaveid}`, updatedLeave);

            loadWorker();
            loadLeaves();

            const templateParamsforReject = {
                to_email: worker.email,
                to_name: worker.userName,
                to_sick: worker.sickLeaveBalance,
                to_casual: worker.casualLeaveBalance,
                to_privileged: worker.privilegeLeaveBalance,
                to_status: "REJECTED"
            };

            await emailjs.send(
                'service_trg9i1h', // your service ID
                'template_nuxow9t', // your template ID
                templateParamsforReject,
                'WGiT9_FyZ_d4Aq3nn' // your user ID
            );

            alert("successfully sent to the worker's email !!")
            window.history.back();

        } catch (error) {
            console.error(error);
        }
    };


    const loadWorker = async () => {
        try {
            const resp = await axios.get(`http://localhost:6900/api/workers/${workerid}`);
            setWorker(resp.data);
        }
        catch (error) {
            console.error(`Error fetching worker:`, error);
        }
    }

    const loadLeaves = async () => {
        try {
            const response = await axios.get(`http://localhost:6900/${workerid}/leaves`);
            setLeaves(response.data);
        } catch (error) {
            console.error('Error fetching leaves:', error);
        }
    }

    const handleGoBack = () => {
        window.history.back();
    }

    return (
        <div>
            <nav className="navbar navbar-dark bg-dark" style={{ height: '80px', paddingLeft: '20px' }}>
                <div className="navbar-brand">Employee Leave Management</div>
                <div className="navbar-menu">
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <button className="button is-primary" onClick={handleGoBack} style={{ marginRight: '30px', borderRadius: '9px', width: '90px', height: '45px', fontSize: '18px' }}>
                                    <strong>Go Back</strong>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className='section' style={{ minHeight: 'calc(100vh - 0px)', marginTop: '20px' }}>
                <div className='mt-4'>
                    <ListOfLeaves leaveList={leaves} onAccept={handleOnAccept} onReject={handleOnReject} />
                </div>
            </div>

        </div>
    )
}

export default ManageLeave
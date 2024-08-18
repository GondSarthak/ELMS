import React from 'react';
import { useNavigate } from 'react-router-dom';

const TableDataForEmployee = ({ leaveList, empid }) => {

    const navigate = useNavigate();

    const handleAddLeave = () => {
        navigate(`/employee/${empid}/addleave`);
    }

    return (
        <div>
            <h2 className='text-center' style={{ marginBottom: '40px', marginTop: '20px', borderColor: 'rgb(33, 37, 41)', marginLeft: '650px', marginRight: '650px', backgroundColor: 'rgb(33, 37, 41)', color: 'white', borderRadius: '10px' }}>My Leaves</h2>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                {/* Apply Leave button */}
                <button className="btn btn-secondary" onClick={handleAddLeave} style={{ marginBottom: '10px', marginRight: '440px', borderRadius: '9px', width: '150px', height: '45px', fontSize: '18px', border: 'solid', borderColor: 'black' }}>
                    Apply Leave
                </button>

                {/* Table */}
                <table className="table table-striped table-bordered" style={{ width: 'fit-content', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black' }}>Sr. No</th>
                            <th style={{ border: '1px solid black' }}>Start Date</th>
                            <th style={{ border: '1px solid black' }}>End Date</th>
                            <th style={{ border: '1px solid black' }}>Leave Type</th>
                            <th style={{ border: '1px solid black' }}>Status</th>
                            <th style={{ border: '1px solid black' }}>Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaveList.map((leave, index) =>
                            <tr key={leave.id}>
                                <td style={{ border: '1px solid black' }}>{index + 1}</td>
                                <td style={{ border: '1px solid black' }}>{leave.startDate}</td>
                                <td style={{ border: '1px solid black' }}>{leave.endDate}</td>
                                <td style={{ border: '1px solid black' }}>{leave.leaveType}</td>
                                <td style={{ border: '1px solid black' }}>{leave.status}</td>
                                <td style={{ border: '1px solid black' }}>{leave.reason}</td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>
        </div>

    );
}

export default TableDataForEmployee;

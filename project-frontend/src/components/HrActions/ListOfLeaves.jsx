import React from 'react';

const ListOfLeaves = ({ leaveList, onAccept, onReject }) => {
    const handleOnReject = async (id) => {
        try {
            await onReject(id);
        } catch (error) {
            console.error(error);
        }
    };

    const handleOnAccept = async (id) => {
        try {
            await onAccept(id);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2 className='text-center' style={{ marginBottom: '40px', marginTop: '20px' }}>My Leaves</h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <table className="table table-striped table-bordered" style={{ width: 'fit-content' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black' }}>Sr. No</th>
                            <th style={{ border: '1px solid black' }}>Start Date</th>
                            <th style={{ border: '1px solid black' }}>End Date</th>
                            <th style={{ border: '1px solid black' }}>Leave Type</th>
                            <th style={{ border: '1px solid black' }}>Status</th>
                            <th style={{ border: '1px solid black' }}>Reason</th>
                            <th style={{ border: '1px solid black' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaveList
                            .filter(leave => leave.status === "PENDING") // Filter leaves with status "PENDING"
                            .map((leave, index) =>
                                <tr key={leave.id}>
                                    <td style={{ border: '1px solid black' }}>{index + 1}</td>
                                    <td style={{ border: '1px solid black' }}>{leave.startDate}</td>
                                    <td style={{ border: '1px solid black' }}>{leave.endDate}</td>
                                    <td style={{ border: '1px solid black' }}>{leave.leaveType}</td>
                                    <td style={{ border: '1px solid black' }}>{leave.status}</td>
                                    <td style={{ border: '1px solid black' }}>{leave.reason}</td>
                                    <td style={{ border: '1px solid black' }}>
                                        <button className="btn btn-success" onClick={() => handleOnAccept(leave.id)} style={{ marginRight: '10px', borderRadius: '9px', width: '90px', height: '45px', fontSize: '18px' }}>
                                            Accept
                                        </button>
                                        <button className="btn btn-danger" onClick={() => handleOnReject(leave.id)} style={{ marginRight: '10px', borderRadius: '9px', width: '90px', height: '45px', fontSize: '18px' }}>
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default ListOfLeaves;

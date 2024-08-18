import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <div>
            <nav className="navbar navbar-dark bg-dark" style={{ height: '80px', paddingLeft: '20px' }}>
                <div className="navbar-brand">Employee Leave Management</div>
                <div className="navbar-menu">
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <button className="button is-primary" onClick={handleLoginClick} style={{ marginRight: '30px', borderRadius: '9px', width: '90px', height: '45px', fontSize: '20px' }}>
                                    <strong>Login</strong>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <section className="section" style={{ paddingTop: '280px', minHeight: 'calc(100vh - 80px)', backgroundImage: 'url(/homepage.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="title-container" style={{ backgroundColor: 'rgba(0, 0, 0, .8)', padding: '10px', borderRadius: '10px', borderBottomLeftRadius: '0px', color: 'white', display: 'inline-block' }}>
                                <h1 className="title">Welcome to Employee Leave Management System</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row"> {/* Added mt-3 class for margin top */}
                        <div className="col">
                            <div className="subtitle-container" style={{ backgroundColor: 'rgba(0, 0, 0, .8)', padding: '10px', borderRadius: '10px', borderTopLeftRadius: '0px', borderTopRightRadius: '0px', color: 'white', display: 'inline-block' }}>
                                <p className="subtitle">Manage employee leaves efficiently.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Additional content goes here */}
        </div>
    );
};

export default HomePage;

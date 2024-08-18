import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import emailjs from 'emailjs-com';

function Login() {
    let navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [worker, setWorker] = useState({
        userName: '',
        password: ''
    });
    const [foundWorker, setFoundWorker] = useState({
        password: '',
        userName: '',
        email: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [forgotPasswordUsername, setForgotPasswordUsername] = useState('');

    useEffect(() => {
        if (loggedIn && worker) {
            switch (worker.designation) {
                case "ADMIN":
                    navigate(`/admin/${worker.id}`, { state: { loggedIn: loggedIn } });
                    break;

                case "EMPLOYEE":
                    navigate(`/employee/${worker.id}`, { state: { loggedIn: loggedIn } });
                    break;

                case "HR":
                    navigate(`/hr/${worker.id}`, { state: { loggedIn: loggedIn } });
                    break;

                default:
                    setErrorMessage('No matches found for username or password.');
            }
        }
    }, [loggedIn, worker, navigate]);

    const handleGoBack = () => {
        setLoggedIn(false);
        navigate("/");
    }

    const handleLogin = async () => {
        const send = { userName: username, password: password };

        try {
            const response = await axios.post("http://localhost:6900/api/workers/login", send);
            const validWorker = response.data;

            if (validWorker) {
                setLoggedIn(true);
                setWorker(validWorker);
            } else {
                setErrorMessage('No matches found for username or password.');
            }
        } catch (error) {
            console.error("Error occurred during login:", error);
            setErrorMessage('An error occurred during login.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleForgotPasswordPopup = () => {
        setShowForgotPassword(!showForgotPassword);
    };

    const handleRequestPassword = async () => {
        const user_name = { userName: forgotPasswordUsername };

        try {
            const resp = await axios.post("http://localhost:6900/api/workers/username", user_name);
            const validWorker = resp.data;

            if (validWorker !== null) {
                setFoundWorker(validWorker);

                // Check if email is available before sending the email
                if (validWorker.email) {
                    const templateParams = {
                        to_email: validWorker.email,
                        to_name: validWorker.userName,
                        to_password: validWorker.password
                    };

                    await emailjs.send(
                        'service_an06lv7',
                        'template_t81a6bn',
                        templateParams,
                        '6Rx65R88bYdyCP0Pq'
                    );

                    alert("Check your email for password!");
                    toggleForgotPasswordPopup();
                } else {
                    alert('no matches found for username.')
                    setErrorMessage('No matches found for username.');
                }
            } else {
                setErrorMessage('No matches found for username.');
            }
        } catch (error) {
            console.error("Error occurred during password request:", error);
            setErrorMessage('An error occurred during password request.');
        }
    };

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
            <section className="section" style={{ paddingTop: '160px', minHeight: 'calc(100vh - 80px)', backgroundImage: 'url(blurred_14.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-5">
                            <div className="card bg-dark text-white" style={{ borderRadius: '10px' }}>
                                <div className="card-body" >
                                    <h2 className="text-center mb-4">Login</h2>
                                    <form>
                                        <div className="form-group mb-5">
                                            <input type="text" className="form-control" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                        </div>
                                        <div className="form-group mb-4">
                                            <div className="input-group">
                                                <input type={showPassword ? "text" : "password"} className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                <button className="btn" type="button" style={{ backgroundColor: 'rgb(75, 130, 195)' }} onClick={togglePasswordVisibility}>{showPassword ? "Hide" : "Show"}</button>
                                            </div>
                                        </div>
                                        <div className="text-center mb-2">
                                            <button type="button" className="btn" style={{ fontSize: '20px', backgroundColor: 'rgb(75, 130, 195)' }} onClick={handleLogin}>Login</button>
                                            <button type="button" className="btn" style={{ color: 'white' }} onClick={toggleForgotPasswordPopup}>Forgot Password?</button>
                                        </div>
                                        {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {showForgotPassword && (
                <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Forgot Password</h5>
                                <button type="button" className="close" onClick={toggleForgotPasswordPopup}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="forgotPasswordUsername">Username</label>
                                    <input type="text" className="form-control" id="forgotPasswordUsername" value={forgotPasswordUsername} onChange={(e) => setForgotPasswordUsername(e.target.value)} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleRequestPassword}>Request Password</button>
                                <button type="button" className="btn btn-danger" onClick={toggleForgotPasswordPopup}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;

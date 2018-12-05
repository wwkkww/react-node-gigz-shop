import React from 'react';
import MyButton from '../utils/button'; 
import Login from './Login';

const RegisterLogin = () => {
    return (
        <div className="page_wrapper">
            <div className="container">
                <div className="register_login_container">
                    <div className="left">
                    <h1>New Customer</h1>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis cum asperiores porro quasi enim magnam deleniti ducimus, illum in, ipsa maxime, odit saepe nesciunt mollitia adipisci assumenda accusantium est corrupti!</p>
                        <MyButton 
                            type="default"
                            title="Create an account"
                            linkTo="/register"
                            addStyles={{
                                margin: '10px 0 0 0'
                            }}
                        />
                    </div>
                    <div className="right">
                        <h2>Registered customers</h2>
                        <p>Please log in with your account.</p>
                        <Login />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RegisterLogin;
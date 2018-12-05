import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';

import { update, generateData, isFormValid } from '../utils/Form/FormActions'
import { registerUser } from '../../actions/user_actions';
import FormField from '../utils/Form/FormField';

class Register extends Component {
    state = {
        formError: false,
        formSuccess: false,
        formData: {
            name: {
                element: 'input',
                value: '',
                config: {
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter your first name'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            lastname: {
                element: 'input',
                value: '',
                config: {
                    name: 'lastname_input',
                    type: 'text',
                    placeholder: 'Enter your last name'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            confirmPassword: {
                element: 'input',
                value: '',
                config: {
                    name: 'confirm_password_input',
                    type: 'password',
                    placeholder: 'Confirm your password'
                },
                validation: {
                    required: true,
                    confirm: 'password'
                },
                valid: false,
                touched: false,
                validationMessage: ''
            }

        }
    };

    updateForm = (e) => {
        const newFormData = update(e, this.state.formData, 'register');
        this.setState({
            formError: false,
            formData: newFormData
        })
    };

    submitForm = (e) => {
        e.preventDefault();

        let dataToSubmit = generateData(this.state.formData, 'register');
        let validForm = isFormValid(this.state.formData, 'register')
        if (validForm) {
            console.log(dataToSubmit);
            this.props.dispatch(registerUser(dataToSubmit)).then(res => {
                if (res.payload.success) {
                    console.log(res.payload);
                    this.setState({
                        formError: false,
                        formSuccess: true
                    });
                    setTimeout(()=> {
                        this.props.history.push('/register_login')
                    }, 3000)
                } else {
                    console.log('res', res)
                    this.setState({
                        formError: true
                    });
                }
            }).catch(e => {
                this.setState({
                    formError: true
                });
            })
        } else {
            this.setState({
                formError: true
            });
        }
    };


    render() {
        return (
            <div className="page_wrapper">
                <div className="container">
                    <div className="register_login_container">
                        <div className="left">
                            <form onSubmit={(e) => this.submitForm(e)}>
                                <h2>Enter your info</h2>
                                <div className="form_block_two">
                                    <div className="block">
                                        <FormField
                                            id={'name'}
                                            formData={this.state.formData.name}
                                            change={(e) => this.updateForm(e)}
                                        />
                                    </div>
                                    <div className="block">
                                        <FormField
                                            id={'lastname'}
                                            formData={this.state.formData.lastname}
                                            change={(e) => this.updateForm(e)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <FormField
                                        id={'email'}
                                        formData={this.state.formData.email}
                                        change={(e) => this.updateForm(e)}
                                    />
                                </div>
                                <h2>Verified password</h2>
                                <div className="form_block_two">
                                    <div className="block">
                                        <FormField
                                            id={'password'}
                                            formData={this.state.formData.password}
                                            change={(e) => this.updateForm(e)}
                                        />
                                    </div>
                                    <div className="block">
                                        <FormField
                                            id={'confirmPassword'}
                                            formData={this.state.formData.confirmPassword}
                                            change={(e) => this.updateForm(e)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    {this.state.formError ?
                                        <div className="error_label">
                                            Please check your data
                                        </div>: null}

                                    <button onClick={(event) => this.submitForm(event)}>
                                        Create account</button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Dialog open={this.state.formSuccess}>
                    <div className="dialog_alert">
                        <div>Thank you for your registration</div>
                        <p>You will be redirect to the dashboard page soon...</p>
                    </div>

                </Dialog>
            </div>
        );
    }
}

export default connect()(Register);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { update, generateData, isFormValid } from '../utils/Form/FormActions'
import { loginUser } from '../../actions/user_actions';
import { withRouter } from 'react-router-dom';
import FormField from '../utils/Form/FormField';

class Login extends Component {

    state = {
        formError: false,
        formSuccess: '',
        formData: {
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
            }
        }

    }

    submitForm = (e) => {
        e.preventDefault();
        
        let dataToSubmit = generateData(this.state.formData, 'login');
        let validForm = isFormValid(this.state.formData, 'login')
        if (validForm) {
            // console.log(dataToSubmit);
            this.props.dispatch(loginUser(dataToSubmit)).then(res => {
                if(res.payload.loginSuccess){
                    console.log("Login payload", res.payload);
                    this.props.history.push('./user/dashboard')
                } else {
                    this.setState({
                        formError: true
                    })
                }
            });
        } else {
            this.setState({
                formError: true
            })
        }
    };

    updateForm = (e) => {
        const newFormData = update(e, this.state.formData, 'login');
        this.setState({
            formError: false,
            formData: newFormData
        })
    };

    render() {
        return (
            <div className="signin_wrapper">
                <form onSubmit={(event) => this.submitForm(event)}>
                    <FormField
                        id={'email'}
                        formData={this.state.formData.email}
                        change={(e) => this.updateForm(e)}
                    />
                    <FormField
                        id={'password'}
                        formData={this.state.formData.password}
                        change={(e) => this.updateForm(e)}
                    />
                    {this.state.formError ?
                        <div className="error_label">
                            Please check your data
                        </div> : null}

                    <button onClick={(event) => this.submitForm(event)}>Log in</button>

                </form>
            </div>
        );
    }
}

export default connect()(withRouter(Login));
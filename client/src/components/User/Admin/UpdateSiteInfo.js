import React, { Component } from 'react';
import { update, generateData, isFormValid, populateFields } from '../../utils/Form/FormActions'
import FormField from '../../utils/Form/FormField';
import { connect } from 'react-redux';
import { getSiteData, updateSiteData } from '../../../actions/site_actions';


class UpdateSiteInfo extends Component {
    state = {
        formError: false,
        formSuccess: false,
        formData: {
            address: {
                element: 'input',
                value: '',
                config: {
                    label: 'Address',
                    name: 'address_input',
                    type: 'text',
                    placeholder: 'Enter site address'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            hours: {
                element: 'input',
                value: '',
                config: {
                    label: 'Opening hours',
                    name: 'hours_input',
                    type: 'text',
                    placeholder: 'Enter business hours'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            phone: {
                element: 'input',
                value: '',
                config: {
                    label: 'Phone number',
                    name: 'phone_input',
                    type: 'text',
                    placeholder: 'Enter phone number'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            email: {
                element: 'input',
                value: '',
                config: {
                    label: 'Shop email',
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
                validationMessage: '',
                showLabel: true
            }
        }
    };

    updateForm = (e) => {
        const newFormData = update(e, this.state.formData, 'site_info');
        this.setState({
            formError: false,
            formData: newFormData
        })
    };

    submitForm = (e) => {
        e.preventDefault();

        let dataToSubmit = generateData(this.state.formData, 'site_info');
        let validForm = isFormValid(this.state.formData, 'site_info')
        if (validForm) {
            // console.log(dataToSubmit);
            this.props.dispatch(updateSiteData(dataToSubmit)).then(()=> {
                this.setState({
                    formSuccess: true
                }, ()=> {
                    setTimeout(()=> {
                        this.setState({
                            formSuccess: false
                        })
                    }, 2000)
                })
            })

        } else {
            this.setState({
                formError: true
            });
        }
    };

    componentDidMount(){
        this.props.dispatch(getSiteData()).then(()=> {
            console.log(this.props.site.siteData[0])
            const newFormData = populateFields(this.state.formData, this.props.site.siteData[0])
            this.setState({
                formData: newFormData
            })
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={(e) => this.submitForm(e)}>
                    <h1>Site info</h1>
                    <FormField
                        id={'address'}
                        formData={this.state.formData.address}
                        change={(e) => this.updateForm(e)}
                    />

                    <FormField
                        id={'hours'}
                        formData={this.state.formData.hours}
                        change={(e) => this.updateForm(e)}
                    />

                    <FormField
                        id={'phone'}
                        formData={this.state.formData.phone}
                        change={(e) => this.updateForm(e)}
                    />

                    <FormField
                        id={'email'}
                        formData={this.state.formData.email}
                        change={(e) => this.updateForm(e)}
                    />

                    <div>
                        {   this.state.formSuccess ?
                                <div className="form_success">Success</div>
                                : null
                        }
                        {this.state.formError ?
                            <div className="error_label">
                                Please check your data
                                        </div> : null}
                        <button onClick={(event) => this.submitForm(event)}>
                            Update Site Info</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        site: state.site
    }
}

export default connect(mapStateToProps)(UpdateSiteInfo);
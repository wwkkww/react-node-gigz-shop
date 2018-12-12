import React, { Component } from 'react';
import FormField from '../../utils/Form/FormField';
import { update, generateData, isFormValid, resetFields } from '../../utils/Form/FormActions';
import { connect } from 'react-redux';
import { getWoods, addWood } from '../../../actions/products_actions';

class ManageWoods extends Component {
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
                    placeholder: 'Type of Wood'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
        }
    };

    showCategoryItems = () => (
        this.props.products.woods ?
            this.props.products.woods.map((item, i) => (
                <div className="category_item" key={item._id}>
                    {item.name}
                </div>
            )) : null
    );

    componentWillMount() {
        this.props.dispatch(getWoods());
    };

    updateForm = (e) => {
        const newFormData = update(e, this.state.formData, 'woods');
        this.setState({
            formError: false,
            formData: newFormData
        })
    };

    submitForm = (e) => {
        e.preventDefault();

        let dataToSubmit = generateData(this.state.formData, 'woods');
        let validForm = isFormValid(this.state.formData, 'woods')
        let existingWoods = this.props.products.woods;

        if (validForm) {
            this.props.dispatch(addWood(dataToSubmit, existingWoods))
                .then((response => {
                    if (response.payload.success) {
                        this.resetFieldsHandler()
                    } else {
                        this.setState({ formError: true })
                    }
                }))
            // console.log('dataToSubmit', dataToSubmit)
        } else {
            this.setState({
                formError: true
            });
        }
    };

    resetFieldsHandler = () => {
        const newFormData = resetFields(this.state.formData, 'woods')

        this.setState({
            formData: newFormData,
            formSuccess: true
        });

        setTimeout(() => {
            this.setState({ formSuccess: false })
        }, 2000)
    }


    render() {
        return (
            <div className="admin_category_wrapper">
                <h1>Woods</h1>
                <div className="admin_two_column">
                    <div className="left">
                        <div className="brands_container">
                            {this.showCategoryItems()}
                        </div>
                    </div>
                    <div className="right">
                        <form onSubmit={(event) => this.submitForm(event)}>
                            <FormField
                                id={'name'}
                                formData={this.state.formData.name}
                                change={(e) => this.updateForm(e)}
                            />

                            {this.state.formSuccess ?
                                <div className="form_success">
                                    Success
                            </div> : null}

                            {this.state.formError ?
                                <div className="error_label">
                                    Please check your data
                            </div> : null}

                            <button onClick={(event) => this.submitForm(event)}>
                                Add Wood</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
};

export default connect(mapStateToProps)(ManageWoods);
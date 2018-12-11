import React, { Component } from 'react';
import UserLayout from '../../../hoc/UserLayout';
import { update, generateData, isFormValid, populateOptionFields, resetFields } from '../../utils/Form/FormActions'
import FormField from '../../utils/Form/FormField';

import { connect } from 'react-redux';
import { getBrands, getWoods, addProduct, clearProduct } from '../../../actions/products_actions';

class AddProduct extends Component {

    state = {
        formError: false,
        formSuccess: false,
        formData: {
            name: {
                element: 'input',
                value: '',
                config: {
                    label: 'Product name',
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter product name'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            description: {
                element: 'textarea',
                value: '',
                config: {
                    label: 'Product description',
                    name: 'description_input',
                    type: 'text',
                    placeholder: 'Enter product description'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            price: {
                element: 'input',
                value: '',
                config: {
                    label: 'Product price',
                    name: 'price_input',
                    type: 'number',
                    placeholder: 'Enter price'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            brand: {
                element: 'select',
                value: '',
                config: {
                    label: 'Product brand',
                    name: 'brands_input',
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            shipping: {
                element: 'select',
                value: '',
                config: {
                    label: 'Shipping',
                    name: 'shipping_input',
                    options: [
                        { key: true, value: 'Yes' },
                        { key: false, value: 'No' }
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            available: {
                element: 'select',
                value: '',
                config: {
                    label: 'Available, in stock',
                    name: 'available_input',
                    options: [
                        { key: true, value: 'Yes' },
                        { key: false, value: 'No' }
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            wood: {
                element: 'select',
                value: '',
                config: {
                    label: 'Wood material',
                    name: 'wood_input',
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            frets: {
                element: 'select',
                value: '',
                config: {
                    label: 'Frets',
                    name: 'frets_input',
                    options: [
                        { key: 21, value: 21 },
                        { key: 22, value: 22 },
                        { key: 24, value: 24 }
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            publish: {
                element: 'select',
                value: '',
                config: {
                    label: 'Publish',
                    name: 'publish_input',
                    options: [
                        { key: true, value: 'Public' },
                        { key: false, value: 'Hidden' }
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            }
        }
    };

    updateForm = (e) => {
        const newFormData = update(e, this.state.formData, 'products');
        this.setState({
            formError: false,
            formData: newFormData
        })
    };

    resetFieldHandler = () => {
        const newFormData = resetFields(this.state.formData, 'products')

        this.setState({
            formData: newFormData,
            formSuccess: true
        });

        setTimeout(() => {
            this.setState({ formSuccess: false }, ()=> {
                this.props.dispatch(clearProduct())
            })
        }, 3000)
    };

    submitForm = (e) => {
        e.preventDefault();

        let dataToSubmit = generateData(this.state.formData, 'products');
        let validForm = isFormValid(this.state.formData, 'products')
        if (validForm) {
            this.props.dispatch(addProduct(dataToSubmit)).then(() => {
                if (this.props.products.addProduct.success) {
                    this.resetFieldHandler();
                } else {
                    this.setState({ formError: true })
                }
            })
            // console.log('dataToSubmit', dataToSubmit)
        } else {
            this.setState({
                formError: true
            });
        }
    };

    componentDidMount() {
        const formData = this.state.formData;

        //Get brands
        this.props.dispatch(getBrands()).then(res => {
            const newFormData = populateOptionFields(formData, this.props.products.brands, 'brand');
            this.updateFields(newFormData);
        });

        //Get woods
        this.props.dispatch(getWoods()).then(res => {
            const newFormData = populateOptionFields(formData, this.props.products.woods, 'wood');
            this.updateFields(newFormData);
        });


    };

    updateFields = (newFormData) => {
        this.setState({
            formData: newFormData
        })
    };


    render() {
        return (
            <UserLayout>
                <div>
                    <h1>Add product</h1>
                    <form onSubmit={(event) => this.submitForm(event)}>
                        <FormField
                            id={'name'}
                            formData={this.state.formData.name}
                            change={(e) => this.updateForm(e)}
                        />

                        <FormField
                            id={'description'}
                            formData={this.state.formData.description}
                            change={(e) => this.updateForm(e)}
                        />

                        <FormField
                            id={'price'}
                            formData={this.state.formData.price}
                            change={(e) => this.updateForm(e)}
                        />

                        <div className="form_divider"></div>

                        <FormField
                            id={'brand'}
                            formData={this.state.formData.brand}
                            change={(e) => this.updateForm(e)}
                        />

                        <FormField
                            id={'shipping'}
                            formData={this.state.formData.shipping}
                            change={(e) => this.updateForm(e)}
                        />

                        <FormField
                            id={'available'}
                            formData={this.state.formData.available}
                            change={(e) => this.updateForm(e)}
                        />

                        <div className="form_divider"></div>

                        <FormField
                            id={'wood'}
                            formData={this.state.formData.wood}
                            change={(e) => this.updateForm(e)}
                        />

                        <FormField
                            id={'frets'}
                            formData={this.state.formData.frets}
                            change={(e) => this.updateForm(e)}
                        />

                        <div className="form_divider"></div>

                        <FormField
                            id={'publish'}
                            formData={this.state.formData.publish}
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
                            Add product</button>


                    </form>
                </div>
            </UserLayout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(AddProduct);
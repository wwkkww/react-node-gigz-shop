import React, { Component } from 'react';
import UserLayout from '../../hoc/UserLayout';
import ProductBlock from '../utils/User/ProductBlock';

import { connect } from 'react-redux';
import { getCartItems, removeCartItem, onSuccessBuy } from '../../actions/user_actions';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';

import Paypal from '../utils/Paypal';
// wongkokwah-facilitator@gmail.com
// 
// ATmzZso-E1mazblfcCkXDdakdUFs-RCgl8zR2LkKx6lINsVtrok0ojlB-tC475Fse2U5KSaoUDZKojQr

class UserCart extends Component {
    state = {
        loading: true,
        total: 0,
        showTotal: false,
        showSuccess: false
    }

    componentDidMount() {
        let cartItem = [];
        let user = this.props.user;

        if (user.userData.cart) {
            if (user.userData.cart.length > 0) {
                user.userData.cart.forEach(item => {
                    cartItem.push(item.id)
                });
                this.props.dispatch(getCartItems(cartItem, user.userData.cart))
                    .then(() => {
                        if (this.props.user.cartDetails.length > 0) {
                            this.calculateTotal(this.props.user.cartDetails);
                        }
                    })
            }
        }
    };

    calculateTotal = (cartDetails) => {
        console.log(cartDetails);
        let total = 0;
        cartDetails.forEach(item => {
            total += parseInt(item.price, 10) * item.quantity
        });

        this.setState({
            total,
            showTotal: true
        })
    }

    removeFromCart = (id) => {
        this.props.dispatch(removeCartItem(id))
            .then(() => {
                if (this.props.user.cartDetails.length <= 0) {
                    this.setState({
                        showTotal: false
                    })
                } else {
                    this.calculateTotal(this.props.user.cartDetails)
                }
            })
    };

    showNoItemMessage = () => (
        <div className="cart_no_items">
            <FontAwesomeIcon icon={faFrown} />
            <div>You have no item in cart</div>
        </div>
    );

    transactionError = (data) => {
        console.log('Paypal error', data)
    }

    transactionCanceled = () => {
        console.log('Transaction Canceled')
    }

    transactionSuccess = (data) => {
        this.props.dispatch(onSuccessBuy({
            cartDetails: this.props.user.cartDetails,
            paymentData: data
        })).then(()=> {
            if(this.props.user.successBuy){
                this.setState({
                    showTotal: false,
                    showSuccess: true
                });
            }
        })
        
    }

    render() {
        return (
            <UserLayout>
                <div>
                    <h1>My Cart</h1>
                    <div className="user_cart">
                        <ProductBlock
                            products={this.props.user}
                            type="cart"
                            removeItem={(id) => this.removeFromCart(id)}
                        />
                        {
                            this.state.showTotal ?
                                <div className="user_cart_sum">
                                    <div>
                                        Total amount: $ {this.state.total}
                                    </div>
                                </div>
                                :
                                this.state.showSuccess ?
                                    <div className="cart_success">
                                        <FontAwesomeIcon icon={faSmile} />
                                        <div>Thank you</div>
                                        <div>Your order is complete</div>
                                    </div>
                                    : this.showNoItemMessage()
                        }
                    </div>
                    {
                        this.state.showTotal ?
                            <div className="paypal_button_container">
                                <Paypal
                                    toPay={this.state.total}
                                    transactionError={(data) => this.transactionError(data)}
                                    transactionCanceled={(data) => this.transactionCanceled(data)}
                                    onSuccess={(data)=> this.transactionSuccess(data)}
                                />
                            </div>
                            : null
                    }
                </div>
            </UserLayout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UserCart);
import React, { Component } from 'react';
import PageTop from '../utils/PageTop';
import ProductInfo from './ProductInfo';
import ProductImg from './ProductImg';

import { connect } from 'react-redux';
import { getProductDetail, clearProductDetail } from '../../actions/products_actions';

class ProductPage extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.dispatch(getProductDetail(id)).then(res=> {
            if(! this.props.products.prodDetail) {
                console.log('no article found')
                this.props.history.push('/')
            }
        })
    };
    
    componentWillUnmount(){
        this.props.dispatch(clearProductDetail())
    }

    render() {
        return (
            <div>
                <PageTop title="Product details" />
                    <div className="container">
                    {
                        this.props.products.prodDetail ?
                        <div className="product_detail_wrapper">
                            <div className="left">
                                <div style={{width:'500px'}}>
                                    <ProductImg 
                                        detail={this.props.products.prodDetail}
                                    />
                                </div>
                            </div>
                            <div className="right">
                                <ProductInfo 
                                    addToCart={(id)=> this.addToCartHandler(id)}
                                    detail={this.props.products.prodDetail}
                                />
                            </div>
                        </div>
                        : 'Loading'
                    }
                    </div>
                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(ProductPage); 
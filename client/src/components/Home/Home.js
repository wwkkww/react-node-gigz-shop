import React, { Component } from 'react';
import HomeSlider from './HomeSlider';
import HomePromotion from './HomePromotion';
import CardBlock from '../utils/CardBlock';

import { connect } from 'react-redux';
import { getProductByArrival, getProductBySell } from '../../actions/products_actions';

class Home extends Component {

    componentDidMount(){
        this.props.dispatch(getProductBySell());
        this.props.dispatch(getProductByArrival());
    }

    render() {
        return (
            <div>
                <HomeSlider />
                <CardBlock list={this.props.products.bySell} title="Best Selling Guitars"/>
                <HomePromotion />
                <CardBlock list={this.props.products.byArrival} title="New Arrivals"/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(Home);
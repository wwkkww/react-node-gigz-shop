import React from 'react';
import moment from 'moment';

const HistoryBlock = (props) => {
    
    const renderBlocks = () => (
        props.products ?
            props.products.map((product, i)=> (
                <tr key={i}>
                    <td>{moment(product.dateOfPurchase).format("DD-MM-YYYY")}</td>
                    <td>{product.brand} {product.name}</td>
                    <td>RM {product.price}</td>
                    <td>{product.quantity}</td>
                </tr>
            ))
        : null
    );


    return (
        <div className="history_blocks">
            <table>
                <thead>
                    <tr>
                        <th>Date of Purchase</th>
                        <th>Product</th>
                        <th>Price paid</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {renderBlocks()}
                </tbody>
            </table>
        </div>
    );
};

export default HistoryBlock;
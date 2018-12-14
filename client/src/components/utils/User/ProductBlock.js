import React from 'react';

const ProductBlock = ({ products, removeItem }) => {

    const renderCartImage = (images) => {
        if(images.length > 0){
            return images[0].url
        } else {
            return '/images/image_not_available.png'
        }
    }

    const renderItems = () => (
        products.cartDetails ? 
        products.cartDetails.map(product => (
            <div className="user_product_block" key={product._id}>
                <div className="item">
                    <div className="image" style={{background:`url(${renderCartImage(product.images)}) no-repeat`}}>
                    </div>
                </div>
                <div className="item">
                    <h4>Product name</h4>
                    <div>{product.brand.name} {product.name}</div>
                </div>
                <div className="item">
                    <h4>Quantity</h4>
                    <div>{product.quantity}</div>
                </div>
                <div className="item">
                    <h4>Price</h4>
                    <div>$ {product.price}</div>
                </div>
                <div className="item btn">
                    <div className="cart_remove_btn"
                        onClick={()=>removeItem(product._id)}>
                        Remove
                    </div>
                </div>
            </div>
        ))
        : null
    );

    return (
        <div>
            {renderItems()}
        </div>
    );
};

export default ProductBlock;
import React from 'react';
import UserLayout from '../../hoc/UserLayout';
import MyButton from '../utils/button';

const UserDashboard = () => {
    return (
        <UserLayout>
            <div>
                <div className="user_nfo_panel">
                    <h1>User information</h1>
                    <div>
                        <span>First name</span>
                        <span>Last name</span>
                        <span>Email</span>
                    </div>
                    <MyButton
                        type="default"
                        title="Edit info"
                        linkTo="/user/user_profile"
                    />
                </div>
                <div className="user_nfo_panel">
                    <h1>Purchase history</h1>
                    <div className="user_product_block_wrapper">
                        No purchase history
                    </div>
                </div>

            </div>
        </UserLayout>
    );
};

export default UserDashboard;
import React from 'react';
import UserLayout from '../../hoc/UserLayout';
import MyButton from '../utils/button';

const UserDashboard = ({user}) => {
    return (
        <UserLayout>
            <div>
                <div className="user_nfo_panel">
                    <h1>User information</h1>
                    <div>
                        <span>{user.userData.name}</span>
                        <span>{user.userData.lastname}</span>
                        <span>{user.userData.email}</span>
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
                    {user.userData.hitory}
                    </div>
                </div>

            </div>
        </UserLayout>
    );
};

export default UserDashboard;
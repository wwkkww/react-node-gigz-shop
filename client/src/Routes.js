import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Auth from './hoc/Auth';
import Layout from './hoc/Layout';

import Home from './components/Home/Home';
import RegisterLogin from './components/Register_Login/RegisterLogin';
import Register from './components/Register_Login/Register';
import UserDashboard from './components/User/UserDashboard';
import Shop from './components/Shop/Shop';
import AddProduct from './components/User/Admin/AddProduct';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/admin/add_product" exact component={Auth(AddProduct, true)}/>
        <Route path="/user/dashboard" exact component={Auth(UserDashboard, true)}/>

        <Route path="/register" exact component={Auth(Register, false)}/>
        <Route path="/register_login" exact component={Auth(RegisterLogin, false)}/>

        <Route path="/shop" exact component={Auth(Shop, null)}/>
        <Route path="/" exact component={Auth(Home, null)}/>
      </Switch>
    </Layout>
  );
};

export default Routes;
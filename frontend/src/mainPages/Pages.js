import React, {useContext} from 'react';
import {Switch, Route} from 'react-router-dom';
import {GlobalState} from '../GlobalState';
import Cart from './cart/Cart';
import SignIn from './authentication/SignIn';
import SignUp from './authentication/SignUp';
import Product from './products/Product';
import NotFound from './utils/NotFound';
import Categories from './categories/Categories';
import CreateProduct from './products/CreateProduct';
import Checkout from './checkout/Checkout';

export default function Pages() {

    const state = useContext(GlobalState);
    const [isLogged] = state.userAPI.isLogged;
    const [isAdmin] = state.userAPI.isAdmin;

    return (
        
        <Switch>
            <Route path="/" exact component={Product}/>
            <Route path="/Cart" exact component={Cart}/>
            <Route path="/SignIn" exact component={isLogged ? NotFound : SignIn}/>
            <Route path="/SignUp" exact component={isLogged ? NotFound : SignUp}/>

            <Route path="/Categories" exact component={isAdmin ? Categories : NotFound}/>
            <Route path="/CreateProduct" exact component={isAdmin ? CreateProduct : NotFound}/>
            <Route path="/EditProduct/:id" exact component={isAdmin ? CreateProduct : NotFound}/>
            <Route path="/Checkout" exact component={isLogged ? Checkout : NotFound}/>
           {/* <Route path="/ReviewOrder" exact component={isLogged ? ReviewOrder : NotFound}/>*/} {/* review the order immideatly after the placing order haven't set */}

            <Route path="/NotFound" exact component={NotFound}/>
            
        </Switch>
    )
}


// order viewing sections for both customer and admin created but those were abandened since navigation problem encountered
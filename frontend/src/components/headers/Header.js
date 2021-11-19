import React, {useContext} from 'react';
import {GlobalState} from '../../GlobalState';
import {AppBar, Box, Toolbar, Typography, Button, IconButton, Badge} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default function Header() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged;
    const [isAdmin] = state.userAPI.isAdmin;
    const [cart] = state.userAPI.cart;

    const adminRouter = () => {
        return(
            <Box sx = {{display: {md: 'flex', xs: 'none'}}}>
                <Button><Link style={{textDecoration: 'none'}} to="/CreateProduct">Create Product</Link></Button>
                <Button><Link style={{textDecoration: 'none'}} to="/Categories">Categories</Link></Button>
            </Box>
        )
    }

    const userLogout = async () => {
        await axios.get('/user/logout')
        localStorage.removeItem('firstLogin');
        window.location.href ='/';
    }

    const loggedRouter = () => {
        return(
            <Box sx = {{display: {md: 'flex', xs: 'none'}}}>
                <Button><Link style={{textDecoration: 'none'}} to="/History">History</Link></Button>
                <Button><Link style={{textDecoration: 'none'}} to="/" onClick ={userLogout}>Logout</Link></Button>
            </Box>
        )
    }

    return (
        <Box sx={{ display: 'flex',}}>
            <AppBar position="relative" color="transparent">
                <Toolbar>
                    <Box size="large" edge="start" color="inherit" sx={{ mr: 2, display: {md: 'none', xs: 'flex'} }}>
                        <MenuIcon/>
                    </Box>
                    
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link style={{textDecoration: 'none'}} to ='/'>{isAdmin ? 'Admin-View' : 'Online-Grocery'}</Link>
                    </Typography>
                    <Button sx = {{display: {md: 'flex', xs: 'none'}}} color="inherit"><Link style={{textDecoration: 'none'}} to='/'>{isAdmin ? 'Products' : 'Shop'}</Link></Button>

                    {isAdmin && adminRouter()} 
                    
                    {
                        isLogged ? loggedRouter() : <Box sx = {{display: {md: 'flex', xs: 'none'}}}><Button color="inherit"><Link style={{textDecoration: 'none'}} to='/SignIn'>Sign-In</Link></Button><Button color="inherit"><Link style={{textDecoration: 'none'}} to='/SignUp'>Sign-Up</Link></Button></Box>
                    }
                    
                    {
                        isAdmin ? " " : <IconButton  size="large" color="inherit"><Badge badgeContent={cart.length} color="error"><Link to ='/Cart'><ShoppingCartIcon/></Link> </Badge></IconButton>
                    }
                   
                    
                </Toolbar>
            </AppBar>
        </Box>
    );
}
    




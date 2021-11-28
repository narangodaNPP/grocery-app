import React, {useState, useContext} from 'react';
import {Grid, Typography, TextField, Box, Container, Button,} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {GlobalState} from '../../GlobalState';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default function Checkout() {
    const state = useContext(GlobalState);
    const [token] = state.token;
    const [cart, setCart] = state.userAPI.cart;
    const theme = createTheme();

    const [checkout, setCheckout] = useState({
        first_name: '', last_name: '', contactNo: '', houseNo: '', street: '', city: '', cart: cart
    })

    const orderSuccess = (checkout) => {
        console.log("Order successfully placed", checkout);
        
        this.props.placeOrder(checkout);
    }

    const onChangeInput = (e) => {
        const {name, value} = e.target;
        setCheckout({...checkout, [name]: value});
    }

    // adding 0 items to cart after cleaning the cart
    const addToCart = async (cart) => {
        await axios.patch('/user/addcart', {cart}, {headers: {Authorization: token}})
    }

    // cart clear function after the checkout is done
    const clearCart = () => {
        cart.forEach((item, index) => {
            cart.splice(index, cart.length);
        })
        setCart([...cart]);
        addToCart(cart);
    }

    // submit the checkout in db
    const checkoutSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('/api/checkout', {...checkout}, {headers: {Authorization: token}});
            alert("Placing order completed");
            clearCart();
            window.location.href ="/"
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="sm" sx ={{marginTop: 8, pb: 4, border: '1px solid blue'}}>
                <Box sx={{ marginTop: 4, marginBottom: 4, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                    <Box sx ={{ m: 2}}>
                        <Typography component="h1" variant="h5">Checkout</Typography>
                    </Box>
                    <Box component= 'form' onSubmit={checkoutSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TextField required id="first_name" name="first_name" placeholder="First name" value = {checkout.first_name} fullWidth onChange={onChangeInput} />
                            </Grid>
                            <Grid item xs={6} >
                                <TextField required id="last_name" name="last_name" placeholder="Last name" value = {checkout.last_name} fullWidth onChange ={onChangeInput}/>
                            </Grid>
                            <Grid item xs={6} >
                                <TextField required id="contactNo" name="contactNo" placeholder="Contact No:" value ={checkout.contactNo} fullWidth  onChange={onChangeInput}/>
                            </Grid>
                            <Grid item xs={6} >
                                <TextField required id="houseNo" name="houseNo" placeholder="House No:" value ={checkout.houseNo} fullWidth onChange={onChangeInput}/>
                            </Grid>
                            <Grid item xs={6} >
                                <TextField required id="street" name="street" placeholder="Street" value ={checkout.street} fullWidth onChange={onChangeInput}/>
                            </Grid>
                            <Grid item xs={6} >
                                <TextField required id="city" name="city" placeholder="City" value ={checkout.city} fullWidth onChange={onChangeInput} />
                            </Grid>    
                        </Grid>
                        <Box sx ={{display: 'flex', justifyContent: 'flex-end',}}>
                            <Button color = 'success' variant="outlined" sx={{ m: 3,}} >
                                <Link to="/Cart" style={{textDecoration: 'none'}}>Back</Link>
                            </Button>
                            <Button type="submit" color = 'success' variant="contained" orderSuccess ={orderSuccess} sx={{ m: 3,}} >
                                Place Order
                            </Button>
                        </Box>
                        
                    </Box>
                
                </Box>
            </Container>
        </ThemeProvider>
    )
}

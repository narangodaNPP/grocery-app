import React, {useContext, useState, useEffect} from 'react';
import {GlobalState} from '../../GlobalState';
import {Card, CardMedia, Button, Container, Tooltip, Stack, Box, Paper, IconButton, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ClearIcon from '@mui/icons-material/Clear';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import { green } from '@mui/material/colors';

export default function Cart() {
    const state = useContext(GlobalState);
    const [token] = state.token;
    const [cart, setCart] = state.userAPI.cart;
    const [total, setTotal] = useState(0);

    // theme for the page
    const theme = createTheme();

    // get full total of the pending cart
    useEffect(() =>{
        const getTotal = () => {
            const total = cart.reduce((prev, item) =>{
                return prev + (item.price * item.quantity)
            }, 0)

            setTotal(total);
        }
        getTotal();

    }, [cart])

    // add product to the cart
    const addToCart = async (cart) => {
        await axios.patch('/user/addcart', {cart}, {headers: {Authorization: token}})
    }

    // increment total of a particular product
    const increment = (id) => {
        cart.forEach(item => {
            if(item._id === id){
                item.quantity += 1;
            }
        })
        setCart([...cart]);
        addToCart(cart);
    }

    // decrement total a particular product 
    const decrement = (id) => {
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1: item.quantity -= 1;
            }
        })
        setCart([...cart]);
        addToCart(cart);
    }

    // remove product from cart
    const removeProduct = (id) => {
        cart.forEach((item, index) => {
            if(item._id === id) {
                cart.splice(index, 1);
            }
        })
        setCart([...cart]);
        addToCart(cart);
    }

    // some styles for images in cart table
    const styles = {
        media: {
            height: 'auto',
            width: 'auto',
        }
    };

    
    // if cart is empty
    if(cart.length === 0) 
    return (
        
        <Container maxWidth="md" sx ={{marginTop: 8, pb: 4, }}>
            <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                <AddShoppingCartIcon sx={{ fontSize: 150, color: green[500] }} />
            </Box>
            <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                <Typography variant="h4" >
                    Your cart is empty, 
                </Typography>
                <Typography>
                    {`Add something to make me happy :)`}
                </Typography>
            </Box>
            <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                <Button variant='contained' color='success' size="small" sx={{ mt: 3, mb: 2 }}>
                    <Link style={{textDecoration: 'none', color: 'white'}} to="/">
                        Continue Shopping
                    </Link>
                </Button>
            </Box>
        </Container>
    )

    return ( 
        <ThemeProvider theme={theme}>
        
            <TableContainer component={Paper} sx ={{marginTop: 8, width: '80%', overflowX: "auto", margin: "auto"}} >
                <Table>

                    <TableHead>
                        <TableRow>
                            <TableCell>Item</TableCell>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Price</TableCell>
        
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="center">Amount</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {cart.map((product) => (
                            <TableRow key={product._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
    
                                <TableCell width ='30%'>
                                    <Card style={styles.media}>
                                        <CardMedia  component="img" image = {product.images.url} alt="" />                
                                    </Card>
                                    
                                </TableCell>
    
                                <TableCell width = '15%' align="center">{product.title}</TableCell>
                                <TableCell width = '10%' align="center">Rs: {product.price}</TableCell>
    
                                <TableCell align="right">
                                    <Stack direction="row" justifyContent ='flex-end' spacing ={1}>
                                        <Button variant='contained' color='success' size="small" onClick={() => increment(product._id)}>+</Button>
                                        <p>{product.quantity}</p>
                                        <Button variant='contained' color='success' size="small" onClick={() => decrement(product._id)}>-</Button>
                                    </Stack>
                                </TableCell>
    
                                <TableCell align="right">Rs: {product.price * product.quantity}</TableCell>

                                <TableCell align="center">
                                    <Link to="/Cart" style={{textDecoration: 'none'}} onClick={() => removeProduct(product._id)}>
                                        <Tooltip title="Remove item">
                                            <IconButton>
                                                <ClearIcon/>
                                            </IconButton>
                                        </Tooltip>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell><h3> Full Total Rs:{total}</h3></TableCell>
                                
                                <TableCell>
                                    <Link to ='/Checkout' style={{textDecoration: 'none'}}><Button variant='contained' color = 'success' size = 'small' >Proceed Checkout</Button></Link>
                                </TableCell>
                            </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            
        </ThemeProvider>
        )
    }
    
    // Still some confusions
    

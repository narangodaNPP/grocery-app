import React, {useContext, useState, useEffect} from 'react';
import {GlobalState} from '../../../GlobalState';
import {Card, CardActions, CardContent, CardMedia, Button, Container, Tooltip, Stack, Box, Paper, IconButton, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import {styled} from '@mui/material/styles';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ClearIcon from '@mui/icons-material/Clear';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import { green } from '@mui/material/colors';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function Cart() {
    const state = useContext(GlobalState);
    const [token] = state.token;
    const [cart, setCart] = state.userAPI.cart;
    const [total, setTotal] = useState(0);

    const theme = createTheme();

    useEffect(() =>{
        const getTotal = () => {
            const total = cart.reduce((prev, item) =>{
                return prev + (item.price * item.quantity)
            }, 0)

            setTotal(total);
        }
        getTotal();
    }, [cart])

    const addToCart = async () => {
        await axios.patch('/user/addcart', {cart}, {
            headers: {Authorization: token}
        })
    }

    const increment = (id) => {
        cart.forEach(item => {
            if(item._id === id){
                item.quantity += 1;
            }
        })
        setCart([...cart]);
        addToCart();
    }

    const decrement = (id) => {
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1: item.quantity -= 1;
            }
        })
        setCart([...cart]);
        addToCart();
    }

    const removeProduct = (id) => {
        cart.forEach((item, index) => {
            if(item._id === id) {
                cart.splice(index, 1);
            }
        })
        setCart([...cart]);
        addToCart();
    }
    const styles = 
    {

        media: {
            height: 'auto',
            width: 'auto',
        }
    };

    // const Item = styled(Paper)(({ theme }) => ({
    //     ...theme.typography.body2,
    //     padding: theme.spacing(1),
    //     textAlign: 'center',
    //     color: theme.palette.text.secondary,
    //   }));

    if(cart.length === 0) return (
        
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
                                        <CardMedia  component="img" image = {product.image.url} alt="" />                
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
    
    
    // <Stack>
    //     {cart.map(product => (
    //         <Item key = {product._id}>
    //             <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    //                 <CardContent sx={{ display: 'flex', flexDirection: 'row-reverse'}}>
    //                     <Link to="/Cart" style={{textDecoration: 'none'}} onClick={() => removeProduct(product._id)}><DeleteIcon/></Link>
    //                 </CardContent>
    //                 <CardMedia component="img" sx={{pt: '0',}} image = {product.image.url} alt="/" />
                    
    //                 <CardContent sx={{ flexGrow: 1 }}>
    //                     <Typography gutterBottom variant="h5" component="h2">
    //                         {product.title}
    //                     </Typography>
    //                     <Typography>
    //                         {product.price * product.quantity}
    //                     </Typography>
    //                 </CardContent>
    //                 <CardActions>
    //                     <Button variant='contained' color='success' size="small" onClick={() => increment(product._id)}>+</Button>
    //                     <Box size="small">{product.quantity}</Box>
    //                     <Button variant='contained' color='success' size="small" onClick={() => decrement(product._id)}>-</Button>
    //                 </CardActions>
    //             </Card>
    //         </Item>
    //     ))
    //     } 

    //     <Item>
    //         <h3>Total: Rs:{total}</h3>
    //         <Link to ='/checkout' style={{textDecoration: 'none'}}><Button variant='contained' color = 'success' size = 'small' >Checkout</Button></Link>
    //     </Item>
    // </Stack>
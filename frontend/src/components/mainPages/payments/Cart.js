import React, {useContext, useState, useEffect} from 'react';
import {GlobalState} from '../../../GlobalState';
import {Card, CardActions, CardContent, CardMedia, Button, Typography, Stack, Box, Paper} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {styled} from '@mui/material/styles';
import {Link} from 'react-router-dom';
import axios from 'axios'

export default function Cart() {
    const state = useContext(GlobalState);
    const [token] = state.token;
    const [cart, setCart] = state.userAPI.cart;
    const [total, setTotal] = useState(0);

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


    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    if(cart.length === 0) return <h4>Cart is empty</h4>
    return ( 
        <Stack>
            {cart.map(product => (
                <Item key = {product._id}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'row-reverse'}}>
                            <Link to="/Cart" style={{textDecoration: 'none'}} onClick={() => removeProduct(product._id)}><DeleteIcon/></Link>
                        </CardContent>
                        <CardMedia component="img" sx={{pt: '0',}} image = {product.image.url} alt="/" />
                        
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {product.title}
                            </Typography>
                            <Typography>
                                {product.price * product.quantity}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant='contained' color='success' size="small" onClick={() => increment(product._id)}>+</Button>
                            <Box size="small">{product.quantity}</Box>
                            <Button variant='contained' color='success' size="small" onClick={() => decrement(product._id)}>-</Button>
                        </CardActions>
                    </Card>
                </Item>
            ))
            } 

            <Item>
                <h3>Total: Rs:{total}</h3>
                <Link to ='/checkout' style={{textDecoration: 'none'}}><Button variant='contained' color = 'success' size = 'small' >Checkout</Button></Link>
            </Item>
        </Stack>
    )
}


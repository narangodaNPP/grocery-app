import React,{useContext} from 'react';
import {GlobalState} from '../../GlobalState';
import {Card, CardMedia, Button, Box, Paper, Stack, Divider, Typography} from '@mui/material';
import {Link} from 'react-router-dom';

export default function ProductItem({product, isAdmin, deleteProduct, handleCheck}) {
    const state = useContext(GlobalState);
    const addCart = state.userAPI.addCart;
    
    return (
        <Box sx ={{height: '100%', display: 'flex', flexDirection: 'column',}}>
            <Box sx={{p:1}} component={Paper} elevation ={5}>
                {
                    isAdmin && <input type="checkbox" checked = {product.checked} onChange={() => handleCheck(product._id)}/>
                }

                <Card component = {Paper} sx ={{marginTop: '10px', marginBottom: '10px',}}>
                    <CardMedia component="img" sx={{pt: '0',}} image = {product.images.url} alt="/" />
                </Card>
                <Stack direction="row" sx ={{justifyContent: 'space-evenly'}}>
                    <Box sx ={{display: 'flex', justifyContent: 'center', marginTop: 1,}}>
                        <Typography variant ='h6'>
                            {product.title}
                        </Typography>
                    </Box>
                    <Box sx ={{ display: 'flex', justifyContent: 'center', marginTop: 1}}>
                        <Typography variant ='subtitle1'>
                            Rs: {product.price}
                        </Typography>
                    </Box>
                </Stack>
            
                <Box sx ={{marginTop: '5px', marginBottom: '10px',}}>
                    
                    {
                        isAdmin ? <Box>
                                
                                    <Divider/>
                                    <Box sx ={{display: 'flex', justifyContent: 'space-around', marginTop: 0.5, marginBottom: 1, }}>
                                        <Button color="success" variant = 'outlined'>
                                            <Link style={{textDecoration: 'none'}} to={`/EditProduct/${product._id}`}>
                                                Edit
                                            </Link>
                                        </Button>
                                        <Button color="success" variant = 'outlined' onClick={() => deleteProduct(product._id, product.images.public_id)}>
                                            <Link style={{textDecoration: 'none'}} to='/'>
                                                Delete
                                            </Link>
                                        </Button>
                                    </Box> 
                                </Box>
                                : 
                                <Stack sx ={{justifyContent: 'space-between'}} direction='row'>
                                    Rs: {product.price}
                                    <Divider/>
                                    <Button variant='contained' color='success' size="small" onClick={() => addCart(product)}>
                                        Add
                                    </Button>
                                </Stack>
                    }
                </Box>
            
                
            </Box>

        </Box>
        
    )
}

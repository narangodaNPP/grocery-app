import React,{useContext} from 'react';
import {GlobalState} from '../../GlobalState';
import {Card, CardMedia, Button, Box, Paper, Stack} from '@mui/material';
import {Link} from 'react-router-dom';
import axios from 'axios';


export default function ProductItem({product, isAdmin, deleteProduct, handleCheck}) {
    const state = useContext(GlobalState);
    const addCart = state.userAPI.addCart;
    
    return (
        <Box sx ={{height: '100%', display: 'flex', flexDirection: 'column'}}>
            {
                isAdmin && <input type="checkbox" checked = {product.checked} onChange={() => handleCheck(product._id)}/>
            }
            <Card component = {Paper} sx ={{marginTop: '10px', marginBottom: '10px'}} elevation = {12}>
                <CardMedia component="img" sx={{pt: '0',}} image = {product.images.url} alt="/" />
            </Card>
            <Box sx ={{display: 'flex', justifyContent: 'center', marginTop: '10px', marginBottom: '10px', border: '1px solid blue'}}>
                {product.title}
            </Box>
           
            <Box sx ={{marginTop: '5px', marginBottom: '10px', border: '1px solid blue'}}>
                
                {
                    isAdmin ? <Box sx ={{border: '1px solid blue'}}>
                                <Box sx ={{ display: 'flex', justifyContent: 'center', border: '1px solid blue', marginTop: 1}}>
                                    Rs: {product.price}
                                </Box>
                                <Box sx ={{display: 'flex', border: '1px solid blue', justifyContent: 'space-around', marginTop: 0.5, marginBottom: 1, }}>
                                    <Button color="inherit" variant = 'outlined'>
                                        <Link style={{textDecoration: 'none'}} to={`/EditProduct/${product._id}`}>
                                            Edit
                                        </Link>
                                    </Button>
                                    <Button color="inherit" variant = 'outlined' onClick={() => deleteProduct(product._id, product.images.public_id)}>
                                        <Link style={{textDecoration: 'none'}} to='/'>
                                            Delete
                                        </Link>
                                    </Button>
                                </Box> 
                            </Box>
                            : 
                            <Stack sx ={{justifyContent: 'space-between'}} direction='row'>
                                Rs: {product.price}
                                <Button variant='contained' color='success' size="small" onClick={() => addCart(product)}>
                                    Add
                                </Button>
                            </Stack>
                }
                
            </Box>

        </Box>
        
    )
}

// <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//             {
//                 isAdmin && <input type="checkbox" checked = {product.checked} onClick={handleCheck}/>
//             }
//             <CardMedia component="img" sx={{pt: '0',}} image = {product.image.url} alt="/"/>
//             <CardContent sx={{ flexGrow: 1 }}>
//                 <Typography gutterBottom variant="h5" component="h2">
//                     {product.title}
//                 </Typography>
//                 <Typography>
//                     Rs: {product.price}
//                 </Typography>
//             </CardContent>
//             <CardActions>
//                 <Link to='/' style={{textDecoration: 'none'}}>
//                     {
//                         isAdmin ? <Box><Button color="inherit"><Link style={{textDecoration: 'none'}} to='/EditProduct'>Edit</Link></Button><Button color="inherit" onClick={deleteProduct}><Link style={{textDecoration: 'none'}} to='/'>Delete</Link></Button></Box> : <Button variant='contained' color='success' size="small" onClick={() => addCart(product)}>Add</Button>
//                     }
//                 </Link>
//             </CardActions>
//         </Card>
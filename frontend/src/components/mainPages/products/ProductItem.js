import React,{useContext} from 'react';
import {GlobalState} from '../../../GlobalState';
import {Card, CardActions, CardContent, CardMedia, Typography, Button, Box, Paper, Stack} from '@mui/material';
import {Link} from 'react-router-dom';
import axios from 'axios'


export default function ProductItem({product, isAdmin, token, callback, setCallback}) {
    const state = useContext(GlobalState);
    const addCart = state.userAPI.addCart;
    const [products, setProducts] = state.productAPI.products;

    const deleteProduct = async () => {
        console.log(product.id);
        try {
            const removeImg = axios.post('/api/remove', {public_id: product.images.public_id}, {
                headers: {Authorization: token}
            });

            const deleteProduct = axios.delete(`/api/products/${product._id}`, {
                headers: {Authorization: token}
            });

            await removeImg;
            await deleteProduct;
            setCallback(!callback);

        } catch (err) {
            alert(err.response.data.msg);
        }
    }

    const handleCheck = (id) => {
        // console.log(product.checked)
        products.forEach(product => {
            if(product._id === id) product.checked = ! product.checked;
        })
        setProducts([...products])
    }
    return (
        <Box sx ={{height: '100%', display: 'flex', flexDirection: 'column'}}>
            {
                isAdmin && <input type="checkbox" checked = {product.checked} onClick={handleCheck}/>
            }
            <Card component = {Paper} sx ={{marginTop: '10px', marginBottom: '10px'}} elevation = {12}>
                <CardMedia component="img" sx={{pt: '0',}} image = {product.image.url} alt="/" />
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
                                        <Link style={{textDecoration: 'none'}} to='/EditProduct'>
                                            Edit
                                        </Link>
                                    </Button>
                                    <Button color="inherit" variant = 'outlined' onClick={deleteProduct}>
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
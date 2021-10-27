import React,{useContext} from 'react';
import {GlobalState} from '../../../GlobalState';
import {Card, CardActions, CardContent, CardMedia, Typography, Button, Box} from '@mui/material';
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
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {
                isAdmin && <input type="checkbox" checked = {product.checked} onClick={handleCheck}/>
            }
            <CardMedia component="img" sx={{pt: '0',}} image = {product.image.url} alt="/"/>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                    {product.title}
                </Typography>
                <Typography>
                    {product.price}
                </Typography>
            </CardContent>
            <CardActions>
                <Link to='/' style={{textDecoration: 'none'}}>
                    {
                        isAdmin ? <Box><Button color="inherit"><Link style={{textDecoration: 'none'}} to='/EditProduct'>Edit</Link></Button><Button color="inherit" onClick={deleteProduct}><Link style={{textDecoration: 'none'}} to='/'>Delete</Link></Button></Box> : <Button variant='contained' color='success' size="small" onClick={() => addCart(product)}>Add</Button>
                    }
                </Link>
            </CardActions>
        </Card>
    )
}


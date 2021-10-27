import React, {useState, useContext, useEffect} from 'react';
import {GlobalState} from '../../GlobalState';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProductItem from './utils/ProductItem';
import Loading from './utils/Load}ing';
import axios from 'axios';


export default function Product() {
    const theme = createTheme();
    const state = useContext(GlobalState);
    const [products, setProducts] = state.productAPI.products;
    const [isAdmin] = state.userAPI.isAdmin;
    const [token] = state.token;
    const [callback, setCallback] = state.productAPI.callback;
    const [isCheck, setIsCheck] = useState(false);

    const checkAll = () => {
      products.forEach(product => {
        product.checked = !isCheck;
      })
      setProducts([...products]);
      setIsCheck(!isCheck);
    }

    const deleteAll = () => {
      products.forEach(product => {
        if(product.checked) deleteProduct(product._id, product.images.public_id);
      })
    }

    return (
        <ThemeProvider theme={theme}>
        <main>
            <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6,}}>

              <Container maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                  advertisement
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                  area reseved for advertisement
                </Typography>
              </Container>
            </Box>

            <Container sx={{ py: 2 }} maxWidth="xl">
              {
                isAdmin && 
                <div>
                  <span>Select All</span>
                  <input type="checkbox" checked={isCheck} onChange={checkAll}/>
                  <Button onClick={deleteAll}>Delete All</Button>
                </div>
              }

              <Grid container spacing={4}>
                {products.map(product => (
                  <Grid item key={product._id}  xs={12} sm={6} md={3}>
                    <ProductItem product = {product} isAdmin = {isAdmin} token = {token} setProduct = {setProducts} callback = {callback} setCallback ={setCallback}/>
                  </Grid>
                ))}
              </Grid>

            </Container>
          </main>
          {products.length === 0 && <Loading/>}
        </ThemeProvider>
        
    );
}


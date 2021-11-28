import React, { useContext} from 'react';
import {GlobalState} from '../../GlobalState';
import {Button, Grid,  Container, Box} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProductItem from './ProductItem';
import axios from 'axios';

export default function Product() {

    const state = useContext(GlobalState);
    const [products, setProducts] = state.productAPI.products;
    const [isAdmin] = state.userAPI.isAdmin;
    const [token] = state.token;
    const [callback, setCallback] = state.productAPI.callback;

    const theme = createTheme();

    const handleCheck = (id) =>{
      products.forEach(product => {
          if(product._id === id) product.checked = !product.checked
      })
      setProducts([...products])
    }

    const deleteProduct = async(id, public_id) => {
      try {
          const removeImage = axios.post('/api/remove', {public_id}, {headers: {Authorization: token}})
          
          const deleteProduct = axios.delete(`/api/products/${id}`, {headers: {Authorization: token}})

          await removeImage
          await deleteProduct
          setCallback(!callback)
      } catch (err) {
          alert(err.response.data.msg)
      }
  }

    const deleteAll = () => {
      products.forEach(product => {
        if(product.checked) deleteProduct(product._id, product.images.public_id);
      })
    }

    return (
        <ThemeProvider theme={theme}>  
          <Container sx ={{marginTop: 8, pb: 4, width: '90%',}}>
            {
              isAdmin && 
              <Box sx ={{m:2}}>
                <Button color ='success' onClick={deleteAll}>Delete All</Button>
              </Box>
            }
    
            <Grid container spacing={4}>
              {products.map(product => (
                <Grid item key={product._id}  xs={12} sm={6} md={4}>
                  <ProductItem product = {product} isAdmin = {isAdmin} token = {token} deleteProduct={deleteProduct} handleCheck={handleCheck} />
                </Grid>
              ))}
            </Grid>
          </Container>

        </ThemeProvider>
        
    );
}

import React, {useState, useContext} from 'react';
import {GlobalState} from '../../GlobalState';
import {Button, Grid, Stack, Box, Typography, Container, Paper} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProductItem from './ProductItem';
import Loading from '../utils/Loading';
import axios from 'axios';

export default function Product() {

    const state = useContext(GlobalState);
    const [products, setProducts] = state.productAPI.products;
    const [isAdmin] = state.userAPI.isAdmin;
    const [token] = state.token;
    const [callback, setCallback] = state.productAPI.callback;
    const [isCheck, setIsCheck] = useState(false);

    const theme = createTheme();

    const checkAll = () => {
      products.forEach(product => {
        product.checked = !isCheck;
      })
      setProducts([...products]);
      setIsCheck(!isCheck);
    }

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
          <Container sx ={{marginTop: 8, pb: 4, border: '1px solid blue', width: '100%'}}>
            {/*Advertisement carousal*/}
            
          </Container>
          
          <Container sx ={{marginTop: 8, pb: 4, width: '90%', border: '1px solid blue'}}>
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
                <Grid item key={product._id}  xs={12} sm={6} md={4}>
                  <ProductItem product = {product} isAdmin = {isAdmin} token = {token} deleteProduct={deleteProduct} handleCheck={handleCheck} />
                </Grid>
              ))}
            </Grid>
          </Container>

        </ThemeProvider>
        
    );
}

// <main>
//             <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6,}}>

//               <Container maxWidth="sm">
//                 <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
//                   advertisement
//                 </Typography>
//                 <Typography variant="h5" align="center" color="text.secondary" paragraph>
//                   area reseved for advertisement
//                 </Typography>
//               </Container>
//             </Box>

//             <Container sx={{ py: 2 }} maxWidth="xl">
//               {
//                 isAdmin && 
//                 <div>
//                   <span>Select All</span>
//                   <input type="checkbox" checked={isCheck} onChange={checkAll}/>
//                   {/*<Button onClick={deleteAll}>Delete All</Button>*/}
//                 </div>
//               }

//               <Grid container spacing={4}>
//                 {products.map(product => (
//                   <Grid item key={product._id}  xs={12} sm={6} md={3}>
//                     <ProductItem product = {product} isAdmin = {isAdmin} token = {token} setProduct = {setProducts} callback = {callback} setCallback ={setCallback}/>
//                   </Grid>
//                 ))}
//               </Grid>

//             </Container>
//           </main>
//           {products.length === 0 && <Loading/>}


// <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
//               advertisement
//             </Typography>
//             <Typography variant="h5" align="center" color="text.secondary" paragraph>
//               area reseved for advertisement
//             </Typography>
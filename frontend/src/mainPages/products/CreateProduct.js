import React, {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import {GlobalState} from '../../GlobalState';
import {useHistory, useParams} from 'react-router-dom';
import {Box, Typography, Button, Container, Stack, Card, CardMedia, TextField, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {grey} from '@mui/material/colors';

const initialState = { product_id: '', title: '', price: 0, category: '', _id: '',}

export default function CreateProduct() {
    const state = useContext(GlobalState);
    const [product, setProduct] = useState(initialState);
    const [categories] = state.categoriesAPI.categories;
    const [images, setImages] = useState(false);
    const [isAdmin] = state.userAPI.isAdmin;
    const [token] = state.token;
    const history = useHistory();
    const params = useParams();
    const [products] = state.productAPI.products;
    const [onEdit, setOnEdit] = useState(false);
    const [callback, setCallback] = state.productAPI.callback;

    const theme = createTheme();

    useEffect(() => {
        if(params.id){
            setOnEdit(true);
            products.forEach(product =>{
                if(product.id === params.id) {
                    setProduct(product);
                    setImages(product.images);
                }
            })

        }else{
            setOnEdit(false);
            setProduct(initialState);
            setImages(false);
        }
           
    }, [params.id, products])

    
    const handleUpload = async (e) => {
        e.preventDefault();
        try{
            if(!isAdmin) return alert("Not Admin");
            const file = e.target.files[0];
            
            if(!file) return alert("File not exists");

            if(file.size > 1024*1024){
                return alert("Size too large");
            }

            if(file.type !== "image/jepg" && file.type !== "image/png"){
                return alert("type not acceptable");
            }

            let formData = new FormData();
            formData.append('file', file);

            const res = await axios.post('/api/upload', formData, {headers: {'content-type': `multipart/form-data`, Authorization: token}})
            setImages(res.data)
        }
        catch(err){
            alert(err.response.data.msg)
        }
    
    }

    const handleRemove = async (e) => {
        e.preventDefault();
        if(!isAdmin) return alert("Not admin");
        await axios.post('/api/remove', {public_id: images.public_id}, {headers: {Authorization: token}});
        setImages(false);
    }

    const onChangeInput = async (e) => {
        const {name, value} = e.target;
        setProduct({...product, [name]: value})

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(!isAdmin) return alert("Not Admin");
            if(!images) return alert("No image");

            if(onEdit){
                await axios.put(`/api/products/${product._id}`, {...product, images}, { headers: {Authorization: token}})
            }else{
                await axios.post('/api/products', {...product, images}, { headers: {Authorization: token}})
            }
            setCallback(!callback);
            // setImages(false);
            // setProduct(initialState);
            history.push("/")

        } catch (err) {
            alert(err.response.data.msg);
        }
    }


    return (
        <ThemeProvider theme={theme}>

            <Container sx ={{marginTop: 8, pb: 4, width: '80%', border: '1px solid blue'}}>
                <Box component = 'div' sx ={{display: 'flex', justifyContent: 'center', flexDirection: 'row', p: 1, m: 1,}}>
                    <Typography component="h1" variant="h5" sx ={{justifyContent: 'center'}}>
                        Create Product
                    </Typography>
                </Box>

                <Box component = 'div' sx ={{display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row', p: 1, m: 1,}}>
                    {/* product image upload section */}
                    <Box sx = {{ height: '100%', m: 2,}}>
                        {/* 4to uploading box */}
                        <Box sx ={{ m: 2,}}>
                            {
                                images ?<Card> 
                                            <CardMedia component="img" image ={images.url} alt=""/>
                                        </Card>
                                        : 
                                        <Card sx ={{width: '360px', height: '270px', m: 3, backgroundColor: grey[300] }}/> 
                                            
                                        
                            }
                        </Box>

                        {/* uploading button, change button and remove button */}
                        <Box sx ={{display: 'flex', m: 2, justifyContent: 'center', }}>
                            {
                                images ?<Stack direction = 'row' spacing ={2}>
                                            <Button variant="outlined" component="label" color ='success'>
                                                Change
                                                <input type="file" name="file" hidden onChange = {handleUpload}/>
                                            </Button>
                                            <Button variant="outlined" onClick = {handleRemove} color ='success'>
                                                Remove
                                            </Button>
                                        </Stack>
                                        :
                                        
                                        <Button variant="outlined" component="label" color = 'success'>
                                            Upload
                                            <input type="file" name="file" hidden onChange = {handleUpload}/>
                                        </Button>
                                            

                            }
                        </Box>

                    </Box>


                    {/* product detail form section */}
                    <Box component = 'form' sx={{m:2, p:2, flexGrow: 1,}} onSubmit={handleSubmit}>
                       
                        <Box sx = {{m:2, justifyContent: 'center', display: 'flex'}}>
                            <TextField type="text" name="product_id" id="product_id" placeholder="Product ID" required value={product.product_id} onChange={onChangeInput} disabled={onEdit} label = "Product ID"/>
                        </Box>

                        <Box sx = {{m:2, justifyContent: 'center', display: 'flex'}}>
                            <TextField type="text" name="title" id="title" required value={product.title} onChange={onChangeInput} label ="Title"/>
                        </Box>
                    
                        <Box sx = {{m:2, justifyContent: 'center', display: 'flex'}}>
                            <TextField type="number" name="price" id="price" required value={product.price} onChange={onChangeInput} label = "Price"/>
                        </Box> 
                    
                        <Box sx = {{m:2, justifyContent: 'center', display: 'flex'}}>

                            <FormControl sx={{ m: 1, minWidth: 200 }}>
                                <InputLabel id="category">Select Category</InputLabel>
                                <Select labelId="category" id="category" name="category" value={product.category} onChange={onChangeInput} autoWidth label ='Select Category'>
                                    {
                                        categories.map(category => (
                                            <MenuItem value={category._id} key={category._id}>
                                                {category.name}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>

                        </Box>

                        <Stack direction = 'row' mb = {3} sx ={{justifyContent: 'center'}}>
                            <Button type="submit" color = 'success' variant="contained" sx={{ mt: 3, mb: 2, width: '50%' }} >
                                {onEdit? "Update" : "Create"}
                            </Button>
                        </Stack>

                    </Box>

                </Box>
            </Container>
            
        </ThemeProvider>
    )
}

import React, {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import {GlobalState} from '../../../GlobalState';
import {useHistory, useParams} from 'react-router-dom';
import {Box, Typography, TextField, Button, Container, Stack, Card, CardMedia, IconButton, Tooltip} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {grey} from '@mui/material/colors';

const initialState = {
    product_id: '',
    title: '',
    price: 0,
    category: '',
    _id: '',
}

export default function CreateProduct() {
    const state = useContext(GlobalState);
    const [product, setProduct] = useState(initialState);
    const [categories] = state.categoriesAPI.categories;
    const [images, setImages] = useState(false);
    const [isAdmin] = state.userAPI.isAdmin;
    const [token] = state.token;
    const history = useHistory();
    const params = useParams();
    const [products, setProducts] = state.productAPI.products;
    const [onEdit, setOnEdit] = useState(false);
    const [callback, setCallback] = state.productAPI.callback;

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

    const theme = createTheme();

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

    const handleChangeInput = async (e) => {
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
                <Box component = 'div' sx ={{display: 'flex', justifyContent: 'center', flexDirection: 'row', p: 1, m: 1,  border: '1px solid blue'}}>
                    <Typography component="h1" variant="h5" sx ={{justifyContent: 'center'}}>
                        Create Product
                    </Typography>
                </Box>

                <Box component = 'div' sx ={{display: 'flex', justifyContent: 'space-around', flexDirection: 'row', p: 1, m: 1,  border: '1px solid blue'}}>
                    {/* product image */}
                    <Box sx = {{ height: '100%', width: '50%', m: 2,}}>
                        <Box sx ={{ m: 2,}}>
                            {
                                images ?<Card> 
                                            <CardMedia component="img" image ={images.url} alt=""/>
                                        </Card>
                                        : 
                                        <Card sx ={{width: '360px', height: '270px', m: 3, backgroundColor: grey[300] }}/> 
                                            
                                        
                            }
                        </Box>
                        <Box sx ={{display: 'flex', m: 2, justifyContent: 'center', }}>
                            {
                                images ?<Stack direction = 'row' spacing ={2}>
                                            <Button variant="outlined" component="label" color ='success'>
                                                Change
                                                <input type="file" hidden onChange = {handleUpload}/>
                                            </Button>
                                            <Button variant="outlined" onClick = {handleRemove} color ='success'>
                                                Remove
                                            </Button>
                                        </Stack>
                                        :
                                        <Button variant="outlined" component="label" color = 'success'>
                                            Upload
                                            <input type="file" hidden onChange = {handleUpload}/>
                                        </Button>

                            }
                        </Box>
                        
                    </Box>

                    {/* product detail editing section */}
                    <Box component = 'form' sx={{m:2}}>
                        <Stack direction = 'row' spacing = {2} mb = {3} mt ={3}>
                            <Box width = '30%'>
                                <label htmlFor="product_id">P. ID</label>
                            </Box>
                            <Box>
                                <input type="text" name="product_id" id="product_id" required value={product.product_id} onChange={handleChangeInput} disabled={product._id}/>
                            </Box>
                        </Stack>
                        <Stack direction = 'row' spacing = {2} mb ={3}>
                            <Box width = '30%'>
                                <label htmlFor="title">Title</label>
                            </Box>
                            <Box>
                                <input type="text" name="title" id="title" required value={product.title} onChange={handleChangeInput}/>
                            </Box>
                        </Stack>
                        <Stack direction = 'row' spacing = {2} mb = {3}>
                            <Box width = '30%'>
                                <label htmlFor="price">Price</label>
                            </Box>
                            <Box>
                                <input type="number" name="price" id="price" required value={product.price} onChange={handleChangeInput}/>
                            </Box> 
                        </Stack>
                        <Stack direction = 'row' spacing = {2} mb = {3}>
                            <Box width = '30%'>
                                <label htmlFor="categories">Categories: </label>
                            </Box>
                            <Box>
                                <select name="category" value={product.category} >
                                    <option value="">Select category</option>
                                    {
                                        categories.map(category => (
                                            <option value={category._id} key={category._id}>
                                                {category.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            
                            </Box>
                            
                        </Stack>

                        <Stack direction = 'row' spacing = {2} mb = {3}>
                            <Button type="submit" color = 'success' variant="contained" sx={{ mt: 3, mb: 2 }} fullWidth onClick ={handleSubmit}>
                                Create
                            </Button>
                        </Stack>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}


// <div>
//             <div className="upload">
//                 <input type="file" name="file" id="file_up" onChange = {handleUpload}/>
//                 {
//                     <div id="file_img">
//                         <img src={images ? images.url : ''} alt=""/>
//                         <span onClick={handleRemove}>X</span>
//                     </div>
//                 }
                
//             </div>

//             <form onSubmit={handleSubmit}>
//                 <div className="row">
//                     <label htmlFor="product_id">Product ID</label>
//                     <input type="text" name="product_id" id="product_id" required
//                     value={product.product_id} onChange={handleChangeInput} disabled={product._id}/>
//                 </div>

//                 <div className="row">
//                     <label htmlFor="title">Title</label>
//                     <input type="text" name="title" id="title" required
//                     value={product.title} onChange={handleChangeInput}/>
//                 </div>

//                 <div className="row">
//                     <label htmlFor="price">Price</label>
//                     <input type="number" name="price" id="price" required
//                     value={product.price} onChange={handleChangeInput}/>
//                 </div>

//                 <div className="row">
//                     <label htmlFor="categories">Categories: </label>
//                     <select name="category" value={product.category} >
//                         <option value="">Select category</option>
//                         {
//                             categories.map(category => (
//                                 <option value={category._id} key={category._id}>
//                                     {category.name}
//                                 </option>
//                             ))
//                         }
//                     </select>
//                 </div>

//                 <button type="submit">{onEdit? "Update" : "Create"}</button>
//             </form>
//         </div>




// {images ? 
//     <Box sx ={{display: 'flex', flexDirection: 'row-reverse'}}>
//     <Tooltip title="Remove Image">
//     <IconButton onClick={handleRemove} >
//     <HighlightOffIcon/>
//     </IconButton>
//     </Tooltip>    
//     </Box>
//     :
//     ''
// }                    
// <Card> 
//     <CardMedia component="img" image ={images ? images.url : ''} alt=""/>
    
// </Card>
// <Button variant="contained" component="label">
//     Upload
//     <input type="file" hidden onChange = {handleUpload}/>
// </Button>
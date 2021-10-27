import React, {useState, useContext} from 'react';
import {GlobalState} from '../../GlobalState';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Link} from 'react-router-dom'
import {Box, Typography, Grid, TextField, Button, Container, Stack, styled, Paper, alertClasses} from '@mui/material';
import axios from 'axios';


function Categories() {
    const state = useContext(GlobalState);
    const [categories] = state.categoriesAPI.categories
    const [category, setCategory] = useState('')
    const [token] = state.token;
    const theme = createTheme();
    const [callback, setCallback] = state.categoriesAPI.callback;
    const [id, setId] = useState('');
    const [onEdit, setOnEdit] = useState(false);

    const createCategory = async (e) => {
        e.preventDefault();
        try {
            if(onEdit){
                const res = await axios.put(`/api/category/${id}`, {name: category}, {headers: {Authorization: token}});
                alert(res.data.msg);
            }else{
                const res = await axios.post('/api/category', {name: category}, {headers: {Authorization: token}});
                alert(res.data.msg);
            }
            setOnEdit(false);
            setCategory('');
            setCallback(!callback);

        } catch (err) {
            alert(err.response.data.msg);
        }
    }

    const editCategory = async (id, name) => {
        setId(id);
        setCategory(name);
        setOnEdit(true);
    }

    const deleteCategory = async (id) => {
        try {
            const res = await axios.delete(`/api/category/${id}`, { headers: {Authorization: token}});
            alert(res.data.message);
            setCallback(!callback);
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main"maxWidth="xs" sx ={{marginTop: 8, flexDirection: 'row', pb: 4, border: '1px solid blue'}}>

                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    
                    <Typography component="h1" variant="h5">
                        Categories
                    </Typography>

                    <Box component="form" sx={{ mt: 1 }} onSubmit = {createCategory}>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                               <TextField id="category" name="category" type='text' onChange = {e => setCategory(e.target.value)}/>
                            </Grid>
                        </Grid>  
                         
                        <Button type="submit" color="success" variant="contained" sx={{ mt: 3, mb: 2 }} fullWidth>
                            {onEdit ? "Update" : "Create"}
                        </Button>
                    </Box>
                </Box>

                <Box sx={{ marginTop: 8, display: 'flex', alignItems: 'center'}}>
                
                    <Grid container sx={{ mt: 1 }}>
                        {
                            categories.map(category => (
                                <Grid item xs={12} key = {category._id} sx={{display: 'flex', align: 'flex-start'}}>
                                    
                                    <p>{category.name}</p>
                                
                                    <Button onClick = {() => editCategory(category._id, category.name)}>Edit</Button> 
                                    <Button onClick = {() => deleteCategory(category._id)}>Delete</Button>  
                                    
    
                                   
                                </Grid>
                            ))
                        }
                    </Grid>

                </Box>

            </Container>
        </ThemeProvider>

        
    )
}

export default Categories

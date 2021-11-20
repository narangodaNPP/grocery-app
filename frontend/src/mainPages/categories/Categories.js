import React, {useState, useContext} from 'react';
import {GlobalState} from '../../GlobalState';
import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Button, Container, Stack, Divider} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default function Categories() {
    const state = useContext(GlobalState);
    const [categories] = state.categoriesAPI.categories;
    const [category, setCategory] = useState('');
    const [token] = state.token;
    const [callback, setCallback] = state.categoriesAPI.callback;
    const [id, setId] = useState('');
    const [onEdit, setOnEdit] = useState(false);

    const theme = createTheme();

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
            alert(res.data.msg);
            setCallback(!callback);
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <ThemeProvider theme={theme}>

            <Container sx ={{marginTop: 8, pb: 4, width: '80%', border: '1px solid blue'}}>
                {/* Heading */}
                <Box component = 'div' sx ={{display: 'flex', justifyContent: 'center', flexDirection: 'row', p: 1, m: 1}}>
                    <Typography component="h1" variant="h5" sx ={{justifyContent: 'center'}}>
                        Categories
                    </Typography>
                </Box>

                {/* Category editor section */}
                <Box component = 'div' sx ={{display: 'flex', flexDirection: 'row', p: 1, m: 1, justifyContent: 'space-around',}}>
                    <Box sx ={{display: 'flex', flexDirection: 'row', p: 1, m: 1, border: '1px solid blue', width: '75%', justifyContent: 'center',}}>
                        <Box component="form" sx={{ mt: 1, display: 'flex', flexDirection: 'column' }} onSubmit = {createCategory}>
                            
                            <TextField id="category" name="category" type='text' onChange = {e => setCategory(e.target.value)}/>
                             
                            <Button type="submit" color="success" variant="contained" sx={{ mt: 3, mb: 2 }}>{onEdit ? "Update" : "Create"}</Button>
                        </Box>
                    </Box>

                    {/* Category list vies */}
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 300 }} aria-label="simple table">
                        
                            <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    
                                    <TableCell component="th" scope="row">
                                        {category.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button variant="outlined" color = 'success' size="small" onClick = {() => editCategory(category._id, category.name)}>
                                            Edit
                                        </Button>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button variant="outlined" color = 'success' size="small" onClick = {() => deleteCategory(category._id)}>
                                            Delete
                                        </Button> 
                                    </TableCell>
                                
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                
            </Container>
        </ThemeProvider>
    )
}




// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

// export default function BasicTable() {
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Category</TableCell>
//             <TableCell align="right"></TableCell>
//             <TableCell align="right"></TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {categories.map((category) => (
//             <TableRow key={category._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//               <TableCell component="th" scope="row">
//                 {category.name}
//               </TableCell>
//               <TableCell align="right">
//                 <Button variant="outlined" color = 'success' size="small" onClick = {() => editCategory(category._id, category.name)}>
//                     Edit
//                 </Button>
//               </TableCell>
//               <TableCell align="right">
//                 <Button variant="outlined" color = 'success' size="small" onClick = {() => deleteCategory(category._id)}>
//                     Delete
//                 </Button> 
//               </TableCell>
              
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }


// categories.map(category => (
//     <>
//         <Stack direction="row" spacing={2} mb = '5px' sx ={{justifyContent: 'space-between',}}  key = {category._id}>
//             <p>{category.name}</p>
//             <Button variant="outlined" color = 'success' size="small" onClick = {() => editCategory(category._id, category.name)}>Edit</Button> 
//             <Button variant="outlined" color = 'success' size="small" onClick = {() => deleteCategory(category._id)}>Delete</Button>  
//         </Stack>
//         <Divider sx = {{marginTop: 3, marginBottom: 3}}/>
//     </>
// ))

// <Box sx ={{display: 'flex', flexDirection: 'row', p: 1, m: 1}}>
//                         <Box sx ={{display: 'flex', flexDirection: 'column', }}>
//                             {
//                                 categories.map(category => (
//                                     <>
//                                         <Stack direction="row" spacing={2} mb = '5px' sx ={{justifyContent: 'space-between',}}  key = {category._id}>
//                                             <p>{category.name}</p>
//                                             <Button variant="outlined" color = 'success' size="small" onClick = {() => editCategory(category._id, category.name)}>Edit</Button> 
//                                             <Button variant="outlined" color = 'success' size="small" onClick = {() => deleteCategory(category._id)}>Delete</Button>  
//                                         </Stack>
//                                         <Divider sx = {{marginTop: 3, marginBottom: 3}}/>
//                                     </>
//                                 ))
//                             }
//                         </Box>
//                     </Box>
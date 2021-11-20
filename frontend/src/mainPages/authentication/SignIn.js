import React, {useState} from 'react';
import {Avatar, Button, TextField, Grid, Box, Container, Typography, Paper} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link} from 'react-router-dom';
import axios from 'axios';

const theme = createTheme();

export default function SignIn() {

    const [user, setUser] = useState({
        email: '', password: ''
    })

    const onChangeInput = (e) => {
        const {name, value} = e.target; 
        setUser({...user, [name]: value});
    }

    const signinSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('/user/login', {...user})
            localStorage.setItem('firstLogin', true);
            // localStorage.setItem('accessToken', res.data.accesstoken)
            window.location.href = '/';
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="xs" sx ={{marginTop: 8, pb: 4, border: '1px solid blue'}}>
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                    
                    <Avatar sx={{ m: 1,}}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx ={{ m: 1}}>
                        Sign in
                    </Typography>

                    <Box component="form" onSubmit={signinSubmit} sx={{ mt: 1 }}>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField id="email" name="email" type='email' value = {user.email} placeholder="Email Address" onChange = {onChangeInput}  fullWidth required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField id="password" name="password" type="password" value = {user.password}  placeholder = "Password" onChange = {onChangeInput}  fullWidth required/>
                            </Grid>
                        </Grid>  
                         
                        <Button type="submit" color="success" variant="contained" sx={{ mt: 3, mb: 2 }} fullWidth>
                            Sign In
                        </Button>

                        <Grid container>
                            <Grid item>
                                <Link to="/SignUp" style={{textDecoration: 'none'}} variant="body2">
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>

                    </Box>

                </Box>
            </Container>
        </ThemeProvider>
    );
}


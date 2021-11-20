import React, {useState} from 'react';
import {Avatar, Button, TextField, Grid, Box, Typography, Container} from '@mui/material';
import {Link} from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const theme = createTheme();

export default function SignUp() {
    const [user, setUser] = useState({
        first_name: '', last_name: '', email: '', password: ''
    })

    const onChangeInput = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
    }

    const signupSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/user/register', {...user});
            localStorage.setItem('firstLogin', true);
            window.location.href ="/"
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <ThemeProvider theme={theme}>

            <Container component="main" maxWidth="xs"  sx ={{marginTop: 8, pb: 4, border: '1px solid blue'}}>
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    
                    <Avatar sx={{ m: 1,}}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx ={{ m: 1,}}>
                        Sign up
                    </Typography>

                    <Box component="form" onSubmit={signupSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField id="first_name" name="first_name" type="text" placeholder="First Name" value = {user.first_name} onChange={onChangeInput} required fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="last_name" name="last_name" type="text" placeholder="Last Name" value = {user.last_name} onChange={onChangeInput} required fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField id="email" name="email" type="email" placeholder="Email Address" value = {user.email} onChange={onChangeInput} required fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField id="password" name="password" type="password" placeholder="Password" value = {user.password} onChange={onChangeInput} required fullWidth/>
                            </Grid>
                        </Grid>
                        <Button type="submit" color = 'success' variant="contained" sx={{ mt: 3, mb: 2 }} fullWidth>
                            Create Account
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to = "/SignIn" variant="body2" style = {{textDecoration: 'none'}}>
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>

                </Box>
            </Container>

        </ThemeProvider>
    );
}


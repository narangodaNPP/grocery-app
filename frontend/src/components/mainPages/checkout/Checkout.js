import React from 'react';
import {Grid, Typography, TextField, FormControlLabel, Checkbox, Box, Container, Button, Radio, FormControl, FormLabel, RadioGroup} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default function Checkout() {

    const theme = createTheme();

    // const onChangeInput = e => {
    //     const {name, value} = e.target;
    //     setUser({...user, [name]: value});
    // }

    const checkoutSubmit = async e => {
        e.preventDefault();
        try {
            // await axios.post('/user/register', {...user});
            // localStorage.setItem('firstLogin', true);
            window.location.href ="/ReviewOrder"
        } catch (err) {
            alert(err.response.data.msg)
        }
    }


    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="sm" sx ={{marginTop: 8, pb: 4, border: '1px solid blue'}}>
                <Box sx={{ marginTop: 4, marginBottom: 4, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                    <Box sx ={{ m: 2}}>
                        <Typography component="h1" variant="h5">Checkout</Typography>
                    </Box>
                    <Box component= 'form' onSubmit={checkoutSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TextField required id="firstName" name="firstName" label="First name" fullWidth variant="standard"/>
                            </Grid>
                            <Grid item xs={6} >
                                <TextField required id="lastName" name="lastName" label="Last name" fullWidth variant="standard"/>
                            </Grid>
                            <Grid item xs={6} >
                                <TextField required id="contactNo" name="contactNo" label="Contact No:" fullWidth variant="standard" />
                            </Grid>
                            <Grid item xs={6} >
                                <TextField required id="houseNo" name="houseNo" label="House No:" fullWidth  variant="standard"/>
                            </Grid>
                            <Grid item xs={6} >
                                <TextField required id="street" name="street" label="Street" fullWidth variant="standard"/>
                            </Grid>
                            <Grid item xs={6} >
                                <TextField required id="city" name="city" label="City" fullWidth  variant="standard" />
                            </Grid>
                            <Grid item xs={12} >
                                <FormControl component="fieldset" required>
                                    <FormLabel component="legend">Payment Method</FormLabel>
                                        <RadioGroup row aria-label="Payment Method" name="row-radio-buttons-group">
                                            <FormControlLabel value="cash" control={<Radio />} label="Cash on Delivery" />
                                            <FormControlLabel value="card" control={<Radio />} label="Card on Delivery" />
                                        </RadioGroup>
                                </FormControl>
                            </Grid>
                            
                        </Grid>
                        <Box sx ={{display: 'flex', justifyContent: 'flex-end',}}>
                            <Button color = 'success' variant="outlined" sx={{ m: 3,}} >
                                <Link to="/Cart" style={{textDecoration: 'none'}}>Back</Link>
                            </Button>
                            <Button type="submit" color = 'success' variant="contained" sx={{ m: 3,}} >
                                Place Order
                            </Button>
                        </Box>
                        
                    </Box>
                
                </Box>
            </Container>
        </ThemeProvider>
    )
}


// <FormControlLabel control={<Checkbox color="secondary" name="saveAddress" value="yes" />} label="Use this address for payment details"/>

// <React.Fragment>
//         <Typography variant="h6" gutterBottom>
//             Shipping address
//         </Typography>
//         <Grid container spacing={3}>
//             <Grid item xs={12} sm={6}>
//                 <TextField required id="firstName" name="firstName" label="First name" fullWidth autoComplete="given-name" variant="standard"/>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//                 <TextField required id="lastName" name="lastName" label="Last name" fullWidth autoComplete="family-name" variant="standard"/>
//             </Grid>
//             <Grid item xs={12}>
//                 <TextField required id="address1" name="address1" label="Address line 1" fullWidth autoComplete="shipping address-line1" variant="standard"/>
//             </Grid>
//             <Grid item xs={12}>
//                 <TextField id="address2" name="address2" label="Address line 2" fullWidth autoComplete="shipping address-line2" variant="standard" />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//                 <TextField required id="city" name="city" label="City" fullWidth autoComplete="shipping address-level2" variant="standard" />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//                 <TextField id="state" name="state" label="State/Province/Region" fullWidth variant="standard"/>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//                 <TextField required id="zip" name="zip" label="Zip / Postal code" fullWidth autoComplete="shipping postal-code" variant="standard"/>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//                 <TextField required id="country" name="country" label="Country" fullWidth autoComplete="shipping country" variant="standard"/>
//             </Grid>
//             <Grid item xs={12}>
//                 <FormControlLabel control={<Checkbox color="secondary" name="saveAddress" value="yes" />} label="Use this address for payment details"/>
//             </Grid>
//         </Grid>
//     </React.Fragment>
import React from 'react';
import { Container, Box, Divider, Stack} from '@mui/material';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
// export default function Footer() {

//     const theme = createTheme();

//     return (
//         <ThemeProvider theme={theme}>
//             <Container sx ={{marginTop: 8, pb: 4, border: '1px solid blue', width: '100%', justifyContent: 'center'}}>
//                 <Box sx ={{m: 4, border: '1px solid blue', '}}>

//                 </Box>
//             </Container>
//         </ThemeProvider>
//     )
// }




// function Copyright() {
//   return (
//     <Box sx = {{border: '1px solid blue'}}>
//         <Typography variant="h6" color="text.secondary">
//             {'Copyright © '}
//             {new Date().getFullYear()}
//             <Link color="inherit" href="/">
//                 Online-Grocery
//             </Link>{' '}
//             {' All rights reserved.'}
//         </Typography>
//     </Box>
//   );
// }

export default function Footer() {
  return (
    <Box sx={{  display: 'flex',  flexDirection: 'column', marginTop: 8}}>
        <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800], }}>
            <Container maxWidth="lg">
                <Stack direction ='row' sx ={{border: '1px solid blue', justifyContent: 'space-around', spacing: '2', marginTop: '3px', marginBottom: '3px'}}>
                    <Box sx ={{border: '1px solid blue', m:2 }}>
                        <Typography variant="h6">About Us</Typography>
                        <p variant="body2">
                            Mauris tincidunt nisl sit amet lectus viverra scelerisque. 
                            Integer pretium congue risus, eget pharetra eros egestas id. 
                            Aenean porttitor, massa accumsan accumsan lacinia, 
                            magna ante venenatis nunc, eget congue odio dolor a ipsum. 
                            Etiam vitae magna elementum, dapibus nisl sed, tempus tellus. In rhoncus accumsan viverra. 
                            Etiam justo felis, porttitor sit amet ullamcorper et, sagittis non urna. 
                            Proin gravida dolor at arcu maximus vehicula. Aliquam consectetur augue et dui porta convallis.
                        </p>
                    </Box>
                    <Box sx ={{border: '1px solid blue', m: 2 }}>
                        <Typography variant="h6">Services</Typography>
                        <p variant="body2">
                            Mauris tincidunt nisl sit amet lectus viverra scelerisque. 
                            Integer pretium congue risus, eget pharetra eros egestas id. 
                            Aenean porttitor, massa accumsan accumsan lacinia, 
                            magna ante venenatis nunc, eget congue odio dolor a ipsum. 
                            Etiam vitae magna elementum, dapibus nisl sed, tempus tellus. In rhoncus accumsan viverra. 
                            Etiam justo felis, porttitor sit amet ullamcorper et, sagittis non urna. 
                            Proin gravida dolor at arcu maximus vehicula. Aliquam consectetur augue et dui porta convallis.
                        </p>
                    </Box>
                    <Box sx ={{border: '1px solid blue', m: 2 }}>
                        <Typography variant="h6">Contact Us</Typography>
                        <p variant="body2">
                            Mauris tincidunt nisl sit amet lectus viverra scelerisque. 
                            Integer pretium congue risus, eget pharetra eros egestas id. 
                            Aenean porttitor, massa accumsan accumsan lacinia, 
                            magna ante venenatis nunc, eget congue odio dolor a ipsum. 
                            Etiam vitae magna elementum, dapibus nisl sed, tempus tellus. In rhoncus accumsan viverra. 
                            Etiam justo felis, porttitor sit amet ullamcorper et, sagittis non urna. 
                            Proin gravida dolor at arcu maximus vehicula. Aliquam consectetur augue et dui porta convallis.
                        </p>
                    </Box>
                </Stack>

                <Divider sx = {{marginTop: 3, marginBottom: 3}}>
                    <Stack direction = 'row'>
                        <FacebookIcon fontSize = 'large'/>
                        <TwitterIcon fontSize = 'large'/>
                        <InstagramIcon fontSize = 'large'/>
                    </Stack>
                </Divider>

                <Box sx = {{border: '1px solid blue'}}>
                    <Typography align = 'center' variant="body1" color="text.secondary">
                        {'Copyright © '}
                        {new Date().getFullYear()}{' '}
                        <Link style={{textDecoration: 'none'}} color="inherit" href="/">
                            Online-Grocery
                        </Link>{' '}
                        {' All rights reserved.'}
                    </Typography>
                </Box>
            </Container>

        </Box>

    </Box>
  );
}

// <Typography variant="body1">
//                     My sticky footer can be found here.
//                 </Typography>

// <CssBaseline />

//       <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">

//         <Typography variant="h2" component="h1" gutterBottom>
//           Sticky footer
//         </Typography>

//         <Typography variant="h5" component="h2" gutterBottom>
//           {'Pin a footer to the bottom of the viewport.'}
//           {'The footer will move as the main element of the page grows.'}
//         </Typography>

//         <Typography variant="body1">Sticky footer placeholder.</Typography>

//       </Container>
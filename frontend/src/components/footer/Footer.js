import React from 'react';
import { Container, Box, Divider, Stack} from '@mui/material';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer() {
  return (
    <Box sx={{  display: 'flex',  flexDirection: 'column', marginTop: 8, border: '1px solid blue', position: 'absolute', bottom: 0, width: '100%'}}>
        <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],}}>
            <Container maxWidth="lg">
                
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

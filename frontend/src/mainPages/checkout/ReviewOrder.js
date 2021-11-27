// Review placed order 
// this is not finished so this hasn't inclueded yet

import React from 'react';
import {Typography, Box, Container, TableContainer, Paper, TableHead, TableRow, Table, TableCell, TableBody} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function ReviewOrder() {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>

      <Container maxWidth="sm" sx ={{marginTop: 8, pb: 4, border: '1px solid blue'}}>
        <Box sx={{ marginTop: 4, marginBottom: 4, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
          <Box sx ={{border: '1px solid blue', m: 2}}>
            <Typography variant="h6" gutterBottom>
              Order summary
            </Typography>
          </Box>


          <Box sx ={{border: '1px solid blue', m: 2}}>

              <TableContainer component={Paper} sx ={{marginTop: 8, width: '80%', overflowX: "auto", margin: "auto"}} >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Item</TableCell>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Price</TableCell>
        
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="center">Amount</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        
                           
                    </TableBody>
                </Table>
            </TableContainer>
          </Box>
        </Box>
      </Container>

    </ThemeProvider>

  );
}
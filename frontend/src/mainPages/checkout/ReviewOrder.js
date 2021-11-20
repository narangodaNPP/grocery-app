import React from 'react';
import {Typography, Box, Container, List, ListItem, ListItemText, Grid} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// const products = [
//   {
//     name: 'Product 1',
//     desc: 'A nice thing',
//     price: '$9.99',
//   },
//   {
//     name: 'Product 2',
//     desc: 'Another thing',
//     price: '$3.45',
//   },
//   {
//     name: 'Product 3',
//     desc: 'Something else',
//     price: '$6.51',
//   },
//   {
//     name: 'Product 4',
//     desc: 'Best thing of all',
//     price: '$14.11',
//   },
//   { name: 'Shipping', desc: '', price: 'Free' },
// ];

// const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
// const payments = [
//   { name: 'Card type', detail: 'Visa' },
//   { name: 'Card holder', detail: 'Mr John Smith' },
//   { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
//   { name: 'Expiry date', detail: '04/2024' },
// ];

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
            Order Details
          </Box>
        </Box>
      </Container>
    </ThemeProvider>

  );
}


// <React.Fragment>
//       <Typography variant="h6" gutterBottom>
//         Order summary
//       </Typography>
//       <List disablePadding>
//         {products.map((product) => (
//           <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
//             <ListItemText primary={product.name} secondary={product.desc} />
//             <Typography variant="body2">{product.price}</Typography>
//           </ListItem>
//         ))}

//         <ListItem sx={{ py: 1, px: 0 }}>
//           <ListItemText primary="Total" />
//           <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
//             $34.06
//           </Typography>
//         </ListItem>
//       </List>
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6}>
//           <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
//             Shipping
//           </Typography>
//           <Typography gutterBottom>John Smith</Typography>
//           <Typography gutterBottom>{addresses.join(', ')}</Typography>
//         </Grid>
//         <Grid item container direction="column" xs={12} sm={6}>
//           <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
//             Payment details
//           </Typography>
//           <Grid container>
//             {payments.map((payment) => (
//               <React.Fragment key={payment.name}>
//                 <Grid item xs={6}>
//                   <Typography gutterBottom>{payment.name}</Typography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Typography gutterBottom>{payment.detail}</Typography>
//                 </Grid>
//               </React.Fragment>
//             ))}
//           </Grid>
//         </Grid>
//       </Grid>
//     </React.Fragment>
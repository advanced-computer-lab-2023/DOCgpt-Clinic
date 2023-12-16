import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '../Typography1';

function ProductSmokingHero() {
  return (
    <Container
      component="section"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 5, mt: 15 }}  // Adjust the mt value as needed
    >
     <Button
  sx={{
    border: '4px solid primary.main', // Set border color to primary color
    borderRadius: 0,
    height: 'auto',
    py: 2,
    px: 5,
    cursor: 'default', // Set cursor to default
    '&:hover': {
      background: 'transparent', // Remove hover effect
    },
  }}
>
  <Typography variant="h4" component="span">
    Got any questions? Need help?
  </Typography>
</Button>


      <Typography variant="subtitle1" sx={{ my: 3 }}>
        We are here to help. Get in touch!
      </Typography>
    </Container>
  );
}

export default ProductSmokingHero;

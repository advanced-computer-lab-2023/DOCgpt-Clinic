import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '../Typography1';
import Layout2 from './LayoutP';
import image from './landingdoc.jpg'; // Update the path

export default function ProductHero() {
  return (
    <Layout2
      sxBackground={{
        backgroundImage: `url(${image})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <Typography
  color="inherit"
  align="center"
  variant="h2"
  marked="none"
  fontWeight="bold"
  style={{
    fontSize: '2.5rem',
    fontFamily: 'Poppins, sans-serif',
    borderBottom: '2px solid white', // Set the color of the line below to white
    marginTop: '15px', // Adjust the margin-top to move the line down
  }}
>
  Quality Healthcare
</Typography>

      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
      >
        From virtual consultations to prescription management, we specialize in tailoring healthcare solutions to meet your needs.
      </Typography>
      <Button
        color="primary" // Set the text color to the primary color in your theme
        variant="contained"
        size="large"
        component="a"
        href="/signupPatient"
        sx={{
          backgroundColor: 'white',
          color: 'primary.main',
          minWidth: 200,
          '&:hover': {
            backgroundColor: 'white', // Set hover background to transparent
          },
        }}
      >
        Register Now
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Discover the experience
      </Typography>
    </Layout2>
  );
}

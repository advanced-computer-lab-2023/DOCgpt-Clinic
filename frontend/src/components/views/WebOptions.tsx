import * as React from 'react';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../Typography1';
import image from './Doc.png'; 
import image2 from './medicine.png';
import image3 from './packages.png';
import image4 from './bluee.jpg';

const item: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

function Values() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'main.primary' }}
    >
      <Container sx={{ mt: 15, mb: 30, display: 'flex', position: 'relative' }}>
      <Box
          component="img"
          src="/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src={image}
                alt="suitcase"
                sx={{ height: 90 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                Experts in the Field
              </Typography>
              <Typography variant="h5">
                {
                  "At our website, we take pride in having the best doctors and pharmacists on board, ensuring top-notch healthcare and expert guidance."
                }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src={image2}
                alt="graph"
                sx={{ height: 90 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                Variety of Medicines
              </Typography>
              <Typography variant="h5">
                {
                   "We stock a diverse collection of medicines, providing you with choices to meet your unique health requirements."}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src={image3}
                alt="clock"
                sx={{ height: 90 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                Exclusive Health Packages
              </Typography>
              <Typography variant="h5">
                {"Explore our exclusive health packages, to enjoy significant discounts on medicines, appointments, and other healthcare essentials"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Values;
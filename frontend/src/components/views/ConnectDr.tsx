import * as React from 'react';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '../Button1';
import Typography from '../Typography1';

const item: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: 'default',
  color: 'secondary.main',
  fontWeight: 'medium',
};

const image = {
  height: 55,
  my: 4,
};

const section: SxProps<Theme> = {
  display: 'flex',
  bgcolor: 'primary.main',
  overflow: 'hidden',
  mt: 12,
  mb: 16 ,
  height: '60vh', // Adjust the height as needed
};

const container: SxProps<Theme> = {
  mt: 10,
  mb: 15,
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '600px', // Adjust the max width as needed
};


const textBox: SxProps<Theme> = {
  position: 'absolute',
  top: '180%', // Adjust the top spacing as needed
  left: '-100%', // Adjust the left spacing as needed
  transform: 'translate(-50%, -50%)', // Center the box horizontally and vertically
  textAlign: 'left', // Align text to the left
  zIndex: 1,
};

const videoBox: SxProps<Theme> = {
  position: 'absolute',
  top: '420%', // Adjust the top spacing as needed
  right: '-730px', // Adjust the right spacing as needed
  transform: 'translateY(-50%)',
};

function ProductHowItWorks() {
  return (
    <Box component="section" sx={section}>
      <Container sx={container}>
        <Box
          component="img"
          src="/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            top: -180,
            opacity: 0.7,
          }}
        />

        {/* Wrap the existing Typography and the new Typography with a Box */}   
        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Typography
            variant="h4"
            marked="none"
            component="h2"
            sx={{
              mb: 4,
              color: 'common.white',
              fontWeight: 'bold',
              marginLeft: -105, // Adjust left margin as needed
              marginTop: -5, // Adjust top margin as needed
            }}
          >
            Connect with your Doctors
          </Typography>

          {/* Add the video here */}
          <Box sx={videoBox}>
            {/* Replace 'YourLocalVideo.mp4' with the actual name of your video */}
            <video width="720" height="620" controls>
              <source src="/Video2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>

          {/* Add a separate box for text */}
          <Box sx={textBox}>
            <Typography
              variant="body1"
              sx={{
                color: 'black',
                mb: -7,
                marginLeft: -90,
                marginTop: 15, 
                fontSize: '1.4rem', // Adjust top margin as needed
              }}
            >
              we proudly provide virtual video calls and chat services with experienced and qualified doctors.Embrace the future of healthcare with our online services
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default ProductHowItWorks;
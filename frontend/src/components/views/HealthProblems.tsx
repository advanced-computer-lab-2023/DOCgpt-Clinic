import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Typography from '../Typography1';
import headache from './headache.jpg';
import flu from './flu.jpg'
import sache from './sache.jpg';
import eye from './eye.jpg'
import back from './back.jpg';
import diabetes from './diabetes.jpg';
import heart from './heart.jpg';
import ear from './ear2.jpg';
import teeth from './teeth2.jpg';
const ImageBackdrop = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: '#000',
  opacity: 0.5,
  transition: theme.transitions.create('opacity'),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  display: 'block',
  padding: 0,
  borderRadius: 0,
  height: '40vh',
  cursor: 'default',
  [theme.breakpoints.down('md')]: {
    width: '100% !important',
    height: 100,
  },
  '&:hover': {
    zIndex: 1,
  },
  '&:hover .imageBackdrop': {
    opacity: 0.15,
  },
  '&:hover .imageMarked': {
    opacity: 0,
  },
  '&:hover .imageTitle': {
    border: '4px solid currentColor',
  },
  '& .imageTitle': {
    position: 'relative',
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  '& .imageMarked': {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
  background: `url(${headache}) center 40% / cover`,
}));

const images = [
  {
    title: 'Headache',
    width: '40%',
  },
  {
    url: flu ,
    title: 'flu',
    width: '20%',
  },
  {
    url: sache,
    title: 'Stomach aches',
    width: '40%',
  },
  {
    url: eye,
    title: 'Eye Problems',
    width: '38%',
  },
  {
    url:back,
    title: 'Pains',
    width: '38%',
  },
  {
    url: ear,
    title: 'Ears Infections',
    width: '24%',
  },
  {
    url: diabetes,
    title: 'Diabetes',
    width: '40%',
  },
  {
    url: teeth,
    title: 'Teeth Problems',
    width: '20%',
  },
  {
    url: heart,
    title: 'Cardiac Problems',
    width: '40%',
  },
];

export default function ProductCategories() {
  return (
    <Container component="section" sx={{ mt: 4, mb: 4 }}>
      <Typography
  variant="h4"
  marked="none"
  align="center"
  component="h2"
  sx={{ fontWeight: 'bold', marginTop: '-110px', marginBottom: '70px' }}
>
  We're here to solve any medical issue you face
</Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image) => (
          <ImageIconButton
            key={image.title}
            style={{
            width: image.width,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundSize: 'cover',
                backgroundPosition: 'center 40%',
                backgroundImage: `url(${image.url})`,
              }}
            />
            <ImageBackdrop className="imageBackdrop" />
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'common.white',
              }}
            >
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className="imageTitle"
              >
                {image.title}
                <div className="imageMarked" />
              </Typography>
            </Box>
          </ImageIconButton>
        ))}
      </Box>
    </Container>
  );
}
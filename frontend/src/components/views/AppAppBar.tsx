import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Toolbar from '../Toolbar1';
import AppBar from '../AppBar1';


const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

const signUpButton = {
  textTransform: 'none',
  color: 'common.white',
  backgroundColor: 'primary.main',
  borderColor: 'primary.main',
  '&:hover': {
    backgroundColor: 'common.white',
    color: 'primary.main',
    borderColor: 'primary.main',
  },
};

const signInButton = {
  textTransform: 'none',
  color: 'primary.main',
  borderColor: 'primary.main',
  '&:hover': {
    backgroundColor: 'primary.main',
    color: 'common.white',
  },
};

function AppAppBar() {
  return (
    <div>
      <AppBar position="fixed" sx={{ backgroundColor: 'white' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }} />
           {/* Replace the Link with img tag for your logo */}
           <Link href="" sx={{ fontSize: 95 }}>
  <img
    src="./Logoo.PNG"
    alt="./Logoo.PNG"
    style={{ height: 105, transform: 'scale(3.5)' }}
  />
</Link>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              variant="outlined"
              href="/login"
              sx={{ ...rightLink, ...signInButton }}
            >
              {'Sign In'}
            </Button>
            <Button
              variant="contained"
              href="/register/patient"
              sx={{ ...rightLink, ...signUpButton }}
            >
              {'Sign Up'}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;

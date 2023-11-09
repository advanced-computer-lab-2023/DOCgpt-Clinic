import React from 'react';
import { AppBar, Button, Container, Toolbar, Typography, Paper, Grid, Link, ButtonGroup, Divider } from '@mui/material';
import { AccountCircle, ExitToApp, Info, ContactSupport } from '@mui/icons-material';
import theme from '../theme';

function Landing() {
    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };
return (
<div>
    <AppBar position="static"  style= {{ marginBottom: '50px', background: theme.palette.blue.main}} >
    <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">el7a2ni</Typography>
        <ButtonGroup variant='text'>
            <Button style={{color: theme.palette.customGrey.light}} onClick={() => scrollToSection('aboutUsSection')}>About Us</Button>
            <Button style={{color: theme.palette.customGrey.light}} onClick={() => scrollToSection('contactUsSection')}>Contact Info</Button>
        </ButtonGroup>
        <ButtonGroup variant="contained">
        <Button startIcon={<AccountCircle />}>
        Sign Up
        </Button>
        <Button startIcon={<ExitToApp />}>
        Log In
        </Button>
        </ButtonGroup>
    </Toolbar>
    </AppBar>
    <Grid container spacing={12} style={{ padding: '50px'}}>
        <Grid item xs={12}>
            <Grid container >
                <Grid item xs={6} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Typography variant="h4" style={{ padding: '20px', color: theme.palette.black.main, fontWeight: 'bold' }}>
                    Who Are We?
                </Typography>
                </Grid>
                <Grid item xs={6} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Typography variant="h6" style={{ padding: '20px',  color: theme.palette.customGrey.dark }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum fugiat explicabo reprehenderit optio vel sunt excepturi obcaecati possimus ipsa consectetur praesentium enim nesciunt cumque delectus laudantium, vitae, laboriosam odio placeat!
                </Typography>
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12}>
            <Grid container>
                <Grid item xs={6} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Typography variant="h6" style={{ padding: '20px',  color: theme.palette.customGrey.dark}}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum fugiat explicabo reprehenderit optio vel sunt excepturi obcaecati possimus ipsa consectetur praesentium enim nesciunt cumque delectus laudantium, vitae, laboriosam odio placeat!
                </Typography>
                <Divider orientation="vertical" variant="middle" />
                </Grid>
                <Grid item xs={6} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Typography variant="h4" style={{ padding: '20px', color: theme.palette.black.main, fontWeight: 'bold' }}>
                    What do we offer?
                </Typography>
                </Grid>
            </Grid>
        </Grid>

        <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}  id="aboutUsSection">
                    <Typography variant="h4" style={{ padding: '20px', color: theme.palette.black.main, fontWeight: 'bold' }}>
                        Our mission
                    </Typography>
                    </Grid>
                    <Grid item xs={6} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Typography variant="h6" style={{ padding: '20px',  color: theme.palette.customGrey.dark }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum fugiat explicabo reprehenderit optio vel sunt excepturi obcaecati possimus ipsa consectetur praesentium enim nesciunt cumque delectus laudantium, vitae, laboriosam odio placeat!
                    </Typography>
                    </Grid>
                </Grid>
        </Grid>

        <Grid item xs={12}>
            <Grid container>
                <Grid item xs={6} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Typography variant="h6" style={{ padding: '20px',  color: theme.palette.customGrey.dark }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum fugiat explicabo reprehenderit optio vel sunt excepturi obcaecati possimus ipsa consectetur praesentium enim nesciunt cumque delectus laudantium, vitae, laboriosam odio placeat!
                </Typography>
                <Divider orientation="vertical" variant="middle" flexItem />
                </Grid>
                <Grid item xs={6} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Typography variant="h4" style={{ padding: '20px', color: theme.palette.black.main, fontWeight: 'bold' }}>
                    Our vision
                </Typography>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
    <Grid container id="contactUsSection" style={{background: theme.palette.blue.main}}>
        <Grid item xs={4} style={{ display: 'flex'}}>
        <Typography variant="h6" style={{ padding: '50px', color: theme.palette.customGrey.light, fontWeight: 'bold' }}>
            Email
        </Typography>
        </Grid>
        <Grid item xs={4} style={{ display: 'flex' }}>
        <Divider orientation="vertical" variant="middle" flexItem style={{ background: theme.palette.customGrey.light}}/>
        <Typography variant="h6" style={{padding: '50px', color: theme.palette.customGrey.light, fontWeight: 'bold' }}>
            Locations
        </Typography>
        </Grid>
        <Grid item xs={4} style={{ display: 'flex' }}>
        <Divider orientation="vertical" variant="middle" flexItem style={{ background: theme.palette.customGrey.light}}/>
        <Typography variant="h6" style={{ padding: '50px', color: theme.palette.customGrey.light, fontWeight: 'bold' }}>
            Hot Lines
        </Typography>
        </Grid>
    </Grid>
</div>
);
}

export default Landing;

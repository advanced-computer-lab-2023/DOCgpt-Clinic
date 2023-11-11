


import * as React from "react";
import { useState } from "react";
import { To, useNavigate } from "react-router-dom";
import appRoutes from "./patientRoutes";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HealingIcon from "@mui/icons-material/Healing";

import { ReactNode } from "react";

const drawerWidth = 240;
const navItems = ["Home", "About", "Pharmacy", "Contact", "Login"];


export type RouteType = {
  header: string;
  child: links[];
  sidebarProps?: {
    icon?: ReactNode;
  };
};

export type links = {
  state: string;
  icon?: ReactNode;
  path: string;
  element?: ReactNode;
};


export default function DrawerAppBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const navigateTo = (route: To) => {
    navigate(route);
    setIsDrawerOpen(false);
  };

  
  const renderMenuItems = (items: RouteType[]) => {
    return (
      <List>
        {items.map((item) => (
          <React.Fragment key={item.header}>
            <ListItem disablePadding>
              {/* <ListItemButton
                sx={{ textAlign: "center" }}
                // onClick={() => navigateTo(item.child[0].path)}
              > */}
                <ListItemText primary={item.header}    sx={{ textAlign: "center"  }}  />
              {/* </ListItemButton> */}
            </ListItem>
            <List>
              {item.child.map((childItem) => (
                <ListItem key={childItem.state} disablePadding>
                  <ListItemButton
                    sx={{ textAlign: "center" }}
                    onClick={() => navigateTo(childItem.path)}
                  >
                    <ListItemText primary={childItem.state} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </React.Fragment>
        ))}
      </List>
    );
  };
  
//   const appRoutes = [

//     {
//       state: "dashboard",
//       sidebarProps: {
//         displayText: "Dashboard",
//         //icon: <DashboardOutlinedIcon />,
//       },
//       child: [
//         {
//           path: "/",
//           element: <LandingPage/>,
//           state: "dashboard.default",
//           sidebarProps: {
//             displayText: "Default",
//           },
//         },
//         {
//           path: "/dashboard/analytics",
//           element: <LandingPage/>,
//           state: "dashboard.analytics",
//           sidebarProps: {
//             displayText: "Analytic",
//           },
//         },
//         {
//           path: "/dashboard/saas",
//           element: <LandingPage/>,
//           state: "dashboard.saas",
//           sidebarProps: {
//             displayText: "Saas",
//           },
//         },
//       ],
//     },];
  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }} color="black">
        CLINIC
      </Typography>
      <Divider />
      {renderMenuItems(appRoutes)}
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: "white" }}>
        <Toolbar>
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "block" } }}
          >
            <MenuIcon />
          </IconButton>
          <HealingIcon sx={{ fontSize: 40, color: "black" }} />
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              color: "black",
            }}
          >
            CLINIC
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{ color: "black" }}
                onClick={() => navigateTo(`/${item.toLowerCase()}`)}
              >
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={isDrawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}










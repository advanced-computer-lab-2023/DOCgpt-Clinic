import * as React from "react";
import { useState } from "react";
import { To, useNavigate } from "react-router-dom";
import logo from '../../logo.jpeg';
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
  Menu,
  MenuItem,
  ListSubheader, // Import Menu and MenuItem
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HealingIcon from "@mui/icons-material/Healing";
import PersonIcon from "@mui/icons-material/Person"; // Import PersonIcon
import { ReactNode } from "react";
import appRoutes from "./adminRoutes";

const drawerWidth = 240;
const navItems = [
  { name: "Home", path: "/admin/home" },
 
];

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

export default function AdminAppBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openHeaders, setOpenHeaders] = useState<number[]>([]);
  const [activeHeaderIndex, setActiveHeaderIndex] = useState<number | null>(null);



  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); // State for the anchor element of the menu

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const navigate = useNavigate();
  const openPharmacy = () => {
    const newWindow = window.open(
      "http://localhost:3001/login",
      "_blank"
    );
    if (newWindow) {
      window.close();
    } else {
      console.error("Unable to open a new window.");
    }
  };
const handleLogout = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch("/routes/admins/logoutAdmin", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the user's token
      },
    });

    if (response.ok) {
      // Handle successful logout (e.g., clear local storage, redirect user)
      console.log("User logged out successfully");
      localStorage.removeItem("authToken");

     // Redirect to your login page
     navigate("/");
    } else {
      // Handle errors during logout
      console.error("Logout failed");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
const toggleHeaderState = (index: number) => {
  // If the clicked header is already open, close it
  if (openHeaders.includes(index)) {
    setOpenHeaders(openHeaders.filter((item) => item !== index));
    setActiveHeaderIndex(null); // Reset active header index
  } else {
    setOpenHeaders([index]); // Close all other headers and open the clicked one
    setActiveHeaderIndex(index); // Set the clicked header as active
  }
};
  const navigateTo = (route: To) => {
    navigate(route);
    setIsDrawerOpen(false);
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const isHeaderActive = (index: number) => {
    return activeHeaderIndex === index;
  };

  const isHeaderOpen = (index: number) => {
    return openHeaders.includes(index);
  };


  const renderMenuItems = (items: RouteType[]) => {
    return (
      <List>
        {items.map((item, index) => (
          <React.Fragment key={item.header + index}>
            <ListItem disablePadding>
              <ListSubheader
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  marginLeft: 2,
                  backgroundColor: 'transparent', // Set the background to transparent
                  color: isHeaderActive(index) ? '#2196F3' : 'inherit', // Apply blue color if the header is active
                  '&:hover, &:hover .MuiTypography-root, &:hover .MuiSvgIcon-root': {
                    color: '#2196F3' // Change text and icon color to blue on hover
                  },
                }}
                onClick={() => toggleHeaderState(index)}
              >
                {isHeaderOpen(index) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              <ListItemText 
                primary={item.header} 
                sx={{ 
                  '.MuiTypography-root': {
                    color: isHeaderActive(index) ? '#2196F3' : 'inherit', // Change text color based on active state
                  }
                }}
              />
            </ListSubheader>
            </ListItem>
            {isHeaderOpen(index) && (
              item.child.map((childItem, childIndex) => (
                <ListItem key={childItem.state + childIndex} disablePadding>
                  <ListItemButton
                  sx={{ 
                    textAlign: "left", 
                    marginLeft: 5, 
                    padding: '6px 16px', // Smaller padding
                    fontSize: '0.875rem', // Smaller font size
                  }}
                  onClick={() => navigateTo(childItem.path)}
                >
                  <ListItemText 
                    primary={childItem.state} 
                    primaryTypographyProps={{ variant: 'body2' }} // Smaller text variant
                  />
                </ListItemButton>
                </ListItem>
              ))
            )}
          </React.Fragment>
        ))}
      </List>
    );
  };

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <div style={{ display: 'flex', alignItems: 'left', maxWidth: '600px', margin: '0 auto' }}>
      <img src={logo}  alt="Clinic Logo" style={{ width: '200px', height:'100px',  marginRight: '5px' }} />
      </div>
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
                key={item.name}
                sx={{ color: "black" }}
                onClick={() => navigate(item.path)}
              >
                {item.name}
              </Button>
            ))}
          </Box>
          <Button key="Clinic" sx={{ color: "black" }} onClick={openPharmacy}>
              Pharmacy
            </Button>
          {/* User Menu */}
          <IconButton
            color="primary"
            aria-label="User Menu"
            aria-controls="user-menu"
            aria-haspopup="true"
            onClick={handleOpenMenu}
          >
            <PersonIcon />
          </IconButton>
          {/* User Menu */}
          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={() => navigate("/admin/profile")}>
              My Profile
            </MenuItem>
            <MenuItem onClick={() => navigate("/changepasswordadmin")}>
              Change my Password
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
          {/* Dropdown Menu */}
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
              backgroundColor: "#FFFFFFE6"
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main">
        <Toolbar />
      </Box>
    </Box>
  );
}

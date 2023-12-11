import * as React from "react";
import { useState } from "react";
import { To, useNavigate } from "react-router-dom";


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
  MenuItem, // Import Menu and MenuItem
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HealingIcon from "@mui/icons-material/Healing";
import PersonIcon from "@mui/icons-material/Person"; // Import PersonIcon
import { ReactNode } from "react";
import appRoutes from "./adminRoutes";

const drawerWidth = 240;
const navItems = [
  { name: "Home", path: "/admin/home" },
  { name: "Clinic", path: "/admin/home" },
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


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); // State for the anchor element of the menu

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const navigate = useNavigate();

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

  const renderMenuItems = (items: RouteType[]) => {
    return (
      <List>
        {items.map((item, index) => (
          <React.Fragment key={item.header + index}>
            <ListItem disablePadding>
              <ListItemText
                primary={item.header}
                sx={{ textAlign: "center" }}
              />
            </ListItem>
            <List key={`${item.header}-child-list`}>
              {item.child.map((childItem, childIndex) => (
                <ListItem key={childItem.state + childIndex} disablePadding>
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

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }} color="black">
        Clinic
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
                key={item.name}
                sx={{ color: "black" }}
                onClick={() => navigate(item.path)}
              >
                {item.name}
              </Button>
            ))}
          </Box>
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

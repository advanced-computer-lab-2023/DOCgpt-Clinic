import * as React from "react";
import { useState } from "react";
import { To, useNavigate, useParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ForumIcon from "@mui/icons-material/Forum";
import PersonIcon from "@mui/icons-material/Person";

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
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HealingIcon from "@mui/icons-material/Healing";
import WalletIcon from "@mui/icons-material/Wallet";
import ViewWalletAmount from "../viewWalletAmountDoctor";
import CustomizedBadges from "./notificationIcon";
import { ReactNode } from "react";
import appRoutes from "./patientRoutes";
import ViewWalletBalance from "../viewWalletPatient";
import theme from "../../theme";

const drawerWidth = 240;
//const navItems = ["Home", "About", "Pharmacy", "Contact", "Login"];
const navItems = [
  { name: "Home", path: "/patient/home" },
  { name: "About", path: "/patient/home" },
  { name: "Contact", path: "/patient/home" },
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

export default function DrawerAppBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false); // State to manage the wallet sidebar
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); // State for notification dropdown
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); // Anchor element for notification dropdown
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const openPharmacy = () => {
    const newWindow = window.open(
      "http://localhost:3001/patientHome",
      "_blank"
    );
    if (newWindow) {
      window.close();
    } else {
      console.error("Unable to open a new window.");
    }
  };

  const navigateTo = (route: To) => {
    navigate(route);
    setIsDrawerOpen(false);
  };
  const handleViewWalletBalance = () => {
    setIsWalletOpen(!isWalletOpen); // Toggle the wallet sidebar
  };
  const handleChatClick = () => {
    // Redirect to the page displaying all conversations
    navigate("/all-chats-patient");
  };
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("/routes/patient/logoutPatient", {
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

        navigate("/"); // Redirect to your login page
      } else {
        // Handle errors during logout
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
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
  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    // Vibrate when the notification icon is clicked
    if ("vibrate" in navigator) {
      navigator.vibrate(200);
    }

    // Open the notification dropdown
    setAnchorEl(event.currentTarget);
    setIsNotificationOpen(true);
  };

  const handleNotificationClose = () => {
    // Close the notification dropdown
    setAnchorEl(null);
    setIsNotificationOpen(false);
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
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMywallet = () => {
    // Redirect to the My Profile page ("/doctor/home")
    navigate("/patient/walletAmount");
  };
  const handlechangepassword = () => {
    // Redirect to the My Profile page ("/doctor/home")
    navigate("/changepasswordpatient");
  };
  const handleMyProfileClick = () => {
    // Redirect to the My Profile page ("/doctor/home")
    navigate("/");
  };
  <IconButton
    color="primary"
    aria-label="User Menu"
    aria-controls="user-menu"
    aria-haspopup="true"
    onClick={handleOpenMenu}
  >
    <PersonIcon />
  </IconButton>;

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
            <Button key="Logout" sx={{ color: "black" }} onClick={openPharmacy}>
              Pharmacy
            </Button>
          </Box>
          <Box sx={{ display: "flex" }}>
            {isWalletOpen && (
              <Drawer
                variant="temporary"
                open={isWalletOpen}
                onClose={handleViewWalletBalance}
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
                {/* Render the ViewWalletBalance component in the wallet sidebar */}
              </Drawer>
            )}
            <IconButton color="primary" onClick={handleChatClick}>
              <ForumIcon />
            </IconButton>
          </Box>
          {/* Notification Badge */}
          <CustomizedBadges />
          <IconButton
            color="primary"
            aria-label="User Menu"
            aria-controls="user-menu"
            aria-haspopup="true"
            onClick={handleOpenMenu}
          >
            <PersonIcon />
          </IconButton>
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
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleMywallet}>My Wallet</MenuItem>
        <MenuItem onClick={handlechangepassword}>Change password</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}

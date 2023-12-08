import { createTheme } from "@mui/material/styles";

// Augment the palette to include custom colors
declare module "@mui/material/styles" {
  interface Palette {
    blue: Palette["primary"];
    customGrey: Palette["primary"];
    black: Palette["secondary"];
  }

  interface PaletteOptions {
    blue?: PaletteOptions["primary"];
    customGrey?: PaletteOptions["primary"];
    black?: PaletteOptions["secondary"];
  }
}

const theme = createTheme({
  palette: {
    blue: {
      main: "#2196F3",
      light: "#E3F2FD",
    },
    customGrey: {
      light: "#F0F0F0",
      main: "#9C9C9C",
      dark: "#636363",
    },
    black: {
      main: "#202020",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          height: "200px",
          width: "500px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16, // Customize button styles
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          // Add your custom styles for the root of the TextField
          backgroundColor: "#FFFFFF",
          borderRadius: 8,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          // Add your custom styles for the input element
          color: "#202020",
          fontSize: "1rem",
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          // Custom styles for the entire Snackbar
          backgroundColor: "#2196F3",
          color: "#FFFFFF",
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        message: {
          // Custom styles for the content of the Snackbar
          paddingLeft: 16,
          paddingRight: 16,
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          // Custom styles for the entire dialog paper
          borderRadius: 16,
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
        },
        paperWidthSm: {
          // Custom styles for small-sized dialogs
          maxWidth: "400px",
        },
        paperWidthMd: {
          // Custom styles for medium-sized dialogs
          maxWidth: "600px",
        },
        paperWidthLg: {
          // Custom styles for large-sized dialogs
          maxWidth: "800px",
        },
        paperFullScreen: {
          // Custom styles for full-screen dialogs
          overflow: "hidden",
        },
        paperFullWidth: {
          // Custom styles for full-width dialogs
          width: "100%",
        },
      },
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    h1: {
      fontSize: "2rem", // Set your desired font size
      fontWeight: "bold",
      color: "#000000", // Set your desired color
    },
    h2: {
      fontSize: "1.5rem", // Set your desired font size

      color: "#202020", // Set your desired color
    },
    h3: {
      fontSize: "1.17rem", // Set your desired font size

      color: "#202020", // Set your desired color
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  // Add other theme properties as needed
});

export default theme;
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
            main: '#2196F3',
            light: '#E3F2FD',
        },
        customGrey: {
            light: '#F0F0F0',
            main: '#9C9C9C',
            dark: '#636363'
        },
        black:{
            main: '#202020'
        }

    },
    typography: {
        fontFamily: 'Poppins, sans-serif'
    },
  // Add other theme properties as needed
});

export default theme;
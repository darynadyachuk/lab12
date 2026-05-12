import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {main: "#d81b60"},
    background: {
      default: "#fff0f5",
      paper: "#ffffff"
    },
    text: {
      primary: "#212121",
      secondary: "#575757",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h6: {color: "#212121",},
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#f48fb1" },
    background: { default: "#121212", paper: "#1d1d1d" },
    text: { primary: "#fff", secondary: "#ccc" },
  },
});


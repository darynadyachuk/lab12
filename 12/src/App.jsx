import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import AppBarNav from "./components/AppBarNav";
import AppRoutes from "./routes/AppRoutes";
import ThemeToggleButton from "./components/ThemeToggleButton";
import CustomThemeProvider from "./theme/CustomThemeProvider";
import AccessibilityManager from "./components/AccessibilityManager";

function App() {
  return (
    <CustomThemeProvider>
      <Router basename="/lab12">
        <AccessibilityManager />
        <CssBaseline />
        <AppBarNav />
        <ThemeToggleButton />
        <Box component="main" sx={{ p: 4 }}>
          <AppRoutes />
        </Box>
      </Router>
    </CustomThemeProvider>
  );
}

export default App;
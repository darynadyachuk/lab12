import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import AppBarNav from "./components/AppBarNav";
import AppRoutes from "./routes/AppRoutes";
import ThemeToggleButton from "./components/ThemeToggleButton";
import CustomThemeProvider from "./theme/CustomThemeProvider";
import AccessibilityManager from "./components/AccessibilityManager";
import { AccessibilityProvider } from './a11y/AccessibilityProvider';
import AccessibilitySettingsPanel from "./components/AccessibilitySettingsPanel";
function App() {
  return (
    <CustomThemeProvider>
      <AccessibilityProvider>
        <Router basename="/lab12">
          <CssBaseline />
          <AccessibilityManager />
          <AccessibilitySettingsPanel />
          <AppBarNav />
          <ThemeToggleButton />
          <Box component="main" sx={{ p: 4 }}>
            <AppRoutes />
          </Box>
        </Router>
      </AccessibilityProvider>
    </CustomThemeProvider>
  );
}

export default App;
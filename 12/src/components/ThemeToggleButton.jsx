import { Box, Button } from "@mui/material";
import { useThemeMode } from "../theme/themeHooks";

function ThemeToggleButton() {
  const { mode, toggleMode } = useThemeMode();

  return (
    <Box sx={{ textAlign: "center", mb: 2 }}>
      <Button variant="contained" onClick={toggleMode}>
        Switch to {mode === "light" ? "Dark" : "Light"} Mode
      </Button>
    </Box>
  );
}

export default ThemeToggleButton;
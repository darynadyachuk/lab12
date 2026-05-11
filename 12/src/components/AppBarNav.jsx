import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function AppBarNav() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} to="/people">
            Our Team
          </Button>
          <Button color="inherit" component={Link} to="/todo">
            Todo
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
import { Card, CardContent, CardMedia, Typography, useTheme } from "@mui/material";

function Profile({ name, role, avatarUrl, borderColor }) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        backgroundColor: theme.palette.background.paper,
        textAlign: "center",
        borderRadius: 3,
        p: 2,
        border: `2px solid ${borderColor}`,
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={avatarUrl}
        alt={name}
        sx={{
          borderRadius: 2,
          objectFit: "cover",
        }}
      />
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.primary.main,
            fontWeight: "bold",
          }}
        >
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {role}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Profile;
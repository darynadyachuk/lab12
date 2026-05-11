
import Profile from "../components/labs/people/Profile";
import { users } from "../components/labs/people/users";
import { useTheme } from "@mui/material/styles";

export default function People() {
  const theme = useTheme();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "16px",
        padding: "16px",
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      {users.map((user) => (
        <Profile
          key={user.id}
          name={user.name}
          role={user.role}
          avatarUrl={user.avatarUrl}
          borderColor={theme.palette.primary.main}
        />
      ))}
    </div>
  );
}
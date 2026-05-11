import React, { useState } from "react";
import { ListItem, Checkbox, Typography, IconButton, TextField, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

const TodoItem = React.memo(function TodoItem({ id, text, completed, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(text);

  function handleToggle() { onToggle(id); }
  function handleDelete() { onDelete(id); }
  async function handleSave() {
    if (newTitle.trim()) {
      await onEdit(id, newTitle);
      setIsEditing(false);
    }
  }

  return (
    <ListItem
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "background.paper",
        mb: 1,
        borderRadius: 1,
        p: 1,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}>
        <Checkbox checked={completed} onChange={handleToggle} color="primary" />
        {isEditing ? (
          <TextField
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            size="small"
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            fullWidth
          />
        ) : (
          <Typography sx={{ textDecoration: completed ? "line-through" : "none" }}>
            {text}
          </Typography>
        )}
      </Box>

      <Box>
        {isEditing ? (
          <IconButton onClick={handleSave} color="primary">
            <SaveIcon />
          </IconButton>
        ) : (
          <IconButton onClick={() => setIsEditing(true)} color="primary">
            <EditIcon />
          </IconButton>
        )}
        <IconButton onClick={handleDelete} color="secondary">
          <DeleteIcon />
        </IconButton>
      </Box>
    </ListItem>
  );
});

export default TodoItem;
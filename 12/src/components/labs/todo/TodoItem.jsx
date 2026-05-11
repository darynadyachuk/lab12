import React, { useState } from "react";
import {
  ListItem,
  Checkbox,
  Typography,
  IconButton,
  TextField,
  Box,
  FormControlLabel
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

const TodoItem = React.memo(function TodoItem({ id, text, completed, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(text);

  const inputId = `todo-input-${id}`;
  const checkboxId = `todo-checkbox-${id}`;

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
        <FormControlLabel
          sx={{ mr: 0 }}
          control={
            <Checkbox
              id={checkboxId}
              checked={completed}
              onChange={handleToggle}
              color="primary"
              inputProps={{
                'aria-label': completed ? `Mark "${text}" as incomplete` : `Mark "${text}" as completed`
              }}
            />
          }
          label=""
        />

        {isEditing ? (
          <TextField
            id={inputId}
            label="Edit task"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            size="small"
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            fullWidth
            autoFocus
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        ) : (
          <Typography
            component="label"
            htmlFor={checkboxId}
            sx={{
              textDecoration: completed ? "line-through" : "none",
              cursor: "pointer",
              flex: 1
            }}
          >
            {text}
          </Typography>
        )}
      </Box>

      <Box sx={{ ml: 2, display: "flex", flexShrink: 0 }}>
        {isEditing ? (
          <IconButton
            onClick={handleSave}
            color="primary"
            aria-label={`Save changes for ${text}`}
          >
            <SaveIcon />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => setIsEditing(true)}
            color="primary"
            aria-label={`Edit task: ${text}`}
          >
            <EditIcon />
          </IconButton>
        )}
        <IconButton
          onClick={handleDelete}
          color="secondary"
          aria-label={`Delete task: ${text}`}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </ListItem>
  );
});

export default TodoItem;
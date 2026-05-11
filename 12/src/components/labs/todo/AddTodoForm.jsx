import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

export default function AddTodoForm({ onAddTodo }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddTodo(text);
    setText("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", gap: 2, mb: 2, alignItems: "center" }}
    >
      <TextField
        id="add-new-task-input"
        label="New task"
        placeholder="New task..."
        inputProps={{ 'aria-label': 'Add new task' }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        fullWidth
        size="small"
        variant="outlined"
      />
      <Button variant="contained" color="primary" type="submit">
        Add
      </Button>
    </Box>
  );
}
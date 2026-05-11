
import AddTodoForm from "./AddTodoForm";
import TodoItem from "./TodoItem";
import { List, TextField, Box, Button, Typography } from "@mui/material";

export default function TodoList({
  todos,
  isLoading,
  error,
  onAddTodo,
  onToggleTodo,
  onDeleteTodo,
  onEditTodo,
  searchTerm,
  onSearchChange,
  currentPage,
  totalTodos,
  limitPerPage,
  onNextPage,
  onPrevPage,
}) {
  if (isLoading) return <Typography>Loading todos...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <AddTodoForm onAddTodo={onAddTodo} />
    <TextField
      id="search-todos-input"
      label="Search tasks"
      placeholder="Search todos..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      fullWidth
      size="small"
      sx={{ mb: 2 }}
      inputProps={{ 'aria-label': 'Search tasks' }}
      InputLabelProps={{
        sx: {
          position: "absolute",
          width: "1px",
          height: "1px",
          margin: "-1px",
          padding: "0",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          border: "0",
        },
      }}
    />

      <List>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.todo}
            completed={todo.completed}
            onDelete={onDeleteTodo}
            onToggle={onToggleTodo}
            onEdit={onEditTodo}
          />
        ))}
      </List>

      {todos.length === 0 && !isLoading && (
        <Typography align="center" color="text.secondary">
          {searchTerm ? "No todos found" : "No todos available"}
        </Typography>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
        <Button onClick={onPrevPage} disabled={currentPage === 1} variant="contained">
          Previous
        </Button>
        <Typography align="center" sx={{ pt: 1 }}>
          Page {currentPage} of {Math.ceil(totalTodos / limitPerPage) || 1}
        </Typography>
        <Button
          onClick={onNextPage}
          disabled={currentPage >= Math.ceil(totalTodos / limitPerPage)}
          variant="contained"
        >
          Next
        </Button>
      </Box>

      <Typography align="center" color="text.secondary" sx={{ mt: 1 }}>
        Total todos: {totalTodos}
      </Typography>
    </Box>
  );
}
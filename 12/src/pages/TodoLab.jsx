
import TodoListContainer from "../components/labs/todo/TodoListContainer";
import todoIcon from "../assets/brain.gif";

export default function TodoLab() {
  return (
    <div style={{ padding: "16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
        <img
          src={todoIcon}
          alt="Todo Icon"
          style={{ width: 50, height: 50, borderRadius: 4 }}
        />
        <h1>Todo List (Lab)</h1>
      </div>

      <TodoListContainer />
    </div>
  );
}
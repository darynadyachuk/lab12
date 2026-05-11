import { Routes, Route } from "react-router-dom";
import People from "../pages/People";
import TodoLab from "../pages/TodoLab";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/people" element={<People />} />
      <Route path="/todo" element={<TodoLab />} />
      <Route path="/" element={<People />} />
    </Routes>
  );
}
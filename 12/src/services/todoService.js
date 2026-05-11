const BASE_URL = "https://dummyjson.com/todos";

export const todoService = {
  async getTodos() {
    const res = await fetch(`${BASE_URL}?limit=150`);

    if (!res.ok) {
      throw new Error("Failed to fetch todos");
    }

    const data = await res.json();
    return data.todos || [];
  },

  async addTodo(text) {
    const res = await fetch(`${BASE_URL}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        todo: text,
        completed: false,
        userId: 1,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to add todo");
    }

    return await res.json();
  },
};
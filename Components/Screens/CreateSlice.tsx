import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  TaskName: string;
  Category: string;
  Date: string;
  Description: string;
  Start: string;
  End: string;
}

interface CounterState {
  todos: Todo[];
}

const initialState: CounterState = {
  todos: [],
};

const CreateSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos.splice(action.payload, 1);
    },
    updateTodo: (
      state,
      action: PayloadAction<{ index: number; todo: Todo }>
    ) => {
      state.todos[action.payload.index] = action.payload.todo;
    },
  },
});

export const { addTodo, deleteTodo, updateTodo } = CreateSlice.actions;
export default CreateSlice.reducer;

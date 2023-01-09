import {guid, ITodo} from "../interfaces/todo.interface";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./todo.store";
import * as uuidv4 from 'uuid';
import {Status} from "../interfaces/status.enum";

export interface ITodoState {
    todos: ITodo[]
}

const initialState: ITodoState = {
    todos: [{
        descriere: 'Test',
        titlu: 'Test',
        status: Status.Terminat,
        id: '2acf6f30-fbd1-4a40-8525-03141102ac2a'
    }]
}

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state: ITodoState, action: PayloadAction<ITodo>) => {
            action.payload.id = uuidv4.v4();
            state.todos.push(action.payload);
        },
        updateTodo: (state: ITodoState, action: PayloadAction<ITodo>) => {
            const index = state.todos.findIndex(todo => todo.id === action.payload.id);
            state.todos[index] = action.payload;
        },
        deleteTodo: (state: ITodoState, action: PayloadAction<guid>) => {
            const index = state.todos.findIndex(todo => todo.id === action.payload);
            state.todos.splice(index, 1);
        }
    }
});

export const { addTodo, updateTodo, deleteTodo } = todosSlice.actions;
export const selectTodos = (state: RootState) => state.todos.todos;

export default todosSlice.reducer;
import React from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./redux/todo.hooks";
import {addTodo, deleteTodo, selectTodos, updateTodo} from "./redux/todo.slice";
import {TableComponent} from "./components/TableComponent";
import {ITodo} from "./interfaces/todo.interface";
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {RefTodoFormDialog, TodoFormDialog} from "./components/TodoFormDialog";
import {Status} from "./interfaces/status.enum";

function App() {

  const todos = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();
  const dialogRef = React.createRef<RefTodoFormDialog>();

  const createTodoEvent = () => dialogRef.current?.open((elem) => dispatch(addTodo(elem)));
  const updateTodoEvent = (todo: ITodo) => dialogRef.current?.open((elem) => dispatch(updateTodo(elem)) ,todo);
  const deleteTodoEvent = (todo: ITodo) => dispatch(deleteTodo(todo.id));

  const rotateStatus = (elem: ITodo) => {
      const todo = Object.assign({}, elem);
      switch (todo.status) {
          case Status.DeFacut:
              todo.status = Status.InProgres;
              dispatch(updateTodo(todo));
              break;
          case Status.InProgres:
              todo.status = Status.Terminat;
              dispatch(updateTodo(todo));
              break;
          case Status.Terminat:
              todo.status = Status.DeFacut;
              dispatch(updateTodo(todo));
              break;
          default:
              break;
      }
  }

  return (
      <>
          <Box sx={{ flexGrow: 1 }} >
              <AppBar position={'static'}>
                  <Toolbar>
                      <Typography component={'div'} variant={'h6'} sx={{ flexGrow: 1}} > Proiect React PIU</Typography>
                      <Button color={'inherit'} onClick={createTodoEvent} >
                          Create todo
                      </Button>
                  </Toolbar>
              </AppBar>
          </Box>
          <Box sx={{margin: '2rem 2rem'}} >
              <TableComponent
                  headers={[{ key: 'Titlu', value: 'titlu' }, { key: 'Descriere', value: 'descriere'}, {key: 'Status', value: 'status'}]}
                  rowActions={{
                    status: rotateStatus
                  }}
                  items={todos}
                  deleteFunc={deleteTodoEvent}
                  updateFunc={updateTodoEvent}
              />
          </Box>
          <TodoFormDialog ref={dialogRef} />
      </>
  );
}

export default App;

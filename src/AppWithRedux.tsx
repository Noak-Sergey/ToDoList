import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)


    const removeTask = useCallback (function (id: string, todolistId: string) {
        const action = removeTaskAC(id,todolistId);
        dispatch(action)
    }, [dispatch] );

    const addTask = useCallback (function (title: string, todolistId: string) {
        dispatch(addTaskAC(title,todolistId))
    }, [dispatch] );

    const changeStatus = useCallback (function (id: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(id,isDone,todolistId)
        dispatch(action);
    }, [dispatch] );

    const changeTaskTitle = useCallback (function (id: string, newTitle: string, todolistId: string) {
        const action = changeTaskTitleAC(id,newTitle,todolistId)
        dispatch(action);
    }, [dispatch] );

    const changeFilter = useCallback (function (value: FilterValuesType, todolistId: string) {
        dispatch (changeTodolistFilterAC(value, todolistId))
    }, [dispatch] );

    const removeTodolist = useCallback (function (id: string) {
        const action = removeTodolistAC(id)
        dispatch(action);
    }, [dispatch] );

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        dispatch(changeTodolistTitleAC(id,title));
    },[dispatch] )

    const addTodolist = useCallback ((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action);
    },[dispatch]);

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;

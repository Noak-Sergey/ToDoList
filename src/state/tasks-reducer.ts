import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskACType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}

export type addTaskACType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

export type ChangeTaskStatusACType = {
    type: 'CHANGE-TASK-STATUS'
    taskID: string
    isDone: boolean
    todolistId: string
}

export type ChangeTaskTitleACType = {
    type: 'CHANGE-TASK-TITLE'
    taskID: string
    title: string
    todolistId: string
}

type ActionsType = RemoveTaskACType | addTaskACType | ChangeTaskStatusACType
    | ChangeTaskTitleACType | AddTodolistActionType | RemoveTodolistActionType;

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = state[action.todolistId];
            const filteredTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            const newTask = {id: v1(), title: action.title, isDone: false};
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todolistId] = newTasks;
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskID ? {...t, isDone: action.isDone} : t);
            return ({...state})
        }
        case 'CHANGE-TASK-TITLE' : {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskID ? {...t, title: action.title} : t);
            return ({...state})
        }
        case 'ADD-TODOLIST' : {
            const stateCopy = {...state};
            stateCopy[action.todolistId] = [];
            return stateCopy;
        }
        case 'REMOVE-TODOLIST' : {
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy;
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskACType => {
    return {type: 'REMOVE-TASK', todolistId, taskId: taskId}
}
export const addTaskAC = (title: string, todolistId: string): addTaskACType => {
    return {type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistId: string): ChangeTaskStatusACType => {
    return {type: 'CHANGE-TASK-STATUS', isDone, todolistId, taskID}
}
export const changeTaskTitleAC = (taskID: string, title: string, todolistId: string): ChangeTaskTitleACType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskID}
}

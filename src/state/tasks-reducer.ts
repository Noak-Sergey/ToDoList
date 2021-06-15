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

export type ChangeTaskStatusACType ={
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

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
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
            const newTasks = [newTask,...tasks];
            stateCopy[action.todolistId]=newTasks;
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId];
            let task = tasks.find(t => t.id === action.taskID);
            if (task) {
                task.isDone = action.isDone;
            }
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE' : {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId];
            let task = tasks.find(t => t.id === action.taskID);
            if (task) {
                task.title = action.title;
            }
            return stateCopy
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
            throw new Error("I don't understand this action type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskACType => {
    return {type: 'REMOVE-TASK', todolistId, taskId: taskId}
}
export const addTaskAC = (title: string, todolistId:string): addTaskACType => {
    return {type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskID: string, isDone:boolean, todolistId:string): ChangeTaskStatusACType => {
    return {type: 'CHANGE-TASK-STATUS', isDone, todolistId, taskID}
}
export const changeTaskTitleAC = (taskID: string, title:string, todolistId:string): ChangeTaskTitleACType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskID}
}

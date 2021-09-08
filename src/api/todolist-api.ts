import axios from 'axios';

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1`,
    withCredentials: true,
    headers: {
        'API-KEY': '35086c75-b096-4bcf-9631-0257dc2ea2c7'
    }
})

type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type CommonResponseType<T = {}> = {
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
    data: T
}

export const todolistApi = {
    getTodolist() {
        return instance.get<Array<TodoType>>('/todo-lists')
    },
    createTodo(title: string) {
        return instance.post<CommonResponseType<{item: TodoType}>>('/todo-lists', {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<CommonResponseType>(`/todo-lists/${todolistId}`)
    },
    updateTodo(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`/todo-lists/${todolistId}`, {title})
    }
}

export const taskApi = {
    getTasks(todolistId:string) {
        return instance.get(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId:string, title: string) {
        return instance.post(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId:string, taskId: string) {
        return instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId:string, taskId: string) {
        return instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
}

import { Socket } from "socket.io-client"
import { useIo } from "./useIo"

export const loginUser = (io: Socket, login: string, password: string) => {
    return new Promise((resolve, reject) => {
        io.emit("user:login", { login, password })
        io.once("user:login:success", (user) => {
            resolve(user)
        })
        io.once("user:login:failed", (error) => {
            reject(error)
        })
    })
}

export const createUser = (
    io: Socket,
    username: string,
    email: string,
    password: string,
    name: string,
    cpf: string,
    birth: string,
    phone: string
) => {
    return new Promise((resolve, reject) => {
        io.emit("user:new", { username, email, password, name, cpf, birth, phone })
        io.once("user:new:success", (user) => {
            resolve(user)
        })
        io.once("user:new:failed", (error) => {
            reject(error)
        })
    })
}

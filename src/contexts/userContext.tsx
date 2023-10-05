import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"

interface UserContextValue {
    user: User | null
    setUser: (user: User | null) => void

    list: User[]
    addUser: (user: User) => void

    connectedList: User[]
    connected: boolean
}

interface UserProviderProps {
    children: React.ReactNode
}

export const UserContext = createContext<UserContextValue>({} as UserContextValue)

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const io = useIo()

    const [user, setUser] = useState<User | null>(null)
    const [list, setList] = useState<User[]>([])
    const [connectedList, setconnectedList] = useState<User[]>([])
    const [connected, setConnected] = useState(false)

    const addUser = (user: User) => {
        setList((prevList) => [...prevList.filter((item) => item.id != user.id), user])
    }

    const addConnectedUser = (user: User) => {
        setconnectedList((prevList) => [...prevList.filter((item) => item.id != user.id), user])
    }

    useEffect(() => {
        console.log({ connectedList })
        io.on("user:connect", (user) => {
            console.log(`connected: ${user.username}`)
            addConnectedUser(user)
        })

        io.on("user:disconnect", (user) => {
            console.log(`disconnected:${user.username}`)
            setconnectedList(connectedList.filter((item) => item.id != user.id))
        })

        return () => {
            io.off("user:connect")
            io.off("user:disconnect")
        }
    }, [connectedList])

    useEffect(() => {
        console.log({ list })

        io.on("user:update", (data) => {
            addUser(data)
            if (data.id == user?.id) setUser(data)
        })

        io.on("user:new", (user) => {
            addUser(user)
        })

        io.on("user:sync", (user) => {
            setList((prevList) => [...prevList.filter((item) => item.id != user.id), user])
        })

        io.on("user:delete", (user) => {
            setList((prevList) => prevList.filter((item) => item.id != user.id))
        })
        return () => {
            io.off("user:sync")
            io.off("user:update")
            io.off("user:new")
            io.off("user:delete")
        }
    }, [list])

    useEffect(() => {
        console.log({ user })
        if (user) {
            io.on("connect", () => {
                console.log("reconnected, syncing user")
                io.emit("client:sync", user)
            })

            io.on("diconnect", () => {
                setConnected(false)
            })

            io.on("client:sync", (users: User[]) => {
                setConnected(true)
                setList(users)
            })

            io.on("connected:sync", (users: User[]) => {
                setconnectedList(users)
            })
        }

        return () => {
            io.off("connect")
            io.off("disconnect")
            io.off("client:sync")
            io.off("connected:sync")
        }
    }, [user])

    return (
        <UserContext.Provider value={{ user, setUser, connected, list, connectedList, addUser }}>
            {children}
        </UserContext.Provider>
    )
}

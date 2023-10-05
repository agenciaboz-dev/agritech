import React, { useState, useContext } from "react"
import { UserContext } from "../contexts/userContext"
import { View, TextInput, Button } from "react-native"
import { createUser } from "../hooks/useUser"
import { useIo } from "../hooks/useIo"

interface SignupProps {}

export const Signup: React.FC<SignupProps> = ({}) => {
    const [id, setId] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [cpf, setCpf] = useState("")
    const [birth, setBirth] = useState("")
    const [phone, setphone] = useState("")

    const { addUser } = useContext(UserContext)
    const io = useIo()

    const handleSignup = async () => {
        const io = useIo()
        const user = await createUser(io, username, email, password, name, cpf, birth, phone)
        if (user) {
            addUser(user)
        } else {
            // Mostrar mensagem de erro
        }
    }

    return (
        <View style={{ justifyContent: "center", alignItems: "center", padding: 100, gap: 20 }}>
            <TextInput
                placeholder="Nome"
                value={name}
                style={{ fontFamily: "MalgunGothic2", fontSize: 20 }}
                onChangeText={setName}
            />
            <TextInput
                placeholder="E-mail"
                value={email}
                style={{ fontFamily: "MalgunGothic2", fontSize: 20 }}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="username"
                value={username}
                style={{ fontFamily: "MalgunGothic2", fontSize: 20 }}
                onChangeText={setUsername}
            />
            <TextInput
                placeholder="CPF"
                value={cpf}
                style={{ fontFamily: "MalgunGothic2", fontSize: 20 }}
                onChangeText={setCpf}
            />
            <TextInput
                placeholder="Senha"
                secureTextEntry={true}
                value={password}
                style={{ fontFamily: "MalgunGothic2", fontSize: 20 }}
                onChangeText={setPassword}
            />
            <Button title="Cadastrar" onPress={handleSignup} />
        </View>
    )
}

import React, { useContext, useState } from "react"
import { View, TextInput, Button } from "react-native"
import { UserContext } from "../contexts/userContext"
import { loginUser } from "../hooks/useUser"
import { NavigationProp } from "@react-navigation/native"
import { useIo } from "../hooks/useIo"

interface LoginProps {
    navigation: NavigationProp<any, any>
}

export const Login: React.FC<LoginProps> = ({ navigation }) => {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    const { setUser } = useContext(UserContext)

    const handleLogin = async () => {
        const io = useIo()
        const user = await loginUser(io, login, password)
        if (user) {
            setUser(user)
        } else {
            // Mostrar mensagem de erro
        }
    }
    return (
        <View style={{ paddingVertical: 200, paddingHorizontal: 50, alignItems: "center", gap: 20 }}>
            <TextInput
                placeholder="E-mail, nome de usuário ou CPF"
                style={{ fontFamily: "MalgunGothic2", fontSize: 20 }}
                value={login}
                onChangeText={setLogin}
            />
            <TextInput
                placeholder="Senha"
                style={{ fontFamily: "MalgunGothic2", fontSize: 20 }}
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Entrar" onPress={handleLogin} />
            <Button title="Cadastre-se" onPress={() => navigation.navigate("Signup")} />
        </View>
    )
}

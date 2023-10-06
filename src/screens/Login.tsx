import React, { useContext, useState } from "react"
import { View, TextInput, Button } from "react-native"
import { UserContext } from "../contexts/userContext"
import { loginUser } from "../hooks/useUser"
import { NavigationProp } from "@react-navigation/native"
import { useIo } from "../hooks/useIo"
import { useApi } from "../hooks/useApi"

interface LoginProps {
    navigation: NavigationProp<any, any>
}

export const Login: React.FC<LoginProps> = ({ navigation }) => {
    const api = useApi()
    const io = useIo()
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    const { setUser } = useContext(UserContext)

    const handleLogin = async () => {
        const login = (values: LoginForm, setLoading: (value: boolean) => void) => {
            setLoading(true)
            api.user.login({
                data: values,
                callback: (response: { data?: User }) => {
                    const user = response.data
                    if (user) {
                        setUser(user)
                        io.emit("client:sync", user)

                        alert({ severity: "success", text: "logado" })
                    } else {
                        alert({ severity: "error", text: "não foi possível fazer login" })
                    }
                },
                finallyCallback: () => setLoading(false),
            })
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

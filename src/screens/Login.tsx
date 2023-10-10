import React, { useContext, useEffect, useState } from "react"
import { View, Image } from "react-native"
import UserContext from "../contexts/userContext"
import { useUser } from "../hooks/useUser"
import { NavigationProp } from "@react-navigation/native"
import { useIo } from "../hooks/useIo"
import { LinearGradient } from "expo-linear-gradient"
import { colors } from "../style/colors"
import { Text, TextInput, Button } from "react-native-paper"
import { image } from "../image"
import input from "../style/input"

interface LoginProps {
    navigation: NavigationProp<any, any>
}

export const Login: React.FC<LoginProps> = ({ navigation }) => {
    const io = useIo()
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const { user } = useUser()

    const { setUser } = useContext(UserContext)

    const handleLogin = async (user: User | null) => {
        const data = { login, password }

        io.emit("client:sync", user)
        io.emit("user:login", data)
    }
    useEffect(() => {
        io.on("user:login:success", (user: User) => {
            console.log("Usuário definido:", user)
            setUser(user)
            if (user) {
                alert("Eba, voce logou!!!!!!!!!!!!!!")
                navigation.navigate("Home")
            }
        })

        io.on("user:login:failed", () => {
            alert("Usuário ou senha incorreta!")
        })

        return () => {
            io.off("user:login:success")
            io.off("user:login:failed")
        }
    })

    return (
        <View
            style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                backgroundColor: colors.primary,
            }}
        >
            <LinearGradient
                colors={[colors.secondary, colors.primary]}
                style={{
                    flex: 0.6,
                    width: "100%",
                    paddingHorizontal: 20,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Image
                    source={image.logo}
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        width: 130,
                        resizeMode: "cover",
                    }}
                />
            </LinearGradient>
            <View
                style={{
                    paddingTop: 20,
                    padding: 20,
                    width: "100%",
                    backgroundColor: "#fff",
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    flex: 1,
                    gap: 10,
                }}
            >
                <Text
                    style={{
                        color: colors.text.black,
                        fontSize: 23,
                        fontFamily: "MalgunGothic2",
                        paddingTop: 15,
                        height: "14%",
                    }}
                >
                    Login
                </Text>
                <TextInput
                    mode="outlined"
                    placeholder="E-mail, nome de usuário ou CPF"
                    style={input.content}
                    outlineStyle={input.border}
                    value={login}
                    onChangeText={setLogin}
                />
                <TextInput
                    mode="outlined"
                    placeholder="Senha"
                    style={input.content}
                    outlineStyle={input.border}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
                <Button mode="contained" buttonColor={colors.button} onPress={() => handleLogin(user)}>
                    Entrar
                </Button>
                <Button labelStyle={{ color: colors.text.black }} onPress={() => navigation.navigate("Signup")}>
                    Cadastre-se
                </Button>
            </View>
        </View>
    )
}

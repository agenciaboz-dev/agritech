import React, { useContext, useState, useEffect } from "react"
import { View, TextInput } from "react-native"
import { useIo } from "../hooks/useIo"
import { useApi } from "../hooks/useApi"
import { useUser } from "../hooks/useUser"
import { LinearGradient } from "expo-linear-gradient"
import { colors } from "../style/colors"
import { Button, Text } from "react-native-paper"
import { Formik, Form } from "formik"

export const Signup: React.FC = () => {
    const io = useIo()
    const { login, setUser } = useUser()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [cpf, setCpf] = useState("")
    const [password, setPassword] = useState("")
    const [birth, setBirth] = useState("")
    const [phone, setPhone] = useState("")

    const handleSignup = async () => {
        const data = { name, email, username, cpf, password, birth, phone }
        console.log(data)
        io.emit("user:signup", data)
    }

    useEffect(() => {
        io.on("user:signup:success", (user: User) => {
            // feedback visual de acesso
            login({ login: user.username, password: user.password })
        })

        io.on("user:login:success", (user: User) => {
            setUser(user)
        })

        io.on("user:signup:failed", () => {
            alert("Falha no cadastro")
        })

        return () => {
            io.off("user:signup:success")
            io.off("user:signup:failed")
            io.off("user:login:success")
        }
    }, [])

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
                    flex: 0.15,
                    width: "100%",

                    paddingHorizontal: 20,

                    justifyContent: "center",
                }}
            >
                <Text style={{ color: "#fff", fontSize: 23, paddingTop: 15, height: "50%" }}>Registre-se</Text>
            </LinearGradient>

            <Formik initialValues={{}} onSubmit={handleSignup}>
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <View
                        style={{
                            paddingTop: 20,
                            padding: 20,
                            width: "100%",
                            backgroundColor: "#fff",
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,

                            flex: 1,
                            gap: 20,
                        }}
                    >
                        <Text style={{ fontSize: 20 }}>Informações Pessoais</Text>
                        <TextInput
                            placeholder="Nome"
                            value={name}
                            style={{ fontFamily: "MalgunGothicBold", fontSize: 15 }}
                            onChangeText={setName}
                        />
                        <TextInput
                            placeholder="E-mail"
                            value={email}
                            style={{ fontFamily: "MalgunGothicBold", fontSize: 15 }}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            placeholder="Username"
                            value={username}
                            style={{ fontFamily: "MalgunGothicBold", fontSize: 15 }}
                            onChangeText={setUsername}
                        />
                        <TextInput
                            placeholder="CPF"
                            value={cpf}
                            style={{ fontFamily: "MalgunGothicBold", fontSize: 15 }}
                            onChangeText={setCpf}
                        />
                        <TextInput
                            placeholder="Senha"
                            secureTextEntry={true}
                            value={password}
                            style={{ fontFamily: "MalgunGothicBold", fontSize: 15 }}
                            onChangeText={handleChange("email")}
                        />
                        <Button mode="contained" buttonColor={colors.button} onPress={handleSignup}>
                            Cadastrar
                        </Button>
                    </View>
                )}
            </Formik>
        </View>
    )
}

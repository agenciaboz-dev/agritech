import React, { useContext, useState, useEffect } from "react"
import { StyleProp, TextStyle, View } from "react-native"
import { useIo } from "../hooks/useIo"
import { useUser } from "../hooks/useUser"
import { LinearGradient } from "expo-linear-gradient"
import { colors } from "../style/colors"
import { Avatar, Button, Text, TextInput, Snackbar } from "react-native-paper"
import { Formik, Form } from "formik"
import TextInputMask from "react-native-text-input-mask"

interface FormValues {
    name: string
    email: string
    username: string
    password: string
    cpf: string
    birth: string
    phone: string
}

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

    const initialValues: FormValues = {
        name: " ",
        email: " ",
        username: " ",
        password: " ",
        cpf: " ",
        birth: "",
        phone: " ",
    }

    const inputStyle = { height: 45, borderColor: colors.button }
    const textStyle: StyleProp<TextStyle> = { fontSize: 13, fontFamily: "MalgunGothic2", justifyContent: "center" }

    const handleSignup = async () => {
        const data = { name, email, username, cpf, password, birth, phone }
        console.log(data)
        io.emit("user:signup", data)
    }

    useEffect(() => {
        io.on("user:signup:success", (user: User) => {
            alert("Cadastrado! Faça login.")
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

            <Formik initialValues={initialValues} onSubmit={handleSignup}>
                {({ handleChange, values }) => (
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
                        <Text style={{ fontSize: 20 }}>Informações Pessoais</Text>
                        <View style={{ flexDirection: "row", gap: 15, width: "100%", alignItems: "center" }}>
                            <Avatar.Icon size={110} icon="account" style={{ backgroundColor: "hsl(220,9%,87%)" }} />
                            <View style={{ flexDirection: "column", gap: 10, width: "65%" }}>
                                <Text style={{ fontWeight: "500" }}>Foto</Text>
                                <Text style={{ fontSize: 11 }}>
                                    Clique na imagem ao lado para adicionar uma foto sua. A foto deve estar plenamente
                                    visível e sem adereços.
                                </Text>
                            </View>
                        </View>
                        <TextInput
                            mode="outlined"
                            label={"Nome"}
                            value={name}
                            contentStyle={textStyle}
                            outlineStyle={inputStyle}
                            onChangeText={setName}
                        />
                        <TextInput
                            mode="outlined"
                            label={"CPF"}
                            value={cpf}
                            outlineStyle={inputStyle}
                            style={textStyle}
                            onChangeText={setCpf}
                        />
                        <TextInput
                            mode="outlined"
                            label={"E-mail"}
                            value={email}
                            outlineStyle={inputStyle}
                            style={textStyle}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            mode="outlined"
                            label={"Telefone"}
                            value={phone}
                            outlineStyle={inputStyle}
                            style={textStyle}
                            onChangeText={setPhone}
                        />

                        <TextInput
                            mode="outlined"
                            label={"Username"}
                            value={username}
                            outlineStyle={inputStyle}
                            style={textStyle}
                            onChangeText={setUsername}
                        />
                        <TextInput
                            mode="outlined"
                            label={"Senha"}
                            secureTextEntry={true}
                            value={password}
                            outlineStyle={inputStyle}
                            style={textStyle}
                            onChangeText={handleChange("password")}
                        />
                        <Button
                            mode="contained"
                            labelStyle={{ fontSize: 17 }}
                            buttonColor={colors.button}
                            onPress={handleSignup}
                        >
                            Cadastrar
                        </Button>
                    </View>
                )}
            </Formik>
        </View>
    )
}

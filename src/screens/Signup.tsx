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

    street: string
    district: string
    number: string
    city: string
    cep: string
    uf: string
    complement: string
}

export const Signup: React.FC = () => {
    const io = useIo()
    const { login, setUser } = useUser()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [cpf, setCpf] = useState("")
    const [phone, setPhone] = useState("")
    const [birth, setBirth] = useState("")
    const [password, setPassword] = useState("")
    const [street, setStreet] = useState("")
    const [district, setDistrict] = useState("")
    const [number, setNumber] = useState("")
    const [city, setCity] = useState("")
    const [cep, setCep] = useState("")
    const [uf, setUf] = useState("")
    const [complement, setComplement] = useState("")

    const [currentStep, setCurrentStep] = useState(1)

    const initialValues: FormValues = {
        name: " ",
        email: " ",
        username: " ",
        password: " ",
        cpf: " ",
        birth: "",
        phone: " ",

        street: "",
        district: "",
        number: "",
        city: "",
        cep: "",
        uf: "",
        complement: "",
    }

    const inputStyle = { height: 45, borderColor: colors.button }
    const textStyle: StyleProp<TextStyle> = { fontSize: 13, fontFamily: "MalgunGothic2", justifyContent: "center" }

    const handleSignup = async () => {
        const data = {
            name,
            email,
            username,
            cpf,
            password,
            birth,
            phone,
            address: { street, district, number, city, cep, uf, complement },
        }
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
                        {currentStep === 1 && (
                            <>
                                <Text style={{ fontSize: 20 }}>Informações Pessoais</Text>
                                <View style={{ flexDirection: "row", gap: 15, width: "100%", alignItems: "center" }}>
                                    <Avatar.Icon size={110} icon="account" style={{ backgroundColor: "hsl(220,9%,87%)" }} />
                                    <View style={{ flexDirection: "column", gap: 10, width: "65%" }}>
                                        <Text style={{ fontWeight: "500" }}>Foto</Text>
                                        <Text style={{ fontSize: 11 }}>
                                            Clique na imagem ao lado para adicionar uma foto sua. A foto deve estar
                                            plenamente visível e sem adereços.
                                        </Text>
                                    </View>
                                </View>
                                <TextInput
                                    mode="outlined"
                                    label={"Nome"}
                                    value={name}
                                    style={textStyle}
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
                                    onChangeText={setPassword}
                                />
                                <Button
                                    mode="contained"
                                    labelStyle={{ fontSize: 17 }}
                                    buttonColor={colors.button}
                                    onPress={() => {
                                        setCurrentStep(2)
                                    }}
                                >
                                    Próximo
                                </Button>
                            </>
                        )}
                        {currentStep === 2 && (
                            <>
                                <Text style={{ fontSize: 20 }}>Endereço Residencial</Text>
                                <TextInput
                                    mode="outlined"
                                    label={"Logradouro"}
                                    value={street}
                                    outlineStyle={inputStyle}
                                    style={{ ...textStyle }}
                                    onChangeText={setStreet}
                                />
                                <TextInput
                                    mode="outlined"
                                    label={"Bairro"}
                                    value={district}
                                    outlineStyle={inputStyle}
                                    style={textStyle}
                                    onChangeText={setDistrict}
                                />
                                <View style={{ width: "100%", flexDirection: "row", gap: 7 }}>
                                    <TextInput
                                        mode="outlined"
                                        label={"Número"}
                                        value={number}
                                        outlineStyle={inputStyle}
                                        style={textStyle}
                                        onChangeText={setNumber}
                                    />
                                    <TextInput
                                        mode="outlined"
                                        label={"CEP"}
                                        value={cep}
                                        outlineStyle={inputStyle}
                                        style={{ ...textStyle, width: "76%" }}
                                        onChangeText={setCep}
                                    />
                                </View>

                                <View style={{ width: "100%", flexDirection: "row", gap: 7 }}>
                                    <TextInput
                                        mode="outlined"
                                        label={"Cidade"}
                                        value={city}
                                        outlineStyle={inputStyle}
                                        style={{ ...textStyle, width: "68%" }}
                                        onChangeText={setCity}
                                    />
                                    <TextInput
                                        mode="outlined"
                                        label={"Estado"}
                                        value={uf}
                                        outlineStyle={inputStyle}
                                        style={{ ...textStyle, width: "30%" }}
                                        onChangeText={setUf}
                                    />
                                </View>

                                <Button
                                    mode="contained"
                                    labelStyle={{ fontSize: 17, color: "black" }}
                                    buttonColor={"hsl(220,9%,87%)"}
                                    onPress={() => {
                                        setCurrentStep(1)
                                    }}
                                >
                                    Voltar
                                </Button>
                                <Button
                                    mode="contained"
                                    labelStyle={{ fontSize: 17 }}
                                    buttonColor={colors.button}
                                    onPress={handleSignup}
                                >
                                    Cadastrar
                                </Button>
                            </>
                        )}
                    </View>
                )}
            </Formik>
        </View>
    )
}

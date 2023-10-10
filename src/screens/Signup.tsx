import React, { useContext, useState, useEffect } from "react"
import { StyleProp, TextStyle, View } from "react-native"
import { useIo } from "../hooks/useIo"
import { useUser } from "../hooks/useUser"
import { LinearGradient } from "expo-linear-gradient"
import { colors } from "../style/colors"
import { Avatar, Button, Text, TextInput, Snackbar, Checkbox, RadioButton } from "react-native-paper"
import { Formik } from "formik"
import { NavigationProp } from "@react-navigation/native"

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

interface SignupProps {
    navigation: NavigationProp<any, any>
}
export const Signup: React.FC<SignupProps> = ({ navigation }) => {
    const io = useIo()
    const { login, setUser } = useUser()
    const [typeUser, setTypeUser] = useState("productor")

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
    const [gender, setGender] = useState("F")

    const [currentStep, setCurrentStep] = useState(0)

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
            if (user) {
                alert("Cadastrado! Faça login.")
                //login({ login: user.username, password: user.password })
                navigation.navigate("Login")
            }
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
                <Text style={{ color: colors.text.white, fontSize: 23, paddingTop: 15, height: "50%" }}>Registre-se</Text>
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
                        {currentStep === 0 && (
                            <View style={{ justifyContent: "center", alignItems: "center", flex: 1, width: "98%", gap: 30 }}>
                                <Text style={{ fontSize: 17 }}>Selecione o tipo de conta</Text>
                                <>
                                    <RadioButton.Group
                                        onValueChange={(value) => {
                                            setTypeUser(value)
                                        }}
                                        value={typeUser}
                                    >
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <RadioButton.IOS value="productor" />
                                            <Text
                                                style={{ fontWeight: typeUser == "productor" ? "800" : "400", fontSize: 18 }}
                                                onPress={() => {
                                                    setTypeUser("productor")
                                                    setCurrentStep(1)
                                                }}
                                            >
                                                Produtor
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <RadioButton.IOS value="employee" />
                                            <Text
                                                style={{
                                                    fontWeight: typeUser == "employee" ? "800" : "400",
                                                    fontSize: 18,
                                                    fontFamily: "MalgunGothic2",
                                                }}
                                                onPress={() => {
                                                    setTypeUser("employee")
                                                    setCurrentStep(1)
                                                }}
                                            >
                                                Funcionário
                                            </Text>
                                        </View>
                                    </RadioButton.Group>
                                </>
                            </View>
                        )}
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
                                <View>
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
                                        label={"Data de Nascimento"}
                                        value={birth}
                                        outlineStyle={inputStyle}
                                        style={textStyle}
                                        onChangeText={setBirth}
                                    />
                                    <TextInput
                                        mode="outlined"
                                        label={"E-mail"}
                                        value={email}
                                        outlineStyle={inputStyle}
                                        style={textStyle}
                                        onChangeText={setEmail}
                                    />
                                    {typeUser == "employee" && (
                                        <>
                                            <Text style={{ fontSize: 15 }}>Gênero</Text>
                                            <RadioButton.Group
                                                onValueChange={(value) => {
                                                    setGender(value)
                                                }}
                                                value={gender}
                                            >
                                                <View>
                                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                        <RadioButton.IOS value="F" />
                                                        <Text
                                                            style={{
                                                                fontWeight: gender == "F" ? "800" : "400",
                                                                fontSize: 15,
                                                            }}
                                                            onPress={() => {
                                                                setGender("F")
                                                            }}
                                                        >
                                                            Feminino
                                                        </Text>
                                                    </View>
                                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                        <RadioButton.IOS value="M" />
                                                        <Text
                                                            style={{
                                                                fontWeight: gender == "M" ? "800" : "400",
                                                                fontSize: 15,
                                                                fontFamily: "MalgunGothic2",
                                                            }}
                                                            onPress={() => {
                                                                setGender("M")
                                                            }}
                                                        >
                                                            Masculino
                                                        </Text>
                                                    </View>
                                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                        <RadioButton.IOS value="other" />
                                                        <Text
                                                            style={{
                                                                fontWeight: gender == "others" ? "800" : "400",
                                                                fontSize: 15,
                                                                fontFamily: "MalgunGothic2",
                                                            }}
                                                            onPress={() => {
                                                                setGender("other")
                                                            }}
                                                        >
                                                            Outro
                                                        </Text>
                                                    </View>
                                                </View>
                                            </RadioButton.Group>
                                        </>
                                    )}
                                </View>
                                <Button
                                    mode="contained"
                                    labelStyle={{ fontSize: 17, color: "black", width: "100%" }}
                                    buttonColor={"hsl(220,9%,87%)"}
                                    onPress={() => {
                                        setCurrentStep(0)
                                    }}
                                >
                                    Voltar
                                </Button>
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
                                <Text style={{ fontSize: 20 }}>Login</Text>

                                <View>
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
                                </View>
                                <Text style={{ fontSize: 20 }}>Dados para contato</Text>
                                <View>
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
                                {typeUser === "employee" && (
                                    <Button
                                        mode="contained"
                                        labelStyle={{ fontSize: 17 }}
                                        buttonColor={colors.button}
                                        onPress={() => {
                                            setCurrentStep(3)
                                        }}
                                    >
                                        Próximo
                                    </Button>
                                )}
                            </>
                        )}
                        {currentStep === 3 && typeUser === "employee" && (
                            <>
                                <Text style={{ fontSize: 20 }}>Documentação</Text>
                                <View style={{ gap: 20 }}>
                                    <View>
                                        <TextInput
                                            mode="outlined"
                                            label={"Nº do título de eleitor"}
                                            value={uf}
                                            outlineStyle={inputStyle}
                                            style={{ ...textStyle, width: "100%" }}
                                            onChangeText={setUf}
                                        />
                                        <TextInput
                                            mode="outlined"
                                            label={"Nº da carteira de trabalho"}
                                            value={uf}
                                            outlineStyle={inputStyle}
                                            style={{ ...textStyle, width: "100%" }}
                                            onChangeText={setUf}
                                        />
                                    </View>
                                    <View style={{ gap: 10 }}>
                                        <Text style={{ fontSize: 14 }}> Certificado de reservista</Text>
                                        <Button
                                            mode="contained"
                                            buttonColor={colors.button}
                                            style={{
                                                width: "50%",
                                                height: "17%",
                                            }}
                                            contentStyle={{ paddingHorizontal: 0, margin: 0 }}
                                            labelStyle={{ fontSize: 10, padding: 0 }}
                                        >
                                            Enviar documento
                                        </Button>
                                        <Text style={{ fontSize: 14 }}> Comprovante de Residência</Text>
                                        <Button
                                            mode="contained"
                                            buttonColor={colors.button}
                                            style={{
                                                width: "50%",
                                                height: "17%",
                                            }}
                                            contentStyle={{ paddingHorizontal: 0, margin: 0 }}
                                            labelStyle={{ fontSize: 10, padding: 0 }}
                                        >
                                            Enviar documento
                                        </Button>
                                    </View>

                                    <Button
                                        mode="contained"
                                        labelStyle={{ fontSize: 17, color: "black" }}
                                        buttonColor={"hsl(220,9%,87%)"}
                                        onPress={() => {
                                            setCurrentStep(2)
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
                                </View>
                            </>
                        )}

                        {typeUser == "productor" && currentStep == 2 && (
                            <Button
                                mode="contained"
                                labelStyle={{ fontSize: 17 }}
                                buttonColor={colors.button}
                                onPress={handleSignup}
                            >
                                Cadastrar
                            </Button>
                        )}
                    </View>
                )}
            </Formik>
        </View>
    )
}

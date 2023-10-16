import React, { useContext, useState, useEffect } from "react"
import { StyleProp, TextStyle, View } from "react-native"
import { useIo } from "../hooks/useIo"
import { useUser } from "../hooks/useUser"
import { LinearGradient } from "expo-linear-gradient"
import { colors } from "../style/colors"
import { Avatar, Button, Text, TextInput, Snackbar, RadioButton, ActivityIndicator } from "react-native-paper"
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
    complement?: string

    //Employee
    rg: number
    gender: string
    nationality: string
    relationship: string
    voter_card: string
    work_card: string
    military: string
    residence: string

    //Producer
    cnpj: string
}

interface SignupProps {
    navigation: NavigationProp<any, any>
}
export const Signup: React.FC<SignupProps> = ({ navigation }) => {
    const io = useIo()
    const { login, setUser } = useUser()
    const [typeUser, setTypeUser] = useState("producer")

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

    const [rg, setRg] = useState("")
    const [gender, setGender] = useState("F")
    const [nationality, setNationality] = useState("")
    const [relationship, setRelationship] = useState("")
    const [voter_card, setVoterCard] = useState("")
    const [work_card, setWorkCard] = useState("")
    const [military, setMilitary] = useState("")
    const [residence, setResidence] = useState("")

    const [cnpj, setCnpj] = useState("")

    const [currentStep, setCurrentStep] = useState(0)

    const [loading, setLoading] = useState(false)
    const [snackbarVisible, setSnackbarVisible] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")

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

        //Employee
        rg: 0,
        gender: " ",
        nationality: " ",
        relationship: " ",
        voter_card: " ",
        work_card: " ",
        military: " ",
        residence: " ",

        //Producer
        cnpj: " ",
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
        if (typeUser === "employee") {
            io.emit("user:signup", {
                ...data,
                employee: { rg, gender, nationality, relationship, voter_card, work_card, military, residence },
            })
            console.log(data)
        } else if (typeUser === "producer") {
            console.log(data)
            io.emit("user:signup", { ...data, producer: { cnpj } })
        }
        setLoading(true)
    }

    useEffect(() => {
        io.on("user:signup:success", (user: User) => {
            setLoading(false)
            setSnackbarMessage("Cadastro realizado com sucesso!")
            if (user) {
                setSnackbarVisible(true)
                //login({ login: user.username, password: user.password })
                navigation.navigate("Login")
            }
        })

        io.on("user:login:success", (user: User) => {
            setUser(user)
        })

        io.on("user:signup:failed", () => {
            setSnackbarMessage("Falha no cadastro!")
            setSnackbarVisible(true)
            setLoading(false)
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
                                            <RadioButton.IOS value="producer" />
                                            <Text
                                                style={{ fontWeight: typeUser == "producer" ? "800" : "400", fontSize: 18 }}
                                                onPress={() => {
                                                    setTypeUser("producer")
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
                                    <View style={{ flexDirection: "row", gap: 7, width: "98%" }}>
                                        <TextInput
                                            mode="outlined"
                                            label={"CPF"}
                                            value={cpf}
                                            outlineStyle={inputStyle}
                                            style={{ ...textStyle, width: "50%" }}
                                            onChangeText={setCpf}
                                        />
                                        {typeUser == "producer" && (
                                            <TextInput
                                                mode="outlined"
                                                label={"CNPJ"}
                                                value={cnpj}
                                                outlineStyle={inputStyle}
                                                style={{ ...textStyle, width: "50%" }}
                                                onChangeText={setCnpj}
                                            />
                                        )}
                                        {typeUser == "employee" && (
                                            <TextInput
                                                mode="outlined"
                                                label={"Rg"}
                                                value={rg}
                                                outlineStyle={inputStyle}
                                                style={{ ...textStyle, width: "50%" }}
                                                onChangeText={setRg}
                                            />
                                        )}
                                    </View>

                                    <TextInput
                                        mode="outlined"
                                        label={"Data de Nascimento"}
                                        value={name}
                                        outlineStyle={inputStyle}
                                        style={textStyle}
                                        onChangeText={setName}
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
                                            value={voter_card}
                                            outlineStyle={inputStyle}
                                            style={{ ...textStyle, width: "100%" }}
                                            onChangeText={setVoterCard}
                                        />
                                        <TextInput
                                            mode="outlined"
                                            label={"Nº da carteira de trabalho"}
                                            value={work_card}
                                            outlineStyle={inputStyle}
                                            style={{ ...textStyle, width: "100%" }}
                                            onChangeText={setWorkCard}
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

                        {typeUser == "producer" && currentStep == 2 && (
                            <Button
                                mode="contained"
                                labelStyle={{ fontSize: 17 }}
                                buttonColor={colors.button}
                                onPress={handleSignup}
                            >
                                {loading ? <ActivityIndicator animating={true} color={colors.text.white} /> : "Cadastrar"}
                            </Button>
                        )}
                    </View>
                )}
            </Formik>
        </View>
    )
}

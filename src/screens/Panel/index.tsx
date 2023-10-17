import React, { useEffect, useState } from "react"
import { Image, View } from "react-native"
import { Button, IconButton, Snackbar, Text, Icon, BottomNavigation } from "react-native-paper"
import { colors } from "../../style/colors"
import { useIo } from "../../hooks/useIo"
import { useUser } from "../../hooks/useUser"
import LinearGradient from "react-native-linear-gradient"
import { image } from "../../image"
import { Employee } from "../../components/Employee"
import { DrawerMenu } from "../../components/DrawerMenu"
import { NavigationProp } from "@react-navigation/native"
import { ButtonComponent } from "../../components/ButtonComponent"
import BottomMenu from "../../components/BottomMenu"

interface PanelProps {
    user: User
    navigation: NavigationProp<any, any>
}

export const Panel: React.FC<PanelProps> = ({ user, navigation }) => {
    const io = useIo()
    const { setUser } = useUser()

    const [snackbarVisible, setSnackbarVisible] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")

    const [visibleMenu, setvisibleMenu] = useState(false)

    const handleLogout = async () => {
        if (user) {
            io.emit("user:logout")
        }
    }
    const handleSnackbar = () => {
        setSnackbarMessage("Snackbar!")
        setSnackbarVisible(true)
    }

    console.log(visibleMenu)

    useEffect(() => {
        io.on("user:disconnect", () => {
            setUser(null)
            console.log(user)
            alert("desconectado")
        })

        return () => {
            io.off("user:disconnect")
        }
    })

    return (
        <>
            <View style={{ flex: 1, paddingTop: 22, backgroundColor: colors.button }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <View style={{ flexDirection: "row", paddingBottom: 10, alignItems: "center", paddingLeft: 20, gap: 7 }}>
                        <Image source={image.drone} style={{ width: 40 }} resizeMode="contain" />
                        <Text style={{ color: colors.text.white, fontSize: 20 }}>Painel</Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: 0 }}>
                        <IconButton icon={"magnify"} iconColor={colors.text.white} />
                        <IconButton icon={"bell-outline"} iconColor={colors.text.white} />

                        <IconButton
                            icon={"account-circle-outline"}
                            iconColor={colors.text.white}
                            onPress={() => {
                                setvisibleMenu((prevVisible) => !prevVisible)
                            }}
                        />
                    </View>
                </View>
                <View
                    style={{
                        justifyContent: "center",
                        flex: 1,
                        backgroundColor: colors.primary,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        paddingTop: 10,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            paddingBottom: 8,
                            justifyContent: "space-between",
                        }}
                    >
                        <Text style={{ color: colors.text.white, fontSize: 20, paddingLeft: 20 }}>Configuração de Kits</Text>
                        <IconButton
                            icon={"chevron-right"}
                            iconColor={colors.text.white}
                            onPress={() => navigation.navigate("SettingsKit")}
                        />
                    </View>
                    <View
                        style={{
                            padding: 20,
                            width: "100%",
                            backgroundColor: "#fff",
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            flex: 1,
                            gap: 50,
                        }}
                    >
                        <DrawerMenu adm visible={visibleMenu} />
                        <View>
                            <Text style={{ color: colors.text.black, fontSize: 20, paddingBottom: 20 }}>
                                Funcionários Fixados
                            </Text>
                            <View style={{ width: "100%" }}>
                                <Employee />
                                <Employee />
                            </View>
                            <View
                                style={{
                                    width: "100%",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: 20,
                                }}
                            >
                                <ButtonComponent title="Cadastrar novo funcionário" handleSubmit={() => {}} />
                                <View
                                    style={{
                                        flexDirection: "row",
                                        width: "20%",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Text style={{ color: colors.primary }} onPress={() => {}}>
                                        Ver todos
                                    </Text>
                                    <Icon source="chevron-right" color={colors.primary} size={15} />
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text style={{ color: colors.text.black, fontSize: 20, paddingBottom: 20 }}>
                                Produtores Fixados
                            </Text>
                            <View style={{ width: "100%" }}>
                                <Employee />
                                <Employee />
                            </View>
                            <View
                                style={{
                                    width: "100%",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: 20,
                                }}
                            >
                                <ButtonComponent title="Cadastrar novo funcionário" handleSubmit={() => {}} />
                                <View
                                    style={{
                                        flexDirection: "row",
                                        width: "20%",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Text style={{ color: colors.primary }} onPress={() => {}}>
                                        Ver todos
                                    </Text>
                                    <Icon source="chevron-right" color={colors.primary} size={15} />
                                </View>
                            </View>
                        </View>

                        {/* {Object.entries(user).map(([key, value]) => (
                        <Text key={key}>
                        {key}: {value}
                        </Text>
                    ))} */}

                        {/* <Button mode="contained" buttonColor={colors.button} onPress={handleLogout}>
                        Sair
                        </Button>
                        <Button mode="contained" buttonColor={colors.button} onPress={handleSnackbar}>
                        snackbar
                    </Button> */}
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}>
                            <Snackbar
                                visible={snackbarVisible}
                                onDismiss={() => setSnackbarVisible(false)}
                                duration={Snackbar.DURATION_SHORT}
                                style={{ width: "100%", backgroundColor: "green", alignSelf: "flex-end" }}
                                wrapperStyle={{ flex: 1 }}
                            >
                                {snackbarMessage}
                            </Snackbar>
                        </View>
                    </View>
                </View>
                <BottomMenu user={user} navigation={navigation} />
            </View>
        </>
    )
}

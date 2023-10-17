import React from "react"
import { View, Image } from "react-native"
import { Button, Icon, IconButton, Text } from "react-native-paper"
import { colors } from "../../style/colors"
import { image } from "../../image"
import { NavigationProp } from "@react-navigation/native"
import BottomMenu from "../../components/BottomMenu"

interface SettingsKitProps {
    navigation: NavigationProp<any, any>
    user: User
}

export const SettingsKit: React.FC<SettingsKitProps> = ({ user, navigation }) => {
    return (
        <>
            <View style={{ flex: 1, paddingTop: 22, backgroundColor: colors.button }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <View style={{ flexDirection: "row", paddingBottom: 10, alignItems: "center", paddingLeft: 5 }}>
                        <IconButton
                            icon={"keyboard-backspace"}
                            size={25}
                            iconColor={colors.text.white}
                            onPress={() => navigation.navigate("Home")}
                        />
                        <Text style={{ color: colors.text.white, fontSize: 20 }}>Painel</Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: 0 }}>
                        <IconButton icon={"magnify"} iconColor={colors.text.white} />
                        <IconButton icon={"bell-outline"} iconColor={colors.text.white} />

                        <IconButton
                            icon={"account-circle-outline"}
                            iconColor={colors.text.white}
                            onPress={() => {
                                //setvisibleMenu((prevVisible) => !prevVisible)
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
                            width: "100%",
                            flexDirection: "row",
                            alignItems: "center",
                            paddingBottom: 8,
                            justifyContent: "space-between",
                            paddingHorizontal: 20,
                            gap: 40,
                        }}
                    >
                        <Text style={{ color: colors.text.white, fontSize: 20 }}>Configuração de Kits</Text>
                        <View style={{ flexDirection: "row", gap: 5, alignItems: "center", width: "50%" }}>
                            <Button
                                mode="contained"
                                buttonColor={colors.text.white}
                                icon={"border-inside"}
                                labelStyle={{ color: colors.text.black }}
                            >
                                Adicionar Kit
                            </Button>
                        </View>
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
                    ></View>
                </View>
            </View>
            <BottomMenu user={user} navigation={navigation} />
        </>
    )
}

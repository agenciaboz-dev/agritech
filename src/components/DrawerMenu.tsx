import React, { useEffect, useState } from "react"
import { Drawer } from "react-native-paper"
import { colors } from "../style/colors"
import { View } from "react-native"
import { useIo } from "../hooks/useIo"
import { useUser } from "../hooks/useUser"

interface DrawerMenuProps {
    visible: boolean
    user?: User
    adm: boolean
}

export const DrawerMenu: React.FC<DrawerMenuProps> = ({ visible, user, adm }) => {
    const [active, setActive] = useState("")
    const io = useIo()
    const { setUser } = useUser()

    const handleLogout = async () => {
        if (user) {
            io.emit("user:logout")
        }
    }
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
        <View
            style={{
                width: "100%",
                height: "100%",
                alignItems: "flex-end",
                flex: 1,
                paddingTop: 25,
                position: "absolute",
                left: 40,
                zIndex: 1,
            }}
        >
            {visible && (
                <Drawer.Section
                    style={{
                        backgroundColor: colors.button,
                        width: "60%",
                        flex: 1,
                        borderTopLeftRadius: 20,
                        borderBottomLeftRadius: 20,
                        padding: 10,
                    }}
                >
                    <View>
                        <View style={{ justifyContent: "space-between" }}>
                            <Drawer.Item
                                label="Meu Perfil"
                                active={active === "account"}
                                onPress={() => setActive("account")}
                                icon={"account"}
                            />
                            <Drawer.Item
                                label="Cadastrar Funcionário"
                                active={active === "employee"}
                                onPress={() => setActive("employee")}
                                icon={"account-multiple-plus-outline"}
                            />
                            <Drawer.Item
                                label="Cadastrar Produtor"
                                active={active === "producer"}
                                onPress={() => setActive("producer")}
                                icon={"account-plus"}
                            />
                            <Drawer.Item
                                label="Fixados"
                                active={active === "fixed"}
                                onPress={() => setActive("fixed")}
                                icon={"pin"}
                            />
                        </View>
                        <Drawer.Item
                            label="Configurações"
                            active={active === "settings"}
                            onPress={() => setActive("settings")}
                        />
                        {/* <Drawer.Item
                            icon={"logout"}
                            label="Sair"
                            active={active === "logout"}
                            onPress={() => handleLogout}
                        /> */}
                    </View>
                </Drawer.Section>
            )}
        </View>
    )
}

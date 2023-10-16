import * as React from "react"
import { Drawer } from "react-native-paper"
import { colors } from "../style/colors"
import { View } from "react-native"

interface DrawerMenuProps {
    visible: boolean
    user?: User
    adm: boolean
}

export const DrawerMenu: React.FC<DrawerMenuProps> = ({ visible, user, adm }) => {
    const [active, setActive] = React.useState("")

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
                    showDivider={visible}
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
                    </View>
                </Drawer.Section>
            )}
        </View>
    )
}

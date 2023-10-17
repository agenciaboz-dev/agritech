import * as React from "react"
import { BottomNavigation } from "react-native-paper"
import { routes } from "../hooks/BottomRoutes"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { paperTheme } from "../tools/paperTheme"

interface BottomMenuProps {
    user: User
    navigation: NavigationProp<any, any>
}
export const BottomMenu: React.FC<BottomMenuProps> = ({ user, navigation }) => {
    //const navigation = useNavigation();
    const [index, setIndex] = React.useState(0)

    const handleIndexChange = (newIndex: number) => {
        setIndex(newIndex)
        switch (routes[newIndex].key) {
            case "panel":
                navigation.navigate("Home")
                break
            case "chats":
                navigation.navigate("SettingsKit")
                break
        }
    }

    const renderScene = () => null // Não renderiza nada

    return (
        <BottomNavigation
            inactiveColor="#232323"
            activeColor="#232323"
            barStyle={{ backgroundColor: "#fff" }}
            style={{ flex: 0.12, backgroundColor: "red" }}
            navigationState={{ index, routes }}
            onIndexChange={handleIndexChange}
            renderScene={renderScene}
            theme={paperTheme}
        />
    )
}

export default BottomMenu

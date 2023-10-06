import { useFonts } from "expo-font"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import { PaperProvider } from "react-native-paper"
import { paperTheme } from "./src/tools/paperTheme"
import { IoProvider } from "./src/contexts/ioContext"
import { UserProvider } from "./src/contexts/userContext"
import { Routes } from "./src/Router"

export default function App() {
    let [loaded, error] = useFonts({
        MalgunGothicBold: require("./assets/fonts/MalgunGothicBold.ttf"),
    })

    if (!loaded) {
        return <></>
    }
    return (
        <PaperProvider theme={paperTheme}>
            <IoProvider>
                <UserProvider>
                    <Routes />
                </UserProvider>
            </IoProvider>
        </PaperProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
})

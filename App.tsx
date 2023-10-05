import { useFonts } from "expo-font"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import { PaperProvider } from "react-native-paper"
import { paperTheme } from "./src/tools/paperTheme"

export default function App() {
    let [loaded, error] = useFonts({
        KGPrimaryPenmanship: require("./assets/fonts/KGPrimaryPenmanship.ttf"),
    })

    if (!loaded) {
        return <></>
    }
    return (
        <PaperProvider theme={paperTheme}>
            <Text>Open up App.tsx to start working on your app!</Text>
            <StatusBar style="auto" />
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

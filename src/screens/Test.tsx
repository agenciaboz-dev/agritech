import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { Button, Snackbar, Text } from "react-native-paper"
import { colors } from "../style/colors"
import { useIo } from "../hooks/useIo"
import { useUser } from "../hooks/useUser"

interface TestProps {
    user: User
}

export const Test: React.FC<TestProps> = ({ user }) => {
    const io = useIo()
    const { setUser } = useUser()

    const [snackbarVisible, setSnackbarVisible] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")

    const handleLogout = async () => {
        if (user) {
            io.emit("user:logout")
        }
    }
    const handleSnackbar = () => {
        setSnackbarMessage("Snackbar!")
        setSnackbarVisible(true)
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
        <View style={{ flex: 1, width: "100%", paddingTop: 50, paddingHorizontal: 50, gap: 20 }}>
            {Object.entries(user).map(([key, value]) => (
                <Text key={key}>
                    {key}: {value}
                </Text>
            ))}

            <Button mode="contained" buttonColor={colors.button} onPress={handleLogout}>
                Sair
            </Button>
            <Button mode="contained" buttonColor={colors.button} onPress={handleSnackbar}>
                snackbar
            </Button>
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
    )
}

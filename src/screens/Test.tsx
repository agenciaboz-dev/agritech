import React, { useEffect } from "react"
import { View } from "react-native"
import { Button, Text } from "react-native-paper"
import { colors } from "../style/colors"
import { useIo } from "../hooks/useIo"
import { useUser } from "../hooks/useUser"

interface TestProps {
    user: User
}

export const Test: React.FC<TestProps> = ({ user }) => {
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
        <View style={{ padding: 50, gap: 20 }}>
            {Object.entries(user).map(([key, value]) => (
                <Text key={key}>
                    {key}: {value}
                </Text>
            ))}
            <Button mode="contained" buttonColor={colors.button} onPress={handleLogout}>
                Sair
            </Button>
        </View>
    )
}

import React from "react"
import { View } from "react-native"
import { Text } from "react-native-paper"

interface TestProps {
    user: User
}

export const Test: React.FC<TestProps> = ({ user }) => {
    return (
        <View>
            {Object.entries(user).map(([key, value]) => (
                <Text key={key}>
                    {key}: {value}
                </Text>
            ))}
        </View>
    )
}

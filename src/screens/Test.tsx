import React from "react"
import { View } from "react-native"
import { DrawerMenu } from "../components/DrawerMenu"
interface TestProps {}

export const Test: React.FC<TestProps> = ({}) => {
    return (
        <View style={{ flex: 1 }}>
            <DrawerMenu adm />
        </View>
    )
}

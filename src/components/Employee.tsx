import React, { useState } from "react"
import { View, Image } from "react-native"
import { Text, Icon } from "react-native-paper"
import { colors } from "../style/colors"
import { useUser } from "../hooks/useUser"

interface EmployeeProps {}

export const Employee: React.FC<EmployeeProps> = ({}) => {
    const listEmployees = useState<User[]>

    return (
        <View style={{ flexDirection: "column" }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                    <Icon source={"account-circle-outline"} size={27} color={colors.text.black} />
                    <Text style={{ fontSize: 15 }}>Levi Weritraub</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 0 }}>
                    <Text style={{ fontSize: 10 }}>Ver Calendário</Text>
                    <Icon source="chevron-right" color={colors.text.black} size={13} />
                </View>
            </View>
            <View
                style={{
                    borderColor: "#88A486  ",
                    borderBottomWidth: 0.5, // Largura da linha
                    marginVertical: 10,
                }}
            ></View>
        </View>
    )
}

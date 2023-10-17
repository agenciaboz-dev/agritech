import React from "react"
import { Button } from "react-native-paper"
import { colors } from "../style/colors"
import { Style } from "react-native-paper/lib/typescript/components/List/utils"

interface ButtonComponentProps {
    title: string
    handleSubmit: () => void
}
export const ButtonComponent: React.FC<ButtonComponentProps> = ({ title, handleSubmit }) => {
    return (
        <Button mode="contained" buttonColor={colors.primary} style={{ width: "50%" }} labelStyle={{ fontSize: 10 }}>
            {title}
        </Button>
    )
}

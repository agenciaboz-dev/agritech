import { MD3LightTheme as DefaultTheme, MD3Theme, configureFonts } from "react-native-paper"
import { colors } from "../style/colors"

export const paperTheme: MD3Theme = {
    ...DefaultTheme,

    fonts: configureFonts({ config: { fontFamily: "MalgunGothicBold" } }),

    colors: {
        ...DefaultTheme.colors,
        primary: colors.primary,
        secondary: colors.secondary,
    },
}

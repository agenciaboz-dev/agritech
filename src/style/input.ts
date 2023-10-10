import { StyleProp, TextStyle } from "react-native/types"
import { colors } from "./colors"

const border = { height: 45, borderColor: colors.button }
const content: StyleProp<TextStyle> = { fontSize: 13, fontFamily: "MalgunGothic2", justifyContent: "center" }

export default { border, content }

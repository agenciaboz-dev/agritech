import React from "react"
import { ImageBackground, View, Image } from "react-native"
import { image } from "../image"
import { colors } from "../style/colors"
import { Button } from "react-native-paper"
import { NavigationProp } from "@react-navigation/native"
import { LinearGradient } from "expo-linear-gradient"

interface HomeProps {
    navigation: NavigationProp<any, any>
}

export const Home: React.FC<HomeProps> = ({ navigation }) => {
    return (
        <View
            style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                gap: 20,
            }}
        >
            <View
                style={{
                    width: "100%",

                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                    gap: 20,
                }}
            >
                <LinearGradient
                    colors={[colors.secondary, colors.primary]}
                    style={{
                        flex: 1,
                        width: "100%",
                        borderBottomRightRadius: 40,
                        borderBottomLeftRadius: 40,
                        paddingHorizontal: 20,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Image
                        source={image.logo}
                        style={{
                            flex: 0.8,
                            alignItems: "center",
                            justifyContent: "center",
                            width: 200,
                            height: 200,
                            resizeMode: "contain",
                        }}
                    />
                    <View style={{ width: "100%", gap: 15, paddingTop: 22 }}>
                        <Button
                            mode="outlined"
                            style={{ borderColor: "#fff", width: "100%" }}
                            labelStyle={{ color: "#fff", fontFamily: "MalgunGothic2", fontSize: 19 }}
                            onPress={() => navigation.navigate("Signup")}
                        >
                            Cadastre-se
                        </Button>
                        <Button
                            mode="contained"
                            buttonColor={colors.button}
                            style={{ borderColor: colors.button, width: "100%" }}
                            labelStyle={{ fontSize: 19, fontFamily: "MalgunGothic2" }}
                            onPress={() => navigation.navigate("Login")}
                        >
                            Entrar
                        </Button>
                    </View>
                </LinearGradient>
            </View>
            <View style={{ flex: 0.08 }}>
                <Button labelStyle={{ fontFamily: "MalgunGothic2", fontSize: 16, color: colors.button }}>
                    Termos de serviço
                </Button>
            </View>
        </View>
    )
}

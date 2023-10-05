import React from "react"
import { DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack"
import { ImageBackground } from "react-native"
import { Login } from "./screens/Login"
import { Signup } from "./screens/Signup"

interface RouterProps {}

export const Routes: React.FC<RouterProps> = ({}) => {
    const Stack = createNativeStackNavigator()
    const navigator_options: NativeStackNavigationOptions = {
        headerStyle: {
            backgroundColor: "#fff",
        },
        headerTitleStyle: {
            fontWeight: "bold",
        },
        headerTitleAlign: "center",
        animation: "slide_from_right",
        headerShown: false,
    }

    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: "transparent",
        },
    }

    return (
        <NavigationContainer theme={theme}>
            {/* <ImageBackground source={} resizeMode="cover" style={{ flex: 1 }}> */}
            <Stack.Navigator initialRouteName="Home" screenOptions={navigator_options}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
            </Stack.Navigator>
            {/* </ImageBackground> */}
        </NavigationContainer>
    )
}
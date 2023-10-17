import React from "react"
import { DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack"
import { ImageBackground } from "react-native"
import { Login } from "./screens/Login"
import { Signup } from "./screens/Signup"
import { Home } from "./screens/Home"
import { useUser } from "./hooks/useUser"
import { Panel } from "./screens/Panel"
import { Test } from "./screens/Test"
import { SettingsKit } from "./screens/Panel/SettingsKit"

interface RouterProps {}

export const Routes: React.FC<RouterProps> = ({}) => {
    const { user } = useUser()
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
            {user ? (
                <Stack.Navigator initialRouteName="Home" screenOptions={navigator_options}>
                    <Stack.Screen name="Home">{(props) => <Panel {...props} user={user} />}</Stack.Screen>
                    <Stack.Screen name="Test">{(props) => <Test {...props} />}</Stack.Screen>
                    <Stack.Screen name="SettingsKit">{(props) => <SettingsKit {...props} user={user} />}</Stack.Screen>
                </Stack.Navigator>
            ) : (
                <Stack.Navigator initialRouteName="Home" screenOptions={navigator_options}>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Signup" component={Signup} />
                </Stack.Navigator>
            )}
            {/* </ImageBackground> */}
        </NavigationContainer>
    )
}

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { SignIn } from '../screens/SignIn'
import Home from "../screens/Home";
import { theme } from "../global/styles/theme";

const { Navigator, Screen } = createStackNavigator()

const AuthRoutes: React.FC = () => {
  return (<Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: {
        backgroundColor: theme.colors.secondary100
      }
    }}
    initialRouteName="Home"
  >
    <Screen
      name="SignIn"
      component={SignIn}
    ></Screen>
    <Screen
      name="Home"
      component={Home}
    ></Screen>
  </Navigator>)
}

export default AuthRoutes
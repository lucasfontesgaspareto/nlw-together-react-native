import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { SignIn } from '../screens/SignIn'
import Home from "../screens/Home";

const { Navigator, Screen } = createStackNavigator()

const AuthRoutes: React.FC = () => {
  return (<Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: {
        backgroundColor: 'transparent'
      }
    }}
    initialRouteName="SignIn"
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
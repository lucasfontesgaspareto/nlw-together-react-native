import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
import { theme } from "../global/styles/theme";
import AppointmentDetails from "../screens/AppointmentDetails";
import AppointmentCreate from "../screens/AppointmentCreate";
import Guilds from "../screens/Guilds";

const { Navigator, Screen } = createStackNavigator()

const AuthRoutes: React.FC = () => {
  return (<Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: {
        backgroundColor: theme.colors.secondary100
      }
    }}
  >
    <Screen
      name="Home"
      component={Home}
    ></Screen>
    <Screen
      name="AppointmentDetails"
      component={AppointmentDetails}
    ></Screen>
    <Screen
      name="AppointmentCreate"
      component={AppointmentCreate}
    ></Screen>
    <Screen
      name="Guilds"
      component={Guilds}
    ></Screen>
  </Navigator>)
}

export default AuthRoutes
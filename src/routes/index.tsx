import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from '../hooks/auth';
import AuthRoutes from "./app.routes";
import PublicRoutes from './auth.routes';

const Routes: React.FC = () => {
  const { user } = useAuth()
  
  return <NavigationContainer>
    {user.id ? <AuthRoutes /> : <PublicRoutes/>}
  </NavigationContainer>;
}

export default Routes;
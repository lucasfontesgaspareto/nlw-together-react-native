import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import AuthRoutes from "./auth.routes";
import { useAuth } from '../hooks/auth';
import PublicRoutes from './public.routes';

const Routes: React.FC = () => {
  const { user } = useAuth()
  
  return <NavigationContainer>
    {user.id ? <AuthRoutes /> : <PublicRoutes/>}
  </NavigationContainer>;
}

export default Routes;
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';

import * as AuthSession from 'expo-auth-session'
import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_USERS } from '../config/database';

const { REDIRECT_URI } = process.env;
const { SCOPE } = process.env;
const { RESPONSE_TYPE } = process.env;
const { CLIENT_ID } = process.env;
const { CDN_IMAGE } = process.env;

export type User = {
  id: string;
  username: string;
  firstName: string;
  avatar: string;
  email: string;
  token: string;
}

export type AuthorizationResponse = AuthSession.AuthSessionResult & {
  params: {
    access_token?: string;
    error?: string;
  }
}

type AuthContextData = {
  user: User;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(false);

  async function signIn() {
    try {
      setLoading(true)
      
      const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

      const { type, params } = await AuthSession.startAsync({
        authUrl
      }) as AuthorizationResponse

      if (type === 'success' && !params.error) {
        api.defaults.headers.authorization = `Bearer ${params.access_token}`
        await me()
      }
    } catch (error) {
      throw new Error('Não foi possível autenticar')
    } finally {
      setLoading(false)
    }
  }

  async function me() {
    try {
      setLoading(true)
      
      const userInfo = await api.get('/users/@me');
      const firstName = userInfo.data.username.split(' ')[0];

      userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}`

      const userData = {
        ...userInfo.data,
        firstName,
      }

      await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(userData))

      setUser(userData)
    } catch (error) {
      if (error.status === 401) {
        signOut()
      }
    } finally {
      setLoading(false)
    }
  }

  async function loadUserStorageData() {
    const storage = await AsyncStorage.getItem(COLLECTION_USERS)

    if (storage) {
      const userLogged = JSON.parse(storage) as User;

      api.defaults.headers.authorization = `Bearer ${userLogged.token}`

      await me()
    }
  }

  async function signOut() {
    await AsyncStorage.removeItem(COLLECTION_USERS)
    return setUser({} as User)
  }

  useEffect(() => {
    loadUserStorageData()
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        loading,
        signOut,
      }}
    >
      { children }
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export {
  AuthProvider,
  useAuth
}
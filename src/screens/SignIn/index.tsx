import React from 'react';
import { View, Text, Image } from 'react-native';

import { styles } from './styles';

import illustrationImg from '../../assets/illustration.png'
import ButtonIcon from '../../components/ButtonIcon';
import { useNavigation } from '@react-navigation/native';
import Background from '../../components/Background';
import { useAuth } from '../../hooks/auth';

export const SignIn: React.FC = () => {
  const navigation = useNavigation()
  const { setUser } = useAuth()

  function handleSignIn() {
    setUser({
      id: '1',
      username: 'Lucas',
      firstName: 'Lucas',
      avatar: 'https://github.com/lucasfontesgaspareto.png',
      email: 'lucasfontesgaspareto@gmail.com',
      token: '1'
    })
    navigation.navigate('Home')
  }

  return (
    <Background>
      <View style={styles.container}>
        <Image
          source={illustrationImg}
          style={styles.image}
          resizeMode="stretch"
        />

        <View style={styles.content}>
          <Text style={styles.title}>
            Conecte-se {"\n"}
            e organize suas {"\n"}
            jogatinas
          </Text>

          <Text style={styles.subtitle}>
            Crie grupos para jogar seus games{"\n"}
            favoritos com seus amigos
          </Text>

          <ButtonIcon
            title="Entrar com Discord"
            onPress={handleSignIn}
          />
        </View>
      </View>
    </Background>
  );
};
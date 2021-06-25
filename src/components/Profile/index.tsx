import React from 'react';
import { View, Text, Alert } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useAuth } from '../../hooks/auth';
import Avatar from '../Avatar';
import { styles } from './styles';

const textos = [
  "Hoje é dia de conquista",
  "Hoje a vitória será sua!",
  "Hoje GG não escapa",
  "Hoje é dia de ganhar"
]

const randomIndex = Math.floor(Math.random() * 4)

const Profile: React.FC = () => {
  const { user } = useAuth()

  const { signOut } = useAuth();

  async function handleLogout() {
    Alert.alert('Sair', 'Deseja sair do ggplay?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: signOut,
      },
    ])
  }

  return (
    <View style={styles.container}>
      <RectButton onPress={handleLogout}>
        <Avatar urlImage={user.avatar} />
      </RectButton>

      <View>
        <View style={styles.user}>
          <Text style={styles.greeting}>
            Olá,
          </Text>
          <Text style={styles.username}>
            {user.firstName}
          </Text>
        </View>

        <Text style={styles.message}>
          { textos[randomIndex] }
        </Text>
      </View>
    </View>
  );
}

export default Profile;
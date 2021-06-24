import React from 'react';
import { View, Text } from 'react-native';
import Avatar from '../Avatar';
import { styles } from './styles';

const Profile: React.FC<any> = ({ user }: any) => {
  console.log(user)
  return (
    <View style={styles.container}>
      <Avatar urlImage="https://github.com/lucasfontesgaspareto.png" />

      <View>
        <View style={styles.user}>
          <Text style={styles.greeting}>
            Olá,
          </Text>
          <Text style={styles.username}>
            Lucas
          </Text>
        </View>

        <Text style={styles.message}>
          Hoje é dia de conquista
        </Text>
      </View>
    </View>
  );
}

export default Profile;
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useAuth } from '../../hooks/auth';
import Avatar from '../Avatar';
import ModalSignOut from '../ModalSignOut';
import { styles } from './styles';

const textos = [
  "Hoje é dia de conquista",
  "Hoje a vitória será sua!",
  "Hoje GG não escapa",
  "Hoje é dia de ganhar"
]

const randomIndex = Math.floor(Math.random() * 4)

const Profile: React.FC = () => {
  const { user, signOut } = useAuth()

  const [openSignOutModal, setOpenSignOutModal] = useState(false);

  function handleOpenSignOut() {
    setOpenSignOutModal(true)
  }

  function handleSignOut() {
    setOpenSignOutModal(false)
    return signOut()
  }

  function handleCancel() {
    setOpenSignOutModal(false)
  }

  return (
    <View style={styles.container}>
      <RectButton onPress={handleOpenSignOut}>
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
      
      <ModalSignOut
        visible={openSignOutModal}
        onConfirm={handleSignOut}
        onCancel={handleCancel}
      />
    </View>
  );
}

export default Profile;
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { theme } from '../../global/styles/theme';
import { useAuth } from '../../hooks/auth';
import { styles } from './styles';

type Props = {
  urlImage: string;
}

const Avatar: React.FC<Props> = ({ urlImage }) => {
  const { signOut } = useAuth();

  async function handleLogout() {
    signOut()
  }
  
  return (
    <RectButton onPress={handleLogout}>
      <LinearGradient
        style={styles.container}
        colors={[theme.colors.secondary50, theme.colors.secondary70]}
      >
        <Image
          source={{ uri: urlImage }}
          style={styles.avatar}
        />
      </LinearGradient>
    </RectButton>
  );
}

export default Avatar;
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image } from 'react-native';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';

type Props = {
  urlImage: string;
}

const Avatar: React.FC<Props> = ({ urlImage }) => {
  return (
    <LinearGradient
      style={styles.container}
      colors={[theme.colors.secondary50, theme.colors.secondary70]}
    >
      <Image
        source={{ uri: urlImage }}
        style={styles.avatar}
      />
    </LinearGradient>
  );
}

export default Avatar;
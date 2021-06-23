import React from 'react';
import { Image, View } from 'react-native';
import { styles } from './styles';

const GuildIcon: React.FC = () => {
  const uri = 'https://gamerssuffice.com/wp-content/uploads/2019/11/How-to-add-bots-to-discord-500x405.jpg'

  return <Image
    source={{ uri }}
    style={styles.image}
    resizeMode="cover"
  />;
}

export default GuildIcon;
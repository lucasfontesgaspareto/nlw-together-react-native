import React from 'react';
import { View, Image, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { styles } from './styles';
import discordImg from '../../assets/discord.png'

type Props = TouchableOpacityProps & {
  title?: string;
}

const ButtonIcon: React.FC<Props> = ({ title, ...rest }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      {...rest}
    >
      <View style={styles.iconWrapper}>
        <Image source={discordImg} style={styles.icon}/>
      </View>

      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

export default ButtonIcon;
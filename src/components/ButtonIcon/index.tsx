import React from 'react';
import { View, Image, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

import { styles } from './styles';
import discordImg from '../../assets/discord.png'
import discordLightImg from '../../assets/discord-light.png'
import { theme } from '../../global/styles/theme';

type Props = RectButtonProps & {
  title?: string;
  status?: string;
}

const ButtonIcon: React.FC<Props> = ({ title, status, ...rest }) => {
  const isDanger = status === 'danger'
  const isSuccess = status === 'success'
  const bg = isDanger ? theme.colors.danger : isSuccess ? theme.colors.on : theme.colors.primary
  const color = isDanger || isSuccess ? theme.colors.light : theme.colors.secondary100

  return (
    <RectButton
      style={[
        styles.container,
        {
          backgroundColor: bg,
        }
      ]}
      {...rest}
    >
      <View style={styles.iconWrapper}>
        <Image source={isDanger || isSuccess ? discordLightImg : discordImg} style={styles.icon} />
      </View>

      <Text 
        style={[
          styles.title,
          {
            color,
          }
        ]}
      >{title}</Text>
    </RectButton>
  );
}

export default ButtonIcon;
import React from 'react';
import { Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { theme } from '../../global/styles/theme';

import { styles } from './styles';

type Props = RectButtonProps & {
  title?: string;
  status?: string;
}

const Button: React.FC<Props> = ({ title, status, ...rest }) => {
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

export default Button;
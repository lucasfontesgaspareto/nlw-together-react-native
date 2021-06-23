import React from 'react';
import { View, Text } from 'react-native';
import { SvgProps } from 'react-native-svg'
import { RectButton, RectButtonProps, ScrollView } from 'react-native-gesture-handler';
import { styles } from './style';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../global/styles/theme';

type Props = RectButtonProps & {
  title: string;
  icon: React.FC<SvgProps>;
  checked?: boolean;
  hasCheckBox?: boolean;
}

const Category: React.FC<Props> = ({
  title,
  icon: Icon,
  checked = false,
  hasCheckBox = false,
  ...rest
}) => {
  return (
    <RectButton {...rest}>
      <LinearGradient
        style={styles.container}
        colors={[theme.colors.secondary50, theme.colors.secondary70]}
      >
        <LinearGradient 
          style={[styles.content, { opacity: checked ? 1 : 0.4 }]}
          colors={[ checked ? theme.colors.secondary85 : theme.colors.secondary50, theme.colors.secondary40 ]}
        >
          {hasCheckBox && <View style={checked ? styles.checked : styles.check}></View>}

          <Icon
            width={48}
            height={48}
          />

          <Text style={styles.title}>{title}</Text>
        </LinearGradient>
      </LinearGradient>
    </RectButton>
  );
}

export default Category;
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

type Props = {
  title: string;
  action?: ReactNode
}

const Header: React.FC<Props> = ({ title, action }) => {
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <LinearGradient
      style={styles.container}
      colors={[theme.colors.secondary100, theme.colors.secondary40]}
    >
      <BorderlessButton onPress={handleGoBack}>
        <Feather
          name="arrow-left"
          size={24}
          color={theme.colors.heading}
        />
      </BorderlessButton>

      <Text style={styles.title}>
        {title}
      </Text>

      {
        action ?
        <View>
          { action }
        </View> : <View style={{ width: 24 }}/>
      }
    </LinearGradient>
  );
}

export default Header;
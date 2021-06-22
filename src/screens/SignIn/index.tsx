import React, { useState } from 'react';
import { View, Text, Image, StatusBar } from 'react-native';

import { styles } from './styles';

import illustrationImg from '../../assets/illustration.png'
import ButtonIcon from '../../components/ButtonIcon';

export const SignIn: React.FC = () => {
  return <View style={styles.container}>

    <StatusBar
      barStyle="light-content"
      backgroundColor="transparent"
      translucent
    />

    <Image
      source={illustrationImg}
      style={styles.image}
      resizeMode="stretch"
    />

    <View style={styles.content}>
      
      <Text style={styles.title}>
        Organize{`\n`}
        suas jogatinas{`\n`}
        facilmente
      </Text>

      <Text style={styles.subtitle}>
        Crie grupos para jogar seus games{`\n`}
        favoritos com seus amigos
      </Text>

      <ButtonIcon
        title="Entrar com Discord"
        activeOpacity={0.9}
      />
    </View>
  </View>;
};
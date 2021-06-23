import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import Background from '../../components/Background';
import Header from '../../components/Header';
import { styles } from './styles';
import { Fontisto } from '@expo/vector-icons'
import { theme } from '../../global/styles/theme';
import { ImageBackground } from 'react-native';

import BannerImg from '../../assets/banner.png'
import ListHeader from '../../components/ListHeader';
import Member, { MemberProps } from '../../components/Member';
import ListDivider from '../../components/ListDivider';
import ButtonIcon from '../../components/ButtonIcon';

const AppointmentDetails: React.FC = () => {
  return (
    <Background>
      <View style={styles.container}>
        <Header
          title="Appointment"
          action={
            <BorderlessButton>
              <Fontisto
                name="share"
                size={20}
                color={theme.colors.primary}
              />
            </BorderlessButton>
          }
        />

        <ImageBackground
          style={styles.banner}
          source={BannerImg}
        >
          <View style={styles.bannerContent}>
            <Text style={styles.title}>Lendários</Text>
            <Text style={styles.subtitle}>
              É hoje que vamos chegar ao challenger sem perder uma partida da md10
            </Text>
          </View>
        </ImageBackground>

        <ListHeader
          title="Jogadores"
          subtitle="Total 3"
        ></ListHeader>

        <FlatList
          data={[{
            id: '1',
            username: 'Rogrido',
            avatar_url: 'https://github.com/rodrigorgtic.png',
            status: 'online'
          },{
            id: '2',
            username: 'Marcelo',
            avatar_url: 'https://github.com/marcelolimav.png',
            status: ''
          }] as MemberProps[]}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Member data={item}/>
          )}
          ItemSeparatorComponent={ListDivider}
          style={styles.members}
        ></FlatList>

        <View style={styles.footer}>
          <ButtonIcon title="Entrar na partida"></ButtonIcon>
        </View>
      </View>
    </Background>
  );
}

export default AppointmentDetails;
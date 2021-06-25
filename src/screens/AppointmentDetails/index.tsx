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
import { useRoute } from '@react-navigation/native';
import { AppointmentProps } from '../../components/Appointment';

type Params = {
  guildSelected: AppointmentProps
}

const AppointmentDetails: React.FC = () => {
  const route = useRoute()

  const { guildSelected } = route.params as Params

  return (
    <Background>
      <View style={styles.container}>
        <Header
          title="Detalhes"
          action={
            <BorderlessButton>
              <Fontisto
                name="share"
                size={20}
                color={theme.colors.light}
              />
            </BorderlessButton>
          }
        />

        <ImageBackground
          style={styles.banner}
          source={BannerImg}
        >
          <View style={styles.bannerContent}>
            <Text style={styles.title}>
              {guildSelected.guild.name}
            </Text>
            <Text style={styles.subtitle}>
              {guildSelected.description}
            </Text>
          </View>
        </ImageBackground>

        <ListHeader
          title="Jogadores"
          subtitle="Total 2"
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
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <ListDivider isCentered/>}
          style={styles.members}
        ></FlatList>

        <View style={styles.footer}>
          <ButtonIcon title="Entrar na partida" status="success"/>
        </View>
      </View>
    </Background>
  );
}

export default AppointmentDetails;
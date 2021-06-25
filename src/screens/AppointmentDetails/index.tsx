import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Platform, Share, Text, View } from 'react-native';
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
import { AppointmentProps } from '../../components/Appointment';
import { api } from '../../services/api';
import { Load } from '../../components/Load';
import { useRoute } from '@react-navigation/native';

import * as Linking from 'expo-linking'

type Params = {
  guildSelected: AppointmentProps
}

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
  presence_count: number;
}

const AppointmentDetails: React.FC = () => {
  const route = useRoute()
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [loading, setLoading] = useState(true);

  const { guildSelected } = route.params as Params
  
  async function fetchGuildWidget() {
    try {
      const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`)
      setWidget(response.data as GuildWidget)
    } catch (error) {
      Alert.alert("Verifique as configurações do servidor. O Widget deve estar habilitado")
      setWidget({
        members: [] as MemberProps[]
      } as GuildWidget)
    } finally {
      setLoading(false)
    }
  }

  function handleShareInvitation() {
    const message = Platform.OS === 'ios' ?
      `Junte-se a ${guildSelected.guild.name}` :
      widget.instant_invite

    Share.share({
      message,
      url: widget.instant_invite
    })
  }

  function handleOpenGuild() {
    Linking.openURL(widget.instant_invite)
  }

  useEffect(() => {
    fetchGuildWidget()
  }, []);

  return (
    <Background>
      <View style={styles.container}>
        <Header
          title="Detalhes"
          action={
            guildSelected.guild.owner &&
            <BorderlessButton onPress={handleShareInvitation}>
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
        
        {
          loading ? <Load/> :
          <>
            <ListHeader
              title="Jogadores"
              subtitle={`Total ${widget.members.length}`}
            ></ListHeader>

            <FlatList
              data={widget.members}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Member data={item}/>
              )}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <ListDivider isCentered/>}
              style={styles.members}
            ></FlatList>
          </>
        }

        <View style={styles.footer}>
          {
            widget.instant_invite &&
            <ButtonIcon
              title="Entrar na partida"
              status="success"
              onPress={handleOpenGuild}  
            />
          }
        </View>
      </View>
    </Background>
  );
}

export default AppointmentDetails;
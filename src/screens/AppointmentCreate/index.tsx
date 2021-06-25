import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Background from '../../components/Background';
import Header from '../../components/Header';
import { styles } from './styles';
import { Feather } from '@expo/vector-icons'
import { theme } from '../../global/styles/theme';
import CategorySelect from '../../components/CategorySelect';
import GuildIcon from '../../components/GuildIcon';
import SmallInput from '../../components/SmallInput';
import TextArea from '../../components/TextArea';
import Button from '../../components/Button';
import ModalView from '../../components/ModalView';
import Guilds from '../Guilds';
import { GuildProps } from '../../components/Guild';
import { uid } from '../../utils/uid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_APPOINTMENTS } from '../../config/database';
import { useNavigation } from '@react-navigation/native';

const AppointmentCreate: React.FC = () => {
  const [category, setCategory] = useState('');
  const [openGuildsModal, setOpenGuildsModal] = useState(false);
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [description, setDescription] = useState('');
  const [categoryError, setCategoryError] = useState(false);
  const [guildError, setGuildError] = useState(false);
  const [dayError, setDayError] = useState(false);
  const [monthError, setMonthError] = useState(false);
  const [hourError, setHourError] = useState(false);
  const [minuteError, setMinuteError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const navigation = useNavigation()

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId)
    setCategoryError(false)
  }

  function handleOpenGuilds() {
    setOpenGuildsModal(true)
  }

  function handleGuildSelect(guildSelect: GuildProps) {
    setOpenGuildsModal(false)
    setGuild(guildSelect)
    setGuildError(false)
  }

  function handleCloseModal() {
    setOpenGuildsModal(false)
  }

  async function handleSave() {

    if (!category) {
      setCategoryError(true)
    }

    if (!guild?.id) {
      setGuildError(true)
    }

    if (!day) {
      setDayError(true);
    }

    if (!month) {
      setMonthError(true);
    }

    if (!hour) {
      setHourError(true);
    }

    if (!minute) {
      setMinuteError(true);
    }    

    if (!description) {
      setDescriptionError(true);
    }

    if (
      !category ||
      !guild ||
      !day ||
      !month ||
      !hour ||
      !minute ||
      !description
    ) {
      return false
    }
    
    const newAppointment = {
      id: uid(),
      guild,
      category,
      date: `${day}/${month} às ${hour}:${minute}h`,
      description
    }

    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS)

    const appointments = storage ? JSON.parse(storage) : []
    
    await AsyncStorage.setItem(
      COLLECTION_APPOINTMENTS,
      JSON.stringify([ ...appointments, newAppointment ])
    )

    navigation.navigate('Home')
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Background>
        <ScrollView>
          <Header
            title="Agendar Partida"
          />

          <Text
            style={[styles.label,
              {
                marginLeft: 24, marginTop: 36, marginBottom: 18
              }
            ]}
          >
            Categoria
          </Text>

          <CategorySelect
            hasCheckBox
            hasError={categoryError}
            categorySelected={category}
            setCategory={handleCategorySelect}
          ></CategorySelect>

          <View style={styles.form}>
            <RectButton onPress={handleOpenGuilds}>
              <View style={[styles.select, guildError ? styles.selectError : {} ]}>
                <GuildIcon
                  guildId={guild.id}
                  iconId={guild.icon}
                />
                
                <View style={styles.selectBody}>
                  <Text style={styles.label}>
                    {guild.name ? guild.name : 'Selecione um servidor'}
                  </Text>
                </View>
                
                <Feather
                  name="chevron-right"
                  color={theme.colors.heading}
                  size={18}
                />
              </View>
            </RectButton>
            
            <View style={styles.field}>
              <View>
                <Text style={[styles.label, { marginBottom: 12, }]}>
                  Dia e mês
                </Text>

                <View style={styles.column}>
                  <SmallInput
                    maxLength={2}
                    onChangeText={setDay}
                    hasError={dayError}
                  />
                  <Text style={styles.divider}>/</Text>
                  <SmallInput
                    maxLength={2}
                    onChangeText={setMonth}
                    hasError={monthError}
                  />
                </View>
              </View>
              
              <View>
                <Text style={[styles.label, { marginBottom: 12, }]}>
                  Hora e minuto
                </Text>

                <View style={styles.column}>
                  <SmallInput
                    maxLength={2}
                    onChangeText={setHour}
                    hasError={hourError}
                  />
                  <Text style={styles.divider}>:</Text>
                  <SmallInput
                    maxLength={2}
                    onChangeText={setMinute}
                    hasError={minuteError}
                  />
                </View>
              </View>
            </View>

            <View style={[styles.field, { marginBottom: 12 }]}>
              <Text style={styles.label}>
                Descrição
              </Text>
              
              <Text style={styles.hint}>
                Max 100 caracteres
              </Text>
            </View>

            <TextArea 
              multiline
              maxLength={100}
              numberOfLines={5}
              autoCorrect={false}
              onChangeText={setDescription}
              hasError={descriptionError}
            />

            <View style={styles.footer}>
              <Button
                title="Agendar"
                onPress={handleSave}
              ></Button>
            </View>
          </View>
        </ScrollView>
      </Background>

      <ModalView visible={openGuildsModal} closeModal={handleCloseModal}>
        <Guilds handleGuildSelect={handleGuildSelect}/>
      </ModalView>
    </KeyboardAvoidingView>
  );
}

export default AppointmentCreate;
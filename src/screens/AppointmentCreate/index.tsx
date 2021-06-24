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

const AppointmentCreate: React.FC = () => {
  const [category, setcategory] = useState('');
  const [openGuildsModal, setopenGuildsModal] = useState(false);
  const [guild, setguild] = useState<GuildProps>({} as GuildProps);

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setcategory('') : setcategory(categoryId)
  }

  function handleOpenGuilds() {
    setopenGuildsModal(true)
  }

  function handleGuildSelect(guildSelect: GuildProps) {
    setopenGuildsModal(false)
    setguild(guildSelect)
  }

  function handleCloseModal() {
    setopenGuildsModal(false)
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
            categorySelected={category}
            setCategory={handleCategorySelect}
          ></CategorySelect>

          <View style={styles.form}>
            <RectButton onPress={handleOpenGuilds}>
              <View style={styles.select}>
                {guild.icon ? <GuildIcon/> : <View style={styles.image}/>}
                
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
                  <SmallInput maxLength={2}/>
                  <Text style={styles.divider}>/</Text>
                  <SmallInput maxLength={2}/>
                </View>
              </View>
              
              <View>
                <Text style={[styles.label, { marginBottom: 12, }]}>
                  Hora e minuto
                </Text>

                <View style={styles.column}>
                  <SmallInput maxLength={2}/>
                  <Text style={styles.divider}>:</Text>
                  <SmallInput maxLength={2}/>
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
            />

            <View style={styles.footer}>
              <Button
                title="Agendar"
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
import React, { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import Background from '../../components/Background';
import Header from '../../components/Header';
import { styles } from './styles';
import { Feather } from '@expo/vector-icons'
import { theme } from '../../global/styles/theme';
import { ImageBackground } from 'react-native';

import BannerImg from '../../assets/banner.png'
import ListHeader from '../../components/ListHeader';
import Member, { MemberProps } from '../../components/Member';
import ListDivider from '../../components/ListDivider';
import ButtonIcon from '../../components/ButtonIcon';
import CategorySelect from '../../components/CategorySelect';
import GuildIcon from '../../components/GuildIcon';
import SmallInput from '../../components/SmallInput';
import TextArea from '../../components/TextArea';
import Button from '../../components/Button';

type Props = {
  
}

const AppointmentCreate: React.FC = () => {
  const [category, setcategory] = useState('');

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setcategory('') : setcategory(categoryId)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
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
          <RectButton>
            <View style={styles.select}>
              {/* <View style={styles.image}/> */}
              <GuildIcon/>
              
              <View style={styles.selectBody}>
                <Text style={styles.label}>
                  Selecione um servidor
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
              <Text style={styles.label}>
                Dia e mês
              </Text>
            </View>

            <View style={styles.column}>
              <SmallInput maxLength={2}/>
              <Text style={styles.divider}>/</Text>
              <SmallInput maxLength={2}/>
            </View>
          </View>

          <View style={styles.field}>
            <View>
              <Text style={styles.label}>
                Hora e minuto
              </Text>
            </View>

            <View style={styles.column}>
              <SmallInput maxLength={2}/>
              <Text style={styles.divider}>:</Text>
              <SmallInput maxLength={2}/>
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
            <Button title="Agendar"></Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default AppointmentCreate;
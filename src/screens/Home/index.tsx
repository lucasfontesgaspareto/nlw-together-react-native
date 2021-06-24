import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import Appointment, { AppointmentProps } from '../../components/Appointment';
import Background from '../../components/Background';
import ButtonAdd from '../../components/ButtonAdd';
import CategorySelect from '../../components/CategorySelect';
import ListDivider from '../../components/ListDivider';
import ListHeader from '../../components/ListHeader';
import Profile from '../../components/Profile';
import { styles } from './styles';

const Home: React.FC = () => {
  const navigation = useNavigation();
  const [category, setcategory] = useState('');

  const apppointments: AppointmentProps[] = [
    {
      id: '1',
      guild: {
        id: '1',
        name: 'Lendários',
        icon: null,
        owner: true,
      },
      category: '1',
      date: '22/06 às 20h40',
      description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10'
    },
    {
      id: '2',
      guild: {
        id: '1',
        name: 'Legionários',
        icon: null,
        owner: false,
      },
      category: '1',
      date: '22/06 às 20h40',
      description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10'
    },
  ]

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setcategory('') : setcategory(categoryId)
  }

  function handleAppointmentDetails() {
    navigation.navigate('AppointmentDetails')
  }

  function handleAppointmentCreate() {
    navigation.navigate('AppointmentCreate')
  }

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.header}>
          <Profile></Profile>
          <ButtonAdd
            onPress={handleAppointmentCreate}
          ></ButtonAdd>
        </View>

        <CategorySelect
          categorySelected={category}
          setCategory={handleCategorySelect}
        ></CategorySelect>

        <ListHeader
          title="Partidas agendadas"
          subtitle="Total 2"
        />

        <FlatList
          data={apppointments}
          keyExtractor={item => item.id}
          renderItem={(info => (
            <Appointment
              data={info.item}
              onPress={handleAppointmentDetails}
            ></Appointment>
          ))}
          style={styles.matches}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={ListDivider}
          contentContainerStyle={{ paddingBottom: 69 }}
        />
      </View>
    </Background>
  );
}

export default Home;
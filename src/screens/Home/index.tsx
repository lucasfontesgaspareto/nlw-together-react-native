import React, { useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import Appointment, { AppointmentProps } from '../../components/Appointment';
import ButtonAdd from '../../components/ButtonAdd';
import CategorySelect from '../../components/CategorySelect';
import ListDivider from '../../components/ListDivider';
import ListHeader from '../../components/ListHeader';
import Profile from '../../components/Profile';
import { styles } from './styles';

const Home: React.FC = () => {
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
        name: 'Lendários',
        icon: null,
        owner: false,
      },
      category: '1',
      date: '22/06 às 20h40',
      description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10'
    }
  ]

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setcategory('') : setcategory(categoryId)
  }

  return <View style={styles.container}>
    <View style={styles.header}>
      <Profile></Profile>
      <ButtonAdd></ButtonAdd>
    </View>

    <CategorySelect
      categorySelected={category}
      setCategory={handleCategorySelect}
    ></CategorySelect>

    <View style={styles.content}>
      <ListHeader
        title="Partidas agendadas"
        subtitle="Total 6"
      />

      <FlatList
        data={apppointments}
        keyExtractor={item => item.id}
        renderItem={(info => (
          <Appointment
            data={info.item}
          ></Appointment>
        ))}
        style={styles.matches}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ListDivider}
      />
    </View>
  </View>;
}

export default Home;
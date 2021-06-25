import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import Appointment, { AppointmentProps } from '../../components/Appointment';
import Background from '../../components/Background';
import ButtonAdd from '../../components/ButtonAdd';
import CategorySelect from '../../components/CategorySelect';
import ListDivider from '../../components/ListDivider';
import ListHeader from '../../components/ListHeader';
import { Load } from '../../components/Load';
import Profile from '../../components/Profile';
import { COLLECTION_APPOINTMENTS } from '../../config/database';
import { styles } from './styles';

const Home: React.FC = () => {
  const navigation = useNavigation();
  const [category, setcategory] = useState('');
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
  const [loading, setLoading] = useState(false);

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setcategory('') : setcategory(categoryId)
  }

  function handleAppointmentDetails(guildSelected: AppointmentProps) {
    navigation.navigate('AppointmentDetails', { guildSelected })
  }

  function handleAppointmentCreate() {
    navigation.navigate('AppointmentCreate')
  }

  async function loadAppointments() {
    try {
      setLoading(true)
      
      const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS)
  
      const storage: AppointmentProps[] = response ? JSON.parse(response) : []
  
      if (category) {
        setAppointments(storage
          .filter(item => item.category === category))
      } else {
        setAppointments(storage)
      }      
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    loadAppointments()
  }, [category]));

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


        {
          loading ? <Load/> : 
          <>
            <ListHeader
              title="Partidas agendadas"
              subtitle={`Total ${appointments.length}`}
            />
            <FlatList
              data={appointments}
              keyExtractor={item => item.id}
              renderItem={(info => (
                <Appointment
                  data={info.item}
                  onPress={() => handleAppointmentDetails(info.item)}
                ></Appointment>
              ))}
              style={styles.matches}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={ListDivider}
              contentContainerStyle={{ paddingBottom: 69 }}
            />
          </>
        }
      </View>
    </Background>
  );
}

export default Home;
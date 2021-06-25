import React, { useEffect, useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import Guild, { GuildProps } from '../../components/Guild';
import ListDivider from '../../components/ListDivider';
import { Load } from '../../components/Load';
import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';

import { styles } from './styles';

type Props = {
  handleGuildSelect: (guild: GuildProps) => void;
}

const Guilds: React.FC<Props> = ({ handleGuildSelect }) => {
  const [guilds, setGuilds] = useState<GuildProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { signOut } = useAuth();

  async function fetchGuilds() {
    try {
      const response = await api.get('/users/@me/guilds')
      setGuilds(response.data)
    } catch (error) {
      if (error.status === 401) {
        signOut()
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGuilds()
  }, []);

  return (
    <View style={styles.container}>
      {
        loading ? <Load/> :
          <FlatList
            data={guilds}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Guild
                data={item}
                onPress={() => handleGuildSelect(item)}  
              />
            )}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <ListDivider isCentered/>}
            ListHeaderComponent={() => <ListDivider isCentered/>}
            style={styles.guilds}
            contentContainerStyle={{
              paddingBottom: 69,
              paddingTop: 104,
            }}
          ></FlatList>
        }
    </View>
  );
}

export default Guilds;
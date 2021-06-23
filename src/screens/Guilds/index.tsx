import React from 'react';
import { FlatList, View } from 'react-native';
import Guild, { GuildProps } from '../../components/Guild';
import ListDivider from '../../components/ListDivider';

import { styles } from './styles';

type Props = {
  handleGuildSelect: (guild: GuildProps) => void;
}

const Guilds: React.FC<Props> = ({ handleGuildSelect }) => {
  const guilds = [
    {
      id: '1',
      name: 'Lendários',
      icon: 'img.png',
      owner: true
    },
    {
      id: '2',
      name: 'Legionarios',
      icon: 'img.png',
      owner: false
    }
  ] as GuildProps[];

  return (
    <View style={styles.container}>
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
        ItemSeparatorComponent={ListDivider}
        style={styles.guilds}
      ></FlatList>
    </View>
  );
}

export default Guilds;
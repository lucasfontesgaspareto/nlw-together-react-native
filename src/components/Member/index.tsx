import React from 'react';
import { Text, View } from 'react-native';
import { theme } from '../../global/styles/theme';
import Avatar from '../Avatar';
import { styles } from './styles';

export type MemberProps = {
  id: string;
  username: string;
  avatar_url: string;
  status: string;
}

type Props = {
  data: MemberProps
}

const Member: React.FC<Props> = ({ data }) => {
  const isOnline = data.status === 'online'
  
  return <View style={styles.container}>
    <Avatar
      urlImage={data.avatar_url}
    ></Avatar>

    <View>
      <Text style={styles.title}>
        {data.username}
      </Text>

      <View style={styles.status}>
        <View
          style={[
            styles.bulletStatus,
            {
              backgroundColor: isOnline ? theme.colors.on : theme.colors.danger
            }
          ]}
        />
        
        <Text style={styles.nameStatus}>
          { isOnline ? 'Disponível' : 'Ocupado' }
        </Text>
      </View>
    </View>
  </View>;
}

export default Member;
import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

import { styles } from './styles';

type Props = TextInputProps & {
  hasError?: boolean;
}

const SmallInput: React.FC<Props> = ({ hasError, ...rest }) => {
  return <TextInput
    style={[styles.container, hasError ? styles.error : {}]}
    keyboardType="numeric"
    { ...rest }
  />;
}

export default SmallInput;
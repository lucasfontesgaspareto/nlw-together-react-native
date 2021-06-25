import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { styles } from './styles';

type Props = TextInputProps & {
  hasError?: boolean;
}

const TextArea: React.FC<Props> = ({ hasError, ...rest }) => {
  return <TextInput
    style={[styles.container, hasError ? styles.error : {}]}
    { ...rest }
  />;
}

export default TextArea;
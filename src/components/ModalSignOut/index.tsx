import React from 'react';
import { Modal, ModalProps, View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Background from '../Background';
import { styles } from './styles';

type Props = ModalProps & {
  onConfirm: () => void;
  onCancel: () => void;
}

const ModalSignOut: React.FC<Props> = ({
  onConfirm,
  onCancel,
  ...rest
}) => {
  return (
    <Modal
      transparent
      animationType="slide"
      statusBarTranslucent
      { ...rest }
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Background>
            <View style={styles.content}>
              <View style={styles.header}>
                <Text style={styles.title}>
                  Deseja sair do
                  <Text style={styles.titleLogo}>
                    {' '}
                    gg<Text style={styles.titleLogoRed}>Play</Text>?
                  </Text>
                </Text>
              </View>
              <View style={styles.footer}>
                <View style={styles.cancel}>
                  <TouchableOpacity
                    style={styles.btnCancel}
                    onPress={onCancel}
                  >
                    <Text style={styles.btnTitle}>Não</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.btnSignOut}
                  onPress={() => onConfirm()}
                >
                  <Text style={styles.btnTitle}>Sim</Text>
                </TouchableOpacity>
              </View>
            </View>
            </Background>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export default ModalSignOut;
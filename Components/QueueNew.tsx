import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';

type Props = {
  onClose: (isRefresh: boolean) => void;
};

const QueueNew: React.FC<Props> = ({onClose}) => {
  const handleCreate = () => {
    onClose(true);
  };

  return (
    <KeyboardAvoidingView style={styles.dialog} behavior="padding">
      <View style={styles.dialogView}>
        <View style={styles.dialogHeader}>
          <Text style={styles.dialogTitleText}>สร้าง QR Code</Text>
          <TouchableOpacity onPress={() => onClose(false)}>
            <FontAwesome5Icons name="times-circle" style={styles.dialogClose} />
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.textbox}
          autoCorrect={false}
          autoFocus={true}
          placeholder="ชื่อลูกค้า"
          returnKeyType="next"
        />
        <TouchableOpacity style={styles.button} onPress={handleCreate}>
          <Text style={styles.buttonText}>สร้าง</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default QueueNew;

const styles = StyleSheet.create({
  dialog: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  dialogView: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    paddingHorizontal: 10,
    paddingVertical: 20,
    gap: 8,
  },
  dialogHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dialogTitleText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  dialogClose: {
    color: '#B8860B',
    fontSize: 24,
  },
  textbox: {
    backgroundColor: '#FFF',
    borderRadius: 4,
    height: 40,
    padding: 4,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#B8860B',
    height: 40,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFDAB9',
    textAlign: 'center',
  },
});

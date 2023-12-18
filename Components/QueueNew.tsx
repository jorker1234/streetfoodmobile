import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import {createOrder} from '../Apis/Order';
import Components from '../Themes/Components';
import {useAuthenticate} from '../Contexts/AuthenticateContext';
import {ApiStatus} from '../Entities/Utility';
import Colors from '../Themes/Colors';

type Props = {
  onClose: (isRefresh: boolean) => void;
};

const QueueNew: React.FC<Props> = ({onClose}) => {
  const [customer, setCustomer] = useState('');
  const [status, setStatus] = useState(ApiStatus.COMPLETE);
  const {user} = useAuthenticate();
  const shopId = user?.shopId ?? '';

  const handleCreate = async () => {
    setStatus(ApiStatus.PENDING);
    const result = await createOrder({customer, shopId});
    setStatus(ApiStatus.COMPLETE);
    if (result.error) {
      Alert.alert(result.error?.message);
      return;
    }
    onClose(true);
  };

  const isPending = status === ApiStatus.PENDING;

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
          style={Components.textbox}
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={true}
          placeholder="ชื่อลูกค้า"
          placeholderTextColor="#CCCCCC"
          value={customer}
          onChangeText={setCustomer}
        />

        <TouchableOpacity
          style={Components.primaryButton}
          onPress={handleCreate}
          disabled={isPending}>
          {status === ApiStatus.COMPLETE && (
            <Text style={Components.primaryButtonText}>สร้าง</Text>
          )}
          {isPending && (
            <ActivityIndicator size="small" color={Colors.activityIndicator} />
          )}
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

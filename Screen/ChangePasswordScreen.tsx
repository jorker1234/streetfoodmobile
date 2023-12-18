import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../App';
import {ApiStatus} from '../Entities/Utility';
import {changePassword} from '../Apis/User';

type Props = StackScreenProps<RootStackParamList, 'ChangePasswordScreen'>;

const StoreScreen: React.FC<Props> = ({navigation}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState(ApiStatus.COMPLETE);

  const validateForm = () => {
    if (!oldPassword) {
      Alert.alert('กรุณากรอก รหัสผ่านเดิม');
      return false;
    }
    if (!password) {
      Alert.alert('กรุณากรอก รหัสผ่านใหม่');
      return false;
    }
    if (!confirmPassword) {
      Alert.alert('กรุณากรอก ยืนยันรหัสผ่านใหม่');
      return false;
    }
    if (confirmPassword !== password) {
      Alert.alert('กรุณากรอก รหัสผ่านใหม่ ให้ตรงกับ ยืนยันรหัสผ่านใหม่');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }
    setStatus(ApiStatus.PENDING);
    const result = await changePassword(oldPassword, password);
    setStatus(ApiStatus.COMPLETE);
    if (result.error) {
      Alert.alert(result.error?.message);
      return;
    }
    navigation.goBack();
  };

  const isPending = status === ApiStatus.PENDING;
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView>
        <View style={styles.card}>
          <View style={styles.cardBody}>
            <View style={styles.cardForm}>
              <Text>รหัสผ่านเดิม</Text>
              <TextInput
                style={styles.textbox}
                autoCorrect={false}
                secureTextEntry={true}
                value={oldPassword}
                onChangeText={setOldPassword}
              />
            </View>
            <View style={styles.cardForm}>
              <Text>รหัสผ่านใหม่</Text>
              <TextInput
                style={styles.textbox}
                autoCorrect={false}
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <View style={styles.cardForm}>
              <Text>ยืนยันรหัสผ่านใหม่</Text>
              <TextInput
                style={styles.textbox}
                autoCorrect={false}
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSave}
              disabled={isPending}>
              {status === ApiStatus.COMPLETE && (
                <Text style={styles.buttonText}>บันทึก</Text>
              )}
              {isPending && <ActivityIndicator size="small" color="#0000ff" />}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default StoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    borderRadius: 4,
    margin: 10,
    marginBottom: 0,
    padding: 10,
    backgroundColor: '#FFF',
  },
  cardBody: {
    gap: 12,
  },
  cardForm: {
    gap: 4,
  },
  textbox: {
    backgroundColor: '#fefbf3',
    borderColor: '#B8860B66',
    borderWidth: 1,
    borderRadius: 4,
    height: 40,
    padding: 4,
    flex: 1,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#B8860B',
    height: 40,
    justifyContent: 'center',
    borderRadius: 4,
  },
  buttonText: {
    color: '#FFDAB9',
    textAlign: 'center',
  },
});

import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../App';

type Props = StackScreenProps<RootStackParamList, 'ChangePasswordScreen'>;

const StoreScreen: React.FC<Props> = ({navigation}) => {
  const handleSave = () => {
    navigation.goBack();
  };
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
              />
            </View>
            <View style={styles.cardForm}>
              <Text>รหัสผ่านใหม่</Text>
              <TextInput
                style={styles.textbox}
                autoCorrect={false}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.cardForm}>
              <Text>ยืนยันรหัสผ่านใหม่</Text>
              <TextInput
                style={styles.textbox}
                autoCorrect={false}
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>บันทึก</Text>
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

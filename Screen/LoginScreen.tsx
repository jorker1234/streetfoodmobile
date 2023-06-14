import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import type {StackScreenProps} from '@react-navigation/stack';
import type {RootStackParamList} from '../App';
type Props = StackScreenProps<RootStackParamList, 'LoginScreen'>;

const LoginScreen = ({navigation}: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  let txtPassword: TextInput;
  const initPassword = (input: TextInput) => {
    txtPassword = input;
  };
  const onUsernameSubmit = () => {
    txtPassword?.focus();
  };

  const onLogin = () => {
    const params = {username, password};
    console.log(params);
    navigation.navigate('MainScreen');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.logoContainer}>
        <View style={styles.logo} />
      </View>
      <View style={styles.loginContainer}>
        <TextInput
          style={styles.textbox}
          autoCorrect={false}
          placeholder="Username"
          placeholderTextColor="#CCCCCC"
          returnKeyType="next"
          value={username}
          onChangeText={setUsername}
          onSubmitEditing={onUsernameSubmit}
        />
        <TextInput
          ref={initPassword}
          style={styles.textbox}
          autoCorrect={false}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor="#CCCCCC"
          value={password}
          onChangeText={setPassword}
          onSubmitEditing={onLogin}
        />
        <TouchableOpacity style={styles.button} onPress={onLogin}>
          <Text style={styles.buttonText}>เข้าสู่ระบบ</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#FAEBD7',
  },
  logoContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 16,
    backgroundColor: '#B8860B',
  },
  loginContainer: {
    flexGrow: 1,
    gap: 14,
    padding: 14,
    width: '100%',
  },
  textbox: {
    backgroundColor: '#FFF',
    borderRadius: 4,
    height: 40,
    padding: 4,
    color: '#B8860B',
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

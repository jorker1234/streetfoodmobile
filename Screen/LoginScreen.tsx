import {View, KeyboardAvoidingView, Alert, Image} from 'react-native';
import React, {useState} from 'react';
import type {StackScreenProps} from '@react-navigation/stack';
import type {RootStackParamList} from '../App';
import {ApiStatus} from '../Entities/Utility';
import {useAuthenticate} from '../Contexts/AuthenticateContext';
import Styles from './Styles/LoginStyle';
import Button from '../Components/Button';
import TextBox from '../Components/TextBox';

type Props = StackScreenProps<RootStackParamList, 'LoginScreen'>;

const LoginScreen = ({navigation}: Props) => {
  const {signin} = useAuthenticate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(ApiStatus.COMPLETE);

  // let txtPassword: TextInput;
  // const initPassword = (input: TextInput) => {
  //   txtPassword = input;
  // };
  // const onUsernameSubmit = () => {
  //   txtPassword?.focus();
  // };

  const onLogin = async () => {
    setStatus(ApiStatus.PENDING);
    const result = await signin(username, password);
    setStatus(ApiStatus.COMPLETE);
    if (result.error) {
      Alert.alert(result.error?.message);
      return;
    }
    if (result.data) {
      navigation.navigate('MainScreen');
    }
  };

  const isPending = status === ApiStatus.PENDING;

  return (
    <KeyboardAvoidingView style={Styles.container} behavior="padding">
      <View style={Styles.logo}>
        <Image source={require('../Images/app.png')} />
      </View>
      <View style={Styles.form}>
        <TextBox
          placeholder="Username"
          returnKeyType="next"
          value={username}
          onChangeText={setUsername}
          //onSubmitEditing={onUsernameSubmit}
        />
        <TextBox
          //ref={initPassword}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          onSubmitEditing={onLogin}
        />
        <Button
          text="เข้าสู่ระบบ"
          onPress={onLogin}
          disabled={isPending}
          isPending={isPending}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

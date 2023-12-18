import {Image, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useAuthenticate} from '../Contexts/AuthenticateContext';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../App';
import Styles from './Styles/SplashScreenStyle';
type Props = StackScreenProps<RootStackParamList, 'SplashScreen'>;

const SplashScreen: React.FC<Props> = ({navigation}) => {
  const {authen} = useAuthenticate();
  const authenticate = async () => {
    const result = await authen();
    if (result.data) {
      navigation.navigate('MainScreen');
      return;
    }
    navigation.navigate('LoginScreen');
  };
  useEffect(() => {
    authenticate();
  }, []);
  return (
    <View style={Styles.container}>
      <Image source={require('../Images/app.png')} />
      <Text style={Styles.loading}>Loading ...</Text>
    </View>
  );
};

export default SplashScreen;

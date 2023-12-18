import {View} from 'react-native';
import React from 'react';
import SettingCard from '../Components/SettingCard';
import {RootStackParamList} from '../App';
import {StackScreenProps} from '@react-navigation/stack';
import {useAuthenticate} from '../Contexts/AuthenticateContext';

type Props = StackScreenProps<RootStackParamList, 'ProfileScreen'>;

const ProfileScreen: React.FC<Props> = ({navigation}) => {
  const {signout} = useAuthenticate();
  const handleChangePassword = () => {
    navigation.navigate('ChangePasswordScreen');
  };
  const handleSignout = async () => {
    await signout();
    navigation.navigate('LoginScreen');
  };
  return (
    <View>
      <SettingCard
        icon="key"
        title="เปลี่ยนรหัสผ่าน"
        onPress={handleChangePassword}
      />
      <SettingCard
        icon="sign-out-alt"
        title="ออกจากระบบ"
        onPress={handleSignout}
      />
    </View>
  );
};

export default ProfileScreen;

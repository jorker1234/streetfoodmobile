import {View} from 'react-native';
import React from 'react';
import SettingCard from '../Components/SettingCard';
import {RootStackParamList} from '../App';
import {StackScreenProps} from '@react-navigation/stack';

type Props = StackScreenProps<RootStackParamList, 'ProfileScreen'>;

const ProfileScreen: React.FC<Props> = ({navigation}) => {
  const handleStore = () => {
    navigation.navigate('ChangePasswordScreen');
  };
  const handleSignout = () => {
    navigation.navigate('LoginScreen');
  };
  return (
    <View>
      <SettingCard icon="key" title="เปลี่ยนรหัสผ่าน" onPress={handleStore} />
      <SettingCard
        icon="sign-out-alt"
        title="ออกจากระบบ"
        onPress={handleSignout}
      />
    </View>
  );
};

export default ProfileScreen;

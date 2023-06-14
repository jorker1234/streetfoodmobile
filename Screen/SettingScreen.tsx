import {View} from 'react-native';
import React from 'react';
import SettingCard from '../Components/SettingCard';
import {RootStackParamList} from '../App';
import {StackScreenProps} from '@react-navigation/stack';

type Props = StackScreenProps<RootStackParamList, 'MainScreen'>;

const SettingScreen: React.FC<Props> = ({navigation}) => {
  const handleStore = () => {
    navigation.navigate('StoreScreen');
  };
  const handleMenu = () => {
    navigation.navigate('FoodScreen');
  };
  return (
    <View>
      <SettingCard icon="store" title="ร้านค้า" onPress={handleStore} />
      <SettingCard icon="utensils" title="เมนูอาหาร" onPress={handleMenu} />
      <SettingCard
        icon="history"
        title="ประวัติการสั่งซื้อ"
        onPress={handleMenu}
      />
    </View>
  );
};

export default SettingScreen;

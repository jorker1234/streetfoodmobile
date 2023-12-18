import {View} from 'react-native';
import React from 'react';
import SettingCard from '../Components/SettingCard';
import {RootStackParamList} from '../App';
import {StackScreenProps} from '@react-navigation/stack';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootTabParamList} from './MainScreen';
import {CompositeScreenProps} from '@react-navigation/native';

type Props = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, 'SettingScreen'>,
  StackScreenProps<RootStackParamList>
>;

const SettingScreen: React.FC<Props> = ({navigation}) => {
  const handleStore = () => {
    navigation.navigate('StoreScreen');
  };
  const handleMenu = () => {
    navigation.navigate('FoodScreen', {lastUpdated: ''});
  };
  const handleMaterial = () => {
    navigation.navigate('MaterialScreen');
  };
  const handleHistory = () => {
    navigation.navigate('HistoryScreen');
  };
  return (
    <View>
      <SettingCard icon="store" title="ร้านค้า" onPress={handleStore} />
      <SettingCard icon="utensils" title="เมนูอาหาร" onPress={handleMenu} />
      <SettingCard icon="list" title="วัตถุดิบ" onPress={handleMaterial} />
      <SettingCard
        icon="history"
        title="ประวัติการสั่งซื้อ"
        onPress={handleHistory}
      />
    </View>
  );
};

export default SettingScreen;

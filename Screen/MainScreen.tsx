import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';
import QueueScreen from './QueueScreen';
import OrderScreen from './OrderScreen';
import SettingScreen from './SettingScreen';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import {IconProps} from 'react-native-vector-icons/Icon';
import HeaderButton from '../Components/HeaderButton';
import {Modal} from 'react-native';
import QueueNew from '../Components/QueueNew';
import PaymentScreen from './PaymentScreen';
import {RootStackParamList} from '../App';
import {StackScreenProps} from '@react-navigation/stack';

type Props = StackScreenProps<RootStackParamList, 'MainScreen'>;

export type RootTabParamList = {
  QueueScreen: undefined;
  PaymentScreen: undefined;
  OrderScreen: undefined;
  SettingScreen: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const MainScreenTabBarIcon: React.FC<IconProps> = ({color, size, name}) => (
  <FontAwesome5Icons name={name} color={color} size={size} />
);

const MainScreen: React.FC<Props> = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const handleOpenNewQrCode = () => {
    setModalVisible(true);
  };
  const handleQrCodeClose = (isRefresh: boolean) => {
    console.log(isRefresh);
    setModalVisible(false);
  };
  const handleProfile = () => {
    navigation.navigate('ProfileScreen');
  };

  return (
    <>
      <Tab.Navigator
        initialRouteName="QueueScreen"
        screenOptions={{
          tabBarActiveTintColor: '#B8860B',
        }}>
        <Tab.Screen
          name="QueueScreen"
          component={QueueScreen}
          options={{
            headerTitle: 'QR Code',
            headerLeft: () =>
              HeaderButton({
                iconName: 'user-circle',
                handlePress: handleProfile,
              }),
            headerRight: () =>
              HeaderButton({
                iconName: 'plus-circle',
                handlePress: handleOpenNewQrCode,
              }),
            tabBarLabel: 'QR Code',
            tabBarIcon: ({color, size}) =>
              MainScreenTabBarIcon({color, size, name: 'qrcode'}),
          }}
        />
        <Tab.Screen
          name="PaymentScreen"
          component={PaymentScreen}
          options={{
            headerTitle: 'รายการโอนเงิน',
            headerLeft: () =>
              HeaderButton({
                iconName: 'user-circle',
                handlePress: handleProfile,
              }),
            tabBarLabel: 'รายการโอนเงิน',
            tabBarIcon: ({color, size}) =>
              MainScreenTabBarIcon({color, size, name: 'file-invoice-dollar'}),
          }}
        />
        <Tab.Screen
          name="OrderScreen"
          component={OrderScreen}
          options={{
            headerTitle: 'รายการสั่งซื้อ',
            headerLeft: () =>
              HeaderButton({
                iconName: 'user-circle',
                handlePress: handleProfile,
              }),
            tabBarLabel: 'รายการสั่งซื้อ',
            tabBarIcon: ({color, size}) =>
              MainScreenTabBarIcon({color, size, name: 'receipt'}),
          }}
        />
        <Tab.Screen
          name="SettingScreen"
          component={SettingScreen}
          options={{
            headerTitle: 'ตั้งค่า',
            headerLeft: () =>
              HeaderButton({
                iconName: 'user-circle',
                handlePress: handleProfile,
              }),
            tabBarLabel: 'ตั้งค่า',
            tabBarIcon: ({color, size}) =>
              MainScreenTabBarIcon({color, size, name: 'cog'}),
          }}
        />
      </Tab.Navigator>
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <QueueNew onClose={handleQrCodeClose} />
      </Modal>
    </>
  );
};

export default MainScreen;

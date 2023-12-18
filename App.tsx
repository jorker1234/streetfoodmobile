import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import SplashScreen from './Screen/SplashScreen';
import LoginScreen from './Screen/LoginScreen';
import MainScreen from './Screen/MainScreen';
import FoodScreen from './Screen/FoodScreen';
import StoreScreen from './Screen/StoreScreen';
import TransactionDetailScreen from './Screen/TransactionDetailScreen';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import {StyleSheet} from 'react-native';
import FoodDetailScreen from './Screen/FoodDetailScreen';
import PhotoScreen from './Screen/PhotoScreen';
import PhotoProvider from './Contexts/PhotoContext';
import HeaderButton from './Components/HeaderButton';
import ProfileScreen from './Screen/ProfileScreen';
import ChangePasswordScreen from './Screen/ChangePasswordScreen';
import AuthenticateProvider from './Contexts/AuthenticateContext';
import {IMenu} from './Entities/Menu';
import {BillStatus} from './Entities/Bill';
import HistoryScreen from './Screen/HistoryScreen';
import MaterialScreen from './Screen/MaterialScreen';
import MaterialDetailScreen from './Screen/MaterialDetailScreen';
import {IMaterial} from './Entities/Material';
import FoodMaterialScreen from './Screen/FoodMaterialScreen';
import FoodMaterialDetailScreen from './Screen/FoodMaterialDetailScreen';

export type RootStackParamList = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  MainScreen: {
    actionUpdateStatus?: BillStatus;
    actionUpdateId?: string;
    actionUpdateOrderId?: string;
  };
  ProfileScreen: undefined;
  FoodScreen: {
    lastUpdated?: string;
  };
  HistoryScreen: undefined;
  StoreScreen: undefined;
  TransactionDetailScreen: {
    id: string;
    orderId: string;
    acceptText?: string;
    acceptStatus?: BillStatus;
    rejectText?: string;
    rejectStatus?: BillStatus;
  };
  FoodDetailScreen: {
    menu?: IMenu;
  };
  PhotoScreen: {
    photoUrl?: string;
  };
  ChangePasswordScreen: undefined;
  MaterialScreen: {
    lastUpdated?: string;
  };
  MaterialDetailScreen: {
    material?: IMaterial;
  };
  FoodMaterialScreen: {
    menuId: string;
    lastUpdated?: string;
  };
  FoodMaterialDetailScreen: {
    menuId: string;
    material?: IMaterial;
    materialExistIds: string[];
  };
};

const Stack = createStackNavigator<RootStackParamList>();

const CloseButton = () => (
  <FontAwesome5Icons name="times" style={styles.icon} />
);

const App: React.FC<{}> = () => {
  return (
    <PhotoProvider>
      <AuthenticateProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SplashScreen">
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{headerShown: false, gestureEnabled: false}}
            />
            <Stack.Screen
              name="MainScreen"
              component={MainScreen}
              options={{headerShown: false, gestureEnabled: false}}
            />
            <Stack.Screen
              name="ProfileScreen"
              component={ProfileScreen}
              options={{
                title: 'ข้อมูลส่วนตัว',
                headerBackTitle: ' ',
                //cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
              }}
            />
            <Stack.Screen
              name="FoodScreen"
              component={FoodScreen}
              options={({navigation}) => ({
                title: 'รายการอาหาร',
                headerBackTitle: ' ',
                headerRight: () =>
                  HeaderButton({
                    iconName: 'plus-circle',
                    handlePress: () =>
                      navigation.navigate('FoodDetailScreen', {}),
                  }),
              })}
            />
            <Stack.Screen
              name="StoreScreen"
              component={StoreScreen}
              options={{title: 'ร้านค้า', headerBackTitle: ' '}}
            />
            <Stack.Screen
              name="TransactionDetailScreen"
              component={TransactionDetailScreen}
              options={({route}) => ({
                title: `รายการ #${route.params?.id}`,
                headerBackTitle: ' ',
                headerBackImage: CloseButton,
                gestureDirection: 'vertical',
                cardStyleInterpolator:
                  CardStyleInterpolators.forModalPresentationIOS,
              })}
            />
            <Stack.Screen
              name="FoodDetailScreen"
              component={FoodDetailScreen}
              options={({route}) => ({
                title: route.params?.menu?.id
                  ? route.params?.menu?.name
                  : 'เพิ่มรายการอาหาร',
                headerBackTitle: ' ',
                headerBackImage: CloseButton,
                gestureDirection: 'vertical',
                cardStyleInterpolator:
                  CardStyleInterpolators.forModalPresentationIOS,
              })}
            />
            <Stack.Screen
              name="HistoryScreen"
              component={HistoryScreen}
              options={{title: 'ประวัติการสั่งซื้อ', headerBackTitle: ' '}}
            />
            <Stack.Screen
              name="PhotoScreen"
              component={PhotoScreen}
              options={{
                title: '',
                headerBackTitle: ' ',
                headerBackImage: CloseButton,
                gestureDirection: 'vertical',
                cardStyleInterpolator:
                  CardStyleInterpolators.forModalPresentationIOS,
              }}
            />
            <Stack.Screen
              name="ChangePasswordScreen"
              component={ChangePasswordScreen}
              options={{title: 'เปลี่ยนรหัสผ่าน', headerBackTitle: ''}}
            />
            <Stack.Screen
              name="MaterialScreen"
              component={MaterialScreen}
              options={({navigation}) => ({
                title: 'วัตถุดิบ',
                headerBackTitle: ' ',
                headerRight: () =>
                  HeaderButton({
                    iconName: 'plus-circle',
                    handlePress: () =>
                      navigation.navigate('MaterialDetailScreen', {}),
                  }),
              })}
            />
            <Stack.Screen
              name="MaterialDetailScreen"
              component={MaterialDetailScreen}
              options={({route}) => ({
                title: route.params?.material?.id
                  ? route.params?.material?.name
                  : 'เพิ่มวัตถุดิบ',
                headerBackTitle: ' ',
                headerBackImage: CloseButton,
                gestureDirection: 'vertical',
                cardStyleInterpolator:
                  CardStyleInterpolators.forModalPresentationIOS,
              })}
            />
            <Stack.Screen
              name="FoodMaterialScreen"
              component={FoodMaterialScreen}
              options={() => ({
                title: 'วัตถุดิบ',
                headerBackTitle: ' ',
                headerBackImage: CloseButton,
                gestureDirection: 'vertical',
                cardStyleInterpolator:
                  CardStyleInterpolators.forModalPresentationIOS,
              })}
            />
            <Stack.Screen
              name="FoodMaterialDetailScreen"
              component={FoodMaterialDetailScreen}
              options={({route}) => ({
                title: route.params?.material?.id
                  ? route.params?.material?.name
                  : 'เพิ่มวัตถุดิบ',
                headerBackTitle: ' ',
                headerBackImage: CloseButton,
                gestureDirection: 'vertical',
                cardStyleInterpolator:
                  CardStyleInterpolators.forModalPresentationIOS,
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthenticateProvider>
    </PhotoProvider>
  );
};

const styles = StyleSheet.create({
  icon: {
    fontSize: 20,
    color: '#B8860B',
    margin: 10,
  },
});

export default App;

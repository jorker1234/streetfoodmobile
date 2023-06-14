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
import OrderDetailScreen from './Screen/OrderDetailScreen';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import {StyleSheet} from 'react-native';
import FoodDetailScreen from './Screen/FoodDetailScreen';
import PhotoScreen from './Screen/PhotoScreen';
import PhotoProvider from './Contexts/PhotoContext';
import HeaderButton from './Components/HeaderButton';
import ProfileScreen from './Screen/ProfileScreen';
import ChangePasswordScreen from './Screen/ChangePasswordScreen';

export type RootStackParamList = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  MainScreen: undefined;
  ProfileScreen: undefined;
  FoodScreen: undefined;
  StoreScreen: undefined;
  OrderDetailScreen: {
    id: string;
  };
  FoodDetailScreen: {
    id?: string;
  };
  PhotoScreen: {
    photoUrl?: string;
  };
  ChangePasswordScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const CloseButton = () => (
  <FontAwesome5Icons name="times" style={styles.icon} />
);

const App: React.FC<{}> = () => {
  return (
    <PhotoProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{headerShown: false}}
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
              headerBackTitle: '',
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
            options={{title: 'ร้านค้า', headerBackTitle: ''}}
          />
          <Stack.Screen
            name="OrderDetailScreen"
            component={OrderDetailScreen}
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
              title: route.params?.id
                ? `รายการ #${route.params?.id}`
                : 'เพิ่มรายการอาหาร',
              headerBackTitle: ' ',
              headerBackImage: CloseButton,
              gestureDirection: 'vertical',
              cardStyleInterpolator:
                CardStyleInterpolators.forModalPresentationIOS,
            })}
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
        </Stack.Navigator>
      </NavigationContainer>
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

import {FlatList, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import FoodCard from '../Components/FoodCard';
import {RootStackParamList} from '../App';
import {StackScreenProps} from '@react-navigation/stack';

type Props = StackScreenProps<RootStackParamList, 'FoodScreen'>;

type menu = {
  id: string;
  name: string;
  description?: string;
  price: number;
};

const MenuScreen: React.FC<Props> = ({navigation}) => {
  const [isRefresh, setIsRefresh] = useState(false);
  const handleRefresh = () => {
    setIsRefresh(true);
    setTimeout(() => {
      setIsRefresh(false);
    }, 2000);
  };

  const menus: menu[] = [
    {
      id: '1',
      name: 'เมนูเอ',
      description: 'เมนูพิเศษเฉพาะที่นี้',
      price: 100,
    },
    {
      id: '2',
      name: 'เมนูบี',
      description: 'เมนูพิเศษเฉพาะที่นี้',
      price: 200,
    },
    {
      id: '3',
      name: 'เมนูซี',
      description: 'เมนูพิเศษเฉพาะที่นี้',
      price: 300,
    },
    {
      id: '4',
      name: 'เมนูดี',
      description: 'เมนูพิเศษเฉพาะที่นี้',
      price: 400,
    },
    {
      id: '5',
      name: 'เมนูอี',
      description: 'เมนูพิเศษเฉพาะที่นี้',
      price: 500,
    },
    {
      id: '6',
      name: 'เมนูเอฟ',
      description: 'เมนูพิเศษเฉพาะที่นี้',
      price: 600,
    },
    {
      id: '7',
      name: 'เมนูจี',
      description: 'เมนูพิเศษเฉพาะที่นี้',
      price: 700,
    },
    {
      id: '8',
      name: 'เมนูเอช',
      description: 'เมนูพิเศษเฉพาะที่นี้',
      price: 800,
    },
    {
      id: '9',
      name: 'เมนูอี',
      description: 'เมนูพิเศษเฉพาะที่นี้',
      price: 900,
    },
    {
      id: '10',
      name: 'เมนูเอฟ',
      description: 'เมนูพิเศษเฉพาะที่นี้',
      price: 1000,
    },
    {
      id: '11',
      name: 'เมนูจี',
      description: 'เมนูพิเศษเฉพาะที่นี้',
      price: 1100,
    },
    {
      id: '12',
      name: 'เมนูเอช',
      description: 'เมนูพิเศษเฉพาะที่นี้',
      price: 1200,
    },
  ];
  const handleView = (id: string) => {
    navigation.navigate('FoodDetailScreen', {id});
  };
  const handleDelete = (id: string) => {
    console.log(id);
  };
  const handleStatusChange = (id: string, isActive: boolean) => {
    console.log(id, isActive);
  };
  return (
    <View>
      <FlatList
        data={menus}
        keyExtractor={item => item.id}
        refreshing={isRefresh}
        onRefresh={handleRefresh}
        renderItem={({item}) => (
          <FoodCard
            id={item.id}
            name={item.name}
            price={item.price}
            description={item.description}
            onView={handleView}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        )}
        ListFooterComponent={<View style={styles.footer} />}
      />
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  footer: {
    marginBottom: 10,
  },
});

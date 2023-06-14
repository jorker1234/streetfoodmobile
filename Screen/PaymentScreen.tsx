import {FlatList, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import PaymentCard from '../Components/PaymentCard';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../App';

type Props = StackScreenProps<RootStackParamList, 'MainScreen'>;

type payment = {
  id: string;
  customer: string;
  createdDate: string;
  price: number;
};

const PaymentScreen: React.FC<Props> = ({navigation}) => {
  const [isRefresh, setIsRefresh] = useState(false);

  const handleRefresh = () => {
    setIsRefresh(true);
    setTimeout(() => {
      setIsRefresh(false);
    }, 2000);
  };

  const payments: payment[] = [
    {
      id: '1',
      customer: 'คุณเอ',
      createdDate: '10/10/2023',
      price: 100,
    },
    {
      id: '2',
      customer: 'คุณบี',
      createdDate: '10/10/2023',
      price: 200,
    },
    {
      id: '3',
      customer: 'คุณซี',
      createdDate: '10/10/2023',
      price: 300,
    },
    {
      id: '4',
      customer: 'คุณดี',
      createdDate: '10/10/2023',
      price: 400,
    },
    {
      id: '5',
      customer: 'คุณอี',
      createdDate: '10/10/2023',
      price: 500,
    },
    {
      id: '6',
      customer: 'คุณเอฟ',
      createdDate: '10/10/2023',
      price: 600,
    },
    {
      id: '7',
      customer: 'คุณจี',
      createdDate: '10/10/2023',
      price: 700,
    },
    {
      id: '8',
      customer: 'คุณเอช',
      createdDate: '10/10/2023',
      price: 800,
    },
    {
      id: '9',
      customer: 'คุณอี',
      createdDate: '10/10/2023',
      price: 900,
    },
    {
      id: '10',
      customer: 'คุณเอฟ',
      createdDate: '10/10/2023',
      price: 1000,
    },
    {
      id: '11',
      customer: 'คุณจี',
      createdDate: '10/10/2023',
      price: 1100,
    },
    {
      id: '12',
      customer: 'คุณเอช',
      createdDate: '10/10/2023',
      price: 1200,
    },
  ];
  const handleView = (id: string) => {
    navigation.navigate('OrderDetailScreen', {
      id,
    });
  };
  const handleAccept = (id: string) => {
    console.log(id);
  };
  const handleReject = (id: string) => {
    console.log(id);
  };
  return (
    <View>
      <FlatList
        data={payments}
        keyExtractor={item => item.id}
        refreshing={isRefresh}
        onRefresh={handleRefresh}
        renderItem={({item}) => (
          <PaymentCard
            id={item.id}
            customer={item.customer}
            createdDate={item.createdDate}
            price={item.price}
            onView={handleView}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        )}
        ListFooterComponent={<View style={styles.footer} />}
      />
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  footer: {
    marginBottom: 10,
  },
});

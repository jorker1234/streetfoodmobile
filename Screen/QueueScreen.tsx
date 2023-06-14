import {FlatList, Modal, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import QueueCard from '../Components/QueueCard';
import QueueQrCode from '../Components/QueueQrCode';

type queue = {
  id: number;
  customer: string;
  createdDate: string;
};

const QueueScreen = () => {
  const [isRefresh, setIsRefresh] = useState(false);
  const [isQrcodeVisible, setIsQrcodeVisible] = useState(false);
  const [qrcodeUrl, setQrcodeUrl] = useState('');
  const handleRefresh = () => {
    setIsRefresh(true);
    setTimeout(() => {
      setIsRefresh(false);
    }, 2000);
  };

  const queues: queue[] = [
    {
      id: 1,
      customer: 'คุณเอ',
      createdDate: '10/10/2023',
    },
    {
      id: 2,
      customer: 'คุณบี',
      createdDate: '10/10/2023',
    },
    {
      id: 3,
      customer: 'คุณซี',
      createdDate: '10/10/2023',
    },
    {
      id: 4,
      customer: 'คุณดี',
      createdDate: '10/10/2023',
    },
    {
      id: 5,
      customer: 'คุณอี',
      createdDate: '10/10/2023',
    },
    {
      id: 6,
      customer: 'คุณเอฟ',
      createdDate: '10/10/2023',
    },
    {
      id: 7,
      customer: 'คุณจี',
      createdDate: '10/10/2023',
    },
    {
      id: 8,
      customer: 'คุณเอช',
      createdDate: '10/10/2023',
    },
    {
      id: 9,
      customer: 'คุณอี',
      createdDate: '10/10/2023',
    },
    {
      id: 10,
      customer: 'คุณเอฟ',
      createdDate: '10/10/2023',
    },
    {
      id: 11,
      customer: 'คุณจี',
      createdDate: '10/10/2023',
    },
    {
      id: 12,
      customer: 'คุณเอช',
      createdDate: '10/10/2023',
    },
  ];

  const handleQrcodeOpen = (url: string) => {
    setQrcodeUrl(url);
    setIsQrcodeVisible(true);
  };
  const handleQrcodeClose = () => {
    setIsQrcodeVisible(false);
  };
  return (
    <View>
      <FlatList
        data={queues}
        keyExtractor={item => item.id.toString()}
        refreshing={isRefresh}
        onRefresh={handleRefresh}
        renderItem={({item}) => (
          <QueueCard
            customer={item.customer}
            createdDate={item.createdDate}
            onView={handleQrcodeOpen}
          />
        )}
        ListFooterComponent={<View style={styles.footer} />}
      />
      <Modal visible={isQrcodeVisible} transparent={true} animationType="fade">
        <QueueQrCode url={qrcodeUrl} onClose={handleQrcodeClose} />
      </Modal>
    </View>
  );
};

export default QueueScreen;

const styles = StyleSheet.create({
  footer: {
    marginBottom: 10,
  },
});

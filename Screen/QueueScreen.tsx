import {FlatList, Modal, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import QueueCard from '../Components/QueueCard';
import QueueQrCode from '../Components/QueueQrCode';
import {useAuthenticate} from '../Contexts/AuthenticateContext';
import {ApiStatus} from '../Entities/Utility';
import {deleteOrder, getOrders} from '../Apis/Order';
import {IOrder, OrderStatus} from '../Entities/Order';
import config from '../config';
import HeaderButton from '../Components/HeaderButton';
import QueueNew from '../Components/QueueNew';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootTabParamList} from './MainScreen';
import {AlertDialog, ConfirmDialog} from '../Components/Dialog';
import QueueCardLoader from '../Components/QueueCardLoader';
import NotFoundCard from '../Components/NotFoundCard';

type Props = BottomTabScreenProps<RootTabParamList, 'QueueScreen'>;

const QueueScreen: React.FC<Props> = ({navigation}) => {
  const [isQrcodeVisible, setIsQrcodeVisible] = useState(false);
  const [isModalNewVisible, setIsModalNewVisible] = useState(false);
  const [qrcodeUrl, setQrcodeUrl] = useState('');

  const [status, setStatus] = useState(ApiStatus.COMPLETE);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const isPending = status === ApiStatus.PENDING;
  const {user} = useAuthenticate();
  const shopId = user?.shopId ?? '';

  const loadData = useCallback(async () => {
    if (shopId) {
      setStatus(ApiStatus.PENDING);
      const result = await getOrders(shopId, OrderStatus.INITIALIZE);
      setStatus(ApiStatus.COMPLETE);
      if (result.error) {
        AlertDialog(result.error?.message);
        return;
      }
      if (result.data) {
        setOrders(result.data?.orders ?? []);
      }
    }
  }, [shopId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        HeaderButton({
          iconName: 'plus-circle',
          handlePress: () => {
            setIsModalNewVisible(true);
          },
        }),
    });
  }, [navigation]);

  const handleRefresh = async () => {
    setIsRefresh(true);
    await loadData();
    setIsRefresh(false);
  };

  const handleQrcodeOpen = (orderId: string) => {
    const url = `${config.WEB_URL}/menu?shopId=${shopId}&orderId=${orderId}`;
    console.log(url);
    setQrcodeUrl(url);
    setIsQrcodeVisible(true);
  };

  const handleQrcodeDelete = async (orderId: string) => {
    const isConfirm = await ConfirmDialog('คุณต้องการจะลบข้อมูล ?');
    if (!isConfirm) {
      return;
    }
    setStatus(ApiStatus.PENDING);
    const result = await deleteOrder(orderId, shopId);
    if (result.error) {
      AlertDialog(result.error?.message);
      setStatus(ApiStatus.COMPLETE);
      return;
    }
    await loadData();
  };

  const handleQrcodeClose = () => {
    setIsQrcodeVisible(false);
  };

  const handleModalNewClose = async (isReload: boolean) => {
    setIsModalNewVisible(false);
    if (isReload) {
      await loadData();
    }
  };

  const emptyItems = [{id: '1'}, {id: '2'}, {id: '3'}, {id: '4'}];
  return (
    <View>
      {isPending && !isRefresh && (
        <FlatList
          data={emptyItems}
          keyExtractor={item => item.id.toString()}
          renderItem={({}) => <QueueCardLoader />}
        />
      )}
      {(!isPending || isRefresh) && (
        <FlatList
          data={orders}
          keyExtractor={item => item.id}
          refreshing={isRefresh}
          onRefresh={handleRefresh}
          ListEmptyComponent={<NotFoundCard />}
          renderItem={({item}) => (
            <QueueCard
              orderId={item.id}
              customer={item.customer}
              createdAt={item.createdAt}
              onView={handleQrcodeOpen}
              onDelete={handleQrcodeDelete}
            />
          )}
          ListFooterComponent={<View style={styles.footer} />}
        />
      )}
      <Modal visible={isQrcodeVisible} transparent={true} animationType="fade">
        <QueueQrCode url={qrcodeUrl} onClose={handleQrcodeClose} />
      </Modal>
      <Modal
        visible={isModalNewVisible}
        transparent={true}
        animationType="slide">
        <QueueNew onClose={handleModalNewClose} />
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

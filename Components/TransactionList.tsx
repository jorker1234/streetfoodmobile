import {FlatList, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {BillStatus, IBill} from '../Entities/Bill';
import {ApiStatus} from '../Entities/Utility';
import {useAuthenticate} from '../Contexts/AuthenticateContext';
import {getBills, updateBillStatus} from '../Apis/Bill';
import {AlertDialog, ConfirmDialog} from './Dialog';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import QueueCardLoader from './QueueCardLoader';
import NotFoundCard from './NotFoundCard';
import {RootStackParamList} from '../App';
import TransactionCard from './TransactionCard';
import {useRouterParam} from '../Contexts/RouterParamContext';

type Props = {
  billInitStatus: BillStatus;
  billAcceptStatus?: BillStatus;
  billAcceptText?: string;
  billRejectStatus?: BillStatus;
  billRejectText?: string;
};

type routerParam = {
  actionUpdateStatus: BillStatus;
  actionUpdateId: string;
  actionUpdateOrderId: string;
};

const TransactionList: React.FC<Props> = ({
  billInitStatus,
  billAcceptStatus,
  billAcceptText,
  billRejectStatus,
  billRejectText,
}) => {
  const [status, setStatus] = useState(ApiStatus.COMPLETE);
  const [bills, setBills] = useState<IBill[]>([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const isPending = status === ApiStatus.PENDING;
  const {user} = useAuthenticate();
  const shopId = user?.shopId ?? '';
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {actionUpdateStatus, actionUpdateId, actionUpdateOrderId} =
    useRouterParam() as routerParam;

  const loadData = useCallback(async () => {
    if (shopId) {
      setStatus(ApiStatus.PENDING);
      const result = await getBills(shopId, billInitStatus);

      setStatus(ApiStatus.COMPLETE);
      if (result.error) {
        AlertDialog(result.error?.message);
        return;
      }
      if (result.data) {
        setBills(result.data?.bills ?? []);
      }
    }
  }, [billInitStatus, shopId]);

  const updateStatus = useCallback(
    async (id: string, orderId: string, billStatus: BillStatus) => {
      const result = await updateBillStatus(id, shopId, orderId, billStatus);
      if (result.error) {
        AlertDialog(result.error?.message);
        return;
      }
      await loadData();
    },
    [loadData, shopId],
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleActionFromDetail = useCallback(async () => {
    if (actionUpdateStatus && actionUpdateId && actionUpdateOrderId) {
      await updateStatus(
        actionUpdateId,
        actionUpdateOrderId,
        actionUpdateStatus,
      );

      navigation.navigate('MainScreen', {
        actionUpdateStatus: undefined,
        actionUpdateId: undefined,
        actionUpdateOrderId: undefined,
      });
    }
  }, [
    actionUpdateId,
    actionUpdateOrderId,
    actionUpdateStatus,
    updateStatus,
    navigation,
  ]);
  useEffect(() => {
    handleActionFromDetail();
  }, [handleActionFromDetail]);

  const handleRefresh = async () => {
    setIsRefresh(true);
    await loadData();
    setIsRefresh(false);
  };

  const handleView = (id: string, orderId: string) => {
    navigation.navigate('TransactionDetailScreen', {
      id,
      orderId,
      acceptStatus: billAcceptStatus,
      acceptText: billAcceptText,
      rejectStatus: billRejectStatus,
      rejectText: billRejectText,
    });
  };

  const handleAccept = async (id: string, orderId: string) => {
    if (!billAcceptStatus) {
      return;
    }
    const isConfirm = await ConfirmDialog(`คุณต้องการจะ${billAcceptText} ?`);
    if (!isConfirm) {
      return;
    }
    await updateStatus(id, orderId, billAcceptStatus);
  };
  const handleReject = async (id: string, orderId: string) => {
    if (!billRejectStatus) {
      return;
    }
    const isConfirm = await ConfirmDialog(`คุณต้องการจะ${billRejectText} ?`);
    if (!isConfirm) {
      return;
    }
    await updateStatus(id, orderId, billRejectStatus);
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
          data={bills}
          keyExtractor={item => item.id}
          refreshing={isRefresh}
          onRefresh={handleRefresh}
          ListEmptyComponent={<NotFoundCard />}
          renderItem={({item}) => (
            <TransactionCard
              id={item.id}
              orderId={item.orderId}
              name={item.name}
              customer={item.customer}
              createdDate={item.createdAt}
              price={item.amount}
              imageUrl={item.imageUrl}
              acceptText={billAcceptText}
              rejectText={billRejectText}
              onView={handleView}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          )}
          ListFooterComponent={<View style={styles.footer} />}
        />
      )}
    </View>
  );
};

export default TransactionList;

const styles = StyleSheet.create({
  footer: {
    marginBottom: 10,
  },
});

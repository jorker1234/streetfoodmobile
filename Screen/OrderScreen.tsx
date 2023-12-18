import React from 'react';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootTabParamList} from './MainScreen';
import {CompositeScreenProps} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../App';
import {BillStatus} from '../Entities/Bill';
import TransactionList from '../Components/TransactionList';

type Props = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, 'OrderScreen'>,
  StackScreenProps<RootStackParamList>
>;

const OrderScreen: React.FC<Props> = () => {
  const props = {
    billInitStatus: BillStatus.QUEUE,
    billAcceptStatus: BillStatus.COMPLETE,
    billAcceptText: 'ทำเสร็จ',
    billRejectStatus: BillStatus.REJECT,
    billRejectText: 'ยกเลิก',
  };
  return <TransactionList {...props} />;
};

export default OrderScreen;

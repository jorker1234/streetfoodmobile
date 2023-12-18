import React from 'react';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootTabParamList} from './MainScreen';
import {CompositeScreenProps} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../App';
import {BillStatus} from '../Entities/Bill';
import TransactionList from '../Components/TransactionList';

type Props = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, 'PaymentScreen'>,
  StackScreenProps<RootStackParamList>
>;

const PaymentScreen: React.FC<Props> = () => {
  const props = {
    billInitStatus: BillStatus.PAYMENT,
    billAcceptStatus: BillStatus.QUEUE,
    billAcceptText: 'อนุมัติ',
    billRejectStatus: BillStatus.REJECT,
    billRejectText: 'ปฏิเสธ',
  };
  return <TransactionList {...props} />;
};

export default PaymentScreen;

import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../App';
import {BillStatus} from '../Entities/Bill';
import TransactionList from '../Components/TransactionList';

type Props = StackScreenProps<RootStackParamList, 'HistoryScreen'>;

const HistoryScreen: React.FC<Props> = () => {
  const props = {
    billInitStatus: BillStatus.COMPLETE,
  };
  return <TransactionList {...props} />;
};

export default HistoryScreen;

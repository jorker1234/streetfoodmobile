import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import config from '../config';

type Props = {
  customer: string;
  createdDate: string;
  onView: (url: string) => void;
};

const QueueCard: React.FC<Props> = ({customer, createdDate, onView}) => {
  const handleView = () => {
    const url = `${config.WEB_URL}/menu?shopId=645341bd4d1ff223e331b588&orderId=648524bc809a74c01139b7b7`;
    onView(url);
  };
  return (
    <TouchableOpacity onPress={handleView}>
      <View style={styles.card}>
        <TouchableOpacity onPress={handleView}>
          <FontAwesome5Icons name="qrcode" style={styles.cardIcon} />
        </TouchableOpacity>
        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>{customer}</Text>
          <Text style={styles.cardDate}>{createdDate}</Text>
        </View>
        <TouchableOpacity>
          <FontAwesome5Icons name="trash-alt" style={styles.cardIcon} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default QueueCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 4,
    margin: 10,
    marginBottom: 0,
    padding: 10,
    backgroundColor: '#FFF',
    flexDirection: 'row',
  },
  cardIcon: {
    padding: 10,
    color: '#B8860B',
    fontSize: 20,
    justifyContent: 'center',
  },
  cardBody: {
    gap: 4,
    flex: 1,
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardDate: {
    fontSize: 10,
  },
});

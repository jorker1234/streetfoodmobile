import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';

type Props = {
  id: string;
  customer: string;
  createdDate: string;
  price: number;
  onView: (id: string) => void;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
};

const PaymentCard: React.FC<Props> = ({
  id,
  customer,
  createdDate,
  price,
  onView,
  onAccept,
  onReject,
}) => {
  const handleView = () => {
    onView(id);
  };
  const handleAccept = () => {
    onAccept(id);
  };
  const handleReject = () => {
    onReject(id);
  };
  return (
    <TouchableOpacity onPress={handleView}>
      <View style={styles.card}>
        <View style={styles.cardBody}>
          <View style={styles.cardLef}>
            <Text style={styles.cardTitle}>{customer}</Text>
            <Text style={styles.cardDate}>{createdDate}</Text>
          </View>
          <Text style={styles.cardTitle}>฿{price}</Text>
        </View>
        <View style={styles.cardBottom}>
          <TouchableOpacity
            style={styles.cardBottomTouch}
            onPress={handleAccept}>
            <FontAwesome5Icons name="check" style={styles.cardIcon} />
            <Text style={styles.cardLink}>อนุมัติ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cardBottomTouch}
            onPress={handleReject}>
            <FontAwesome5Icons name="trash-alt" style={styles.cardIcon} />
            <Text style={styles.cardLink}>ปฏิเสธ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PaymentCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 4,
    margin: 10,
    marginBottom: 0,
    padding: 10,
    backgroundColor: '#FFF',
  },
  cardBody: {
    flexDirection: 'row',
  },
  cardLef: {
    gap: 4,
    flex: 1,
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardDate: {
    fontSize: 10,
  },
  cardBottom: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 20,
  },
  cardBottomTouch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardLink: {
    fontSize: 14,
    color: '#B8860B',
  },
  cardIcon: {
    paddingVertical: 10,
    paddingHorizontal: 4,
    color: '#B8860B',
    fontSize: 14,
    justifyContent: 'center',
  },
});

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';

type Props = {
  orderId: string;
  customer: string;
  createdAt: string;
  onView: (orderId: string) => void;
  onDelete: (orderId: string) => void;
};

const QueueCard: React.FC<Props> = ({
  orderId,
  customer,
  createdAt,
  onView,
  onDelete,
}) => {
  const handleView = () => {
    onView(orderId);
  };
  const handleDelete = () => {
    onDelete(orderId);
  };
  return (
    <TouchableOpacity onPress={handleView}>
      <View style={styles.card}>
        <TouchableOpacity onPress={handleView}>
          <FontAwesome5Icons name="qrcode" style={styles.cardIcon} />
        </TouchableOpacity>
        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>{customer}</Text>
          <Text style={styles.cardDate}>{createdAt}</Text>
        </View>
        <TouchableOpacity onPress={handleDelete}>
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

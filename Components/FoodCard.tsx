import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';

type Props = {
  id: string;
  name: string;
  description?: string;
  price: number;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, isActive: boolean) => void;
};

const FoodCard: React.FC<Props> = ({
  id,
  name,
  description,
  price,
  onView,
  onDelete,
  onStatusChange,
}) => {
  const handleView = () => {
    onView(id);
  };
  const handleDelete = () => {
    onDelete(id);
  };
  const handleStatusChange = () => {
    onStatusChange(id, true);
  };
  return (
    <TouchableOpacity onPress={handleView}>
      <View style={styles.card}>
        <View style={styles.cardBody}>
          <FontAwesome5Icons name="image" size={64} style={styles.cardImage} />
          <View style={styles.cardLef}>
            <Text style={styles.cardTitle}>{name}</Text>
            <Text style={styles.cardDate}>{description}</Text>
          </View>
          <Text style={styles.cardTitle}>฿{price}</Text>
        </View>
        <View style={styles.cardBottom}>
          <TouchableOpacity
            style={styles.cardBottomTouch}
            onPress={handleStatusChange}>
            <FontAwesome5Icons name="store-slash" style={styles.cardIcon} />
            <Text style={styles.cardLink}>หมด</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cardBottomTouch}
            onPress={handleDelete}>
            <FontAwesome5Icons name="trash-alt" style={styles.cardIcon} />
            <Text style={styles.cardLink}>ลบรายการ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FoodCard;

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
  cardImage: {
    width: 64,
    marginRight: 20,
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

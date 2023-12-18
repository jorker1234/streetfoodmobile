import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import {IMaterial} from '../Entities/Material';

type Props = {
  materail: IMaterial;
  onView: (materail: IMaterial) => void;
  onDelete: (materail: IMaterial) => void;
};

const MaterialCard: React.FC<Props> = ({materail, onDelete, onView}) => {
  const handleView = () => {
    onView(materail);
  };
  const handleDelete = () => {
    onDelete(materail);
  };
  return (
    <TouchableOpacity onPress={handleView}>
      <View style={styles.card}>
        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>{materail.name}</Text>
          {materail.description && (
            <Text style={styles.cardDate}>{materail.description}</Text>
          )}
          <Text style={styles.cardTitle}>
            ฿{materail.price} / {materail.unit}
          </Text>
        </View>
        <TouchableOpacity onPress={handleDelete}>
          <FontAwesome5Icons name="trash-alt" style={styles.cardIcon} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default MaterialCard;

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

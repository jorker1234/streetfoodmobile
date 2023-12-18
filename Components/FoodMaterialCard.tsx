import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import {IMaterial} from '../Entities/Material';

type Props = {
  materail: IMaterial;
  onView: (materail: IMaterial) => void;
  onDelete: (materail: IMaterial) => void;
};

const FoodMaterialCard: React.FC<Props> = ({materail, onDelete, onView}) => {
  const handleView = () => {
    onView(materail);
  };
  const handleDelete = () => {
    onDelete(materail);
  };
  return (
    <TouchableOpacity onPress={handleView}>
      {/* <View style={styles.card}>
        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>{materail.name}</Text>
          {materail.note && (
            <Text style={styles.cardDate}>{materail.note}</Text>
          )}
          <Text style={styles.cardTitle}>
            {materail.quantity} {materail.unit}
          </Text>
        </View>
        <TouchableOpacity onPress={handleDelete}>
          <FontAwesome5Icons name="trash-alt" style={styles.cardIcon} />
        </TouchableOpacity>
      </View> */}
      <View style={styles.horizantal}>
        <Text style={styles.boxQuantity}>{materail.quantity}x</Text>
        <View style={styles.boxFull}>
          <Text style={styles.textTitle}>{materail.name}</Text>
          {materail.note && (
            <Text style={styles.textComment}>{materail.note}</Text>
          )}
        </View>
        <Text>฿{materail.price * (materail.quantity ?? 0)}</Text>
        <TouchableOpacity onPress={handleDelete}>
          <FontAwesome5Icons name="trash-alt" style={styles.cardIcon} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default FoodMaterialCard;

const styles = StyleSheet.create({
  // card: {
  //   borderRadius: 4,
  //   margin: 10,
  //   marginBottom: 0,
  //   padding: 10,
  //   backgroundColor: '#FFF',
  //   flexDirection: 'row',
  // },
  cardIcon: {
    color: '#B8860B',
    fontSize: 16,
    justifyContent: 'center',
  },
  // cardBody: {
  //   gap: 4,
  //   flex: 1,
  // },
  // cardTitle: {
  //   fontWeight: 'bold',
  // },
  // cardDate: {
  //   fontSize: 10,
  // },

  horizantal: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  textTitle: {
    color: '#B8860B',
    fontWeight: 'bold',
  },
  textComment: {
    fontSize: 10,
  },
  boxFull: {
    flex: 1,
  },
  boxQuantity: {
    width: 30,
  },
});

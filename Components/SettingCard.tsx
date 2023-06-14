import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';

type Props = {
  icon: string;
  title: string;
  onPress: () => void;
};

const SettingCard: React.FC<Props> = ({icon, title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <FontAwesome5Icons
          name={icon}
          size={20}
          color={'#B8860B'}
          style={styles.cardIcon}
        />
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SettingCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 4,
    margin: 10,
    marginBottom: 0,
    padding: 20,
    backgroundColor: '#FFF',
    flexDirection: 'row',
  },
  cardIcon: {
    width: 40,
  },
  cardTitle: {
    fontWeight: 'bold',
  },
});

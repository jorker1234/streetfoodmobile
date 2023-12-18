import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const NotFoundCard = () => {
  return (
    <View style={styles.card}>
      <Text>ไม่พบข้อมูล</Text>
    </View>
  );
};

export default NotFoundCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 4,
    margin: 10,
    marginBottom: 0,
    padding: 10,
    backgroundColor: '#FFF',
  },
});

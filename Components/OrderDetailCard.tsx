import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';

type Props = {
  id: string;
  onClose: () => void;
};

const OrderDetailCard: React.FC<Props> = ({id, onClose}) => {
  return (
    <View>
      <TouchableOpacity onPress={onClose}>
        <FontAwesome5Icons name="times-circle" style={styles.dialogClose} />
      </TouchableOpacity>
      <View style={styles.horizantal}>
        <Text style={styles.boxFull}>ชื่อลูกค้า</Text>
        <Text>คุณอร</Text>
      </View>
      <View>
        <Text>รายการอาหาร</Text>
      </View>
      <View style={styles.horizantal}>
        <Text style={styles.boxQuantity}>1X</Text>
        <View style={styles.boxFull}>
          <Text style={styles.textTitle}>กระเพราหมูสับไข่ดาว</Text>
          <Text style={styles.textComment}>ขอเยอะๆ</Text>
        </View>
        <Text>฿279</Text>
      </View>
      <View style={styles.horizantal}>
        <Text style={styles.boxQuantity}>2X</Text>
        <View style={styles.boxFull}>
          <Text style={styles.textTitle}>กระเพราหมูกรอบ</Text>
          <Text style={styles.textComment}>ไม่ใส่ผัก</Text>
        </View>
        <Text>฿601</Text>
      </View>
      {/* <View style={styles.card}>
        <View style={styles.cardBody}>
          <View style={styles.cardLef}>
            <Text style={styles.cardTitle}>{customer}</Text>
            <Text style={styles.cardDate}>{createdDate}</Text>
          </View>
          <Text style={styles.cardTitle}>฿{price}</Text>
        </View>
        <View style={styles.cardBottom}>
          <TouchableOpacity style={styles.cardBottomTouch}>
            <FontAwesome5Icons name="check" style={styles.cardIcon} />
            <Text style={styles.cardLink}>ทำเสร็จ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardBottomTouch}>
            <FontAwesome5Icons name="trash-alt" style={styles.cardIcon} />
            <Text style={styles.cardLink}>ยกเลิก</Text>
          </TouchableOpacity>
        </View>
      </View> */}
    </View>
  );
};

export default OrderDetailCard;

const styles = StyleSheet.create({
  dialogClose: {
    color: '#B8860B',
    fontSize: 24,
    alignSelf: 'flex-end',
  },
  horizantal: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  textTitle: {
    fontWeight: 'bold',
  },
  textComment: {
    fontSize: 10,
  },
  boxFull: {
    flex: 1,
  },
  boxQuantity: {
    borderColor: '#CCC',
    borderWidth: 1,
    padding: 4,
    borderRadius: 4,
    alignSelf: 'center',
  },
  // card: {
  //   borderRadius: 4,
  //   margin: 10,
  //   marginBottom: 0,
  //   padding: 10,
  //   backgroundColor: '#FFF',
  // },
  // cardBody: {
  //   flexDirection: 'row',
  // },
  // cardLef: {
  //   gap: 4,
  //   flex: 1,
  // },
  // cardTitle: {
  //   fontWeight: 'bold',
  // },
  // cardDate: {
  //   fontSize: 10,
  // },
  // cardBottom: {
  //   marginTop: 10,
  //   flexDirection: 'row',
  //   gap: 20,
  // },
  // cardBottomTouch: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // cardLink: {
  //   fontSize: 14,
  //   color: '#B8860B',
  // },
  // cardIcon: {
  //   paddingVertical: 10,
  //   paddingHorizontal: 4,
  //   color: '#B8860B',
  //   fontSize: 14,
  //   justifyContent: 'center',
  // },
});

// import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import React from 'react';
// import {StackScreenProps} from '@react-navigation/stack';
// import {RootStackParamList} from '../App';

// type Props = StackScreenProps<RootStackParamList, 'OrderDetailScreen'>;

// type orderItem = {
//   id: string;
//   name: string;
//   comment: string;
//   quantity: number;
//   price: number;
// };

// const OrderDetailHeader = () => {
//   return (
//     <View style={styles.mt1}>
//       <View style={styles.horizantal}>
//         <Text style={[styles.boxFull, styles.textTitle]}>ชื่อลูกค้า</Text>
//         <Text style={styles.textTitle}>คุณอร</Text>
//       </View>
//       <View style={styles.line} />
//       <View style={styles.horizantal}>
//         <Text style={styles.textTitle}>รายการอาหาร</Text>
//       </View>
//     </View>
//   );
// };

// const OrderDetailScreen: React.FC<Props> = ({route, navigation}) => {
//   const {id} = route.params;
//   console.log(id);
//   const handleAccept = () => {
//     navigation.navigate('MainScreen');
//   };
//   const handleReject = () => {
//     navigation.navigate('MainScreen');
//   };
//   const orderItems: orderItem[] = [
//     {
//       id: '1',
//       name: 'กระเพราหมูสับไข่ดาว',
//       comment: 'ขอเยอะๆ',
//       quantity: 1,
//       price: 279,
//     },
//     {
//       id: '2',
//       name: 'กระเพราหมูกรอบ',
//       comment: 'ไม่ใส่ผัก',
//       quantity: 2,
//       price: 601,
//     },
//     {
//       id: '3',
//       name: 'กระเพราหมูสับไข่ดาว',
//       comment: 'ขอเยอะๆ',
//       quantity: 3,
//       price: 279,
//     },
//     {
//       id: '4',
//       name: 'กระเพราหมูกรอบ',
//       comment: 'ไม่ใส่ผัก',
//       quantity: 4,
//       price: 601,
//     },
//     {
//       id: '5',
//       name: 'กระเพราหมูสับไข่ดาว',
//       comment: 'ขอเยอะๆ',
//       quantity: 5,
//       price: 279,
//     },
//     {
//       id: '6',
//       name: 'กระเพราหมูกรอบ',
//       comment: 'ไม่ใส่ผัก',
//       quantity: 6,
//       price: 601,
//     },
//     {
//       id: '7',
//       name: 'กระเพราหมูสับไข่ดาว',
//       comment: 'ขอเยอะๆ',
//       quantity: 7,
//       price: 279,
//     },
//     {
//       id: '8',
//       name: 'กระเพราหมูกรอบ',
//       comment: 'ไม่ใส่ผัก',
//       quantity: 8,
//       price: 601,
//     },
//     {
//       id: '9',
//       name: 'กระเพราหมูสับไข่ดาว',
//       comment: 'ขอเยอะๆ',
//       quantity: 9,
//       price: 279,
//     },
//     {
//       id: '10',
//       name: 'กระเพราหมูกรอบ',
//       comment: 'ไม่ใส่ผัก',
//       quantity: 10,
//       price: 601,
//     },
//     {
//       id: '11',
//       name: 'กระเพราหมูสับไข่ดาว',
//       comment: 'ขอเยอะๆ',
//       quantity: 11,
//       price: 279,
//     },
//     {
//       id: '12',
//       name: 'กระเพราหมูกรอบ',
//       comment: 'ไม่ใส่ผัก',
//       quantity: 12,
//       price: 601,
//     },
//     {
//       id: '13',
//       name: 'กระเพราหมูสับไข่ดาว',
//       comment: 'ขอเยอะๆ',
//       quantity: 13,
//       price: 279,
//     },
//     {
//       id: '14',
//       name: 'กระเพราหมูกรอบ',
//       comment: 'ไม่ใส่ผัก',
//       quantity: 14,
//       price: 601,
//     },
//     {
//       id: '15',
//       name: 'กระเพราหมูสับไข่ดาว',
//       comment: 'ขอเยอะๆ',
//       quantity: 15,
//       price: 279,
//     },
//     {
//       id: '16',
//       name: 'กระเพราหมูกรอบ',
//       comment: 'ไม่ใส่ผัก',
//       quantity: 16,
//       price: 601,
//     },
//   ];

//   return (
//     <View style={styles.container}>
//       <View style={styles.top}>
//         <FlatList
//           data={orderItems}
//           keyExtractor={item => item.id}
//           ListHeaderComponent={OrderDetailHeader}
//           renderItem={item => (
//             <View style={styles.horizantal}>
//               <Text style={styles.boxQuantity}>{item.item.quantity}x</Text>
//               <View style={styles.boxFull}>
//                 <Text style={styles.textTitle}>{item.item.name}</Text>
//                 <Text style={styles.textComment}>{item.item.comment}</Text>
//               </View>
//               <Text>฿{item.item.price}</Text>
//             </View>
//           )}
//         />
//       </View>
//       <View style={styles.bottom}>
//         <View style={styles.line} />
//         <View style={styles.horizantal}>
//           <Text style={[styles.boxFull, styles.textTitle]}>ทั้งหมด</Text>
//           <Text style={styles.textTitle}>฿879</Text>
//         </View>
//         <TouchableOpacity style={styles.button} onPress={handleAccept}>
//           <Text style={styles.buttonText}>อนุมัติ</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={handleReject}>
//           <Text style={styles.buttonText}>ปฎิเสธ</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default OrderDetailScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     gap: 1,
//   },
//   line: {
//     height: 1,
//   },
//   mt1: {
//     marginTop: 1,
//   },
//   horizantal: {
//     backgroundColor: '#FFFFFF',
//     flexDirection: 'row',
//     gap: 8,
//     alignItems: 'flex-start',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//   },
//   textTitle: {
//     fontWeight: 'bold',
//   },
//   textComment: {
//     fontSize: 10,
//   },
//   boxFull: {
//     flex: 1,
//   },
//   boxQuantity: {
//     width: 30,
//   },
//   top: {
//     flex: 1,
//   },
//   bottom: {
//     backgroundColor: '#FFFFFF',
//   },
//   button: {
//     marginHorizontal: 10,
//     marginBottom: 10,
//     backgroundColor: '#B8860B',
//     padding: 10,
//     justifyContent: 'center',
//     borderRadius: 4,
//   },
//   buttonText: {
//     color: '#FFDAB9',
//     textAlign: 'center',
//   },
// });

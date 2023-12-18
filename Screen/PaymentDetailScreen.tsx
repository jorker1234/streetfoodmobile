// import {
//   FlatList,
//   ImageBackground,
//   Modal,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, {useCallback, useEffect, useState} from 'react';
// import {StackScreenProps} from '@react-navigation/stack';
// import {RootStackParamList} from '../App';
// import {ApiStatus} from '../Entities/Utility';
// import {IBill} from '../Entities/Bill';
// import {useAuthenticate} from '../Contexts/AuthenticateContext';
// import {getBill} from '../Apis/Bill';
// import {AlertDialog, ConfirmDialog} from '../Components/Dialog';
// import NotFoundCard from '../Components/NotFoundCard';
// import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
// import UtilityStyle from '../Themes/Utilities';
// import PhotoStyles from './Styles/PhotoScreenStyle';

// type Props = StackScreenProps<RootStackParamList, 'PaymentDetailScreen'>;

// const PaymentDetailHeader: React.FC<{
//   bill: IBill | null;
//   onView: () => void;
// }> = ({bill, onView}) => {
//   return (
//     <View style={styles.mt1}>
//       <View style={styles.horizantal}>
//         <Text style={[styles.boxFull, styles.textTitle]}>ชื่อลูกค้า</Text>
//         <Text style={styles.textTitle}>{bill?.customer}</Text>
//       </View>
//       {bill?.imageUrl && (
//         <View style={styles.horizantal}>
//           <TouchableOpacity onPress={onView}>
//             <Text style={styles.link}>หลักฐานการโอนเงิน</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//       <View style={styles.line} />
//       <View style={styles.horizantal}>
//         <Text style={styles.textTitle}>รายการอาหาร</Text>
//       </View>
//     </View>
//   );
// };

// const PaymentDetailScreen: React.FC<Props> = ({route, navigation}) => {
//   const {id, orderId} = route.params;

//   const [status, setStatus] = useState(ApiStatus.COMPLETE);
//   const [bill, setBill] = useState<IBill | null>(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const isPending = status === ApiStatus.PENDING;
//   const {user} = useAuthenticate();
//   const shopId = user?.shopId ?? '';

//   const loadData = useCallback(async () => {
//     if (shopId && id && orderId) {
//       setStatus(ApiStatus.PENDING);
//       const result = await getBill(id, shopId, orderId);

//       setStatus(ApiStatus.COMPLETE);
//       if (result.error) {
//         AlertDialog(result.error?.message);
//         return;
//       }
//       if (result.data) {
//         setBill(result.data);
//       }
//     }
//   }, [shopId, id, orderId]);

//   useEffect(() => {
//     loadData();
//   }, [loadData]);

//   const handleAccept = async () => {
//     const isConfirm = await ConfirmDialog('คุณต้องการจะอนุมัติ ?');
//     if (!isConfirm) {
//       return;
//     }
//     navigation.navigate('MainScreen', {
//       actionStatus: 'accept',
//       actionId: id,
//       actionOrderId: orderId,
//     });
//   };
//   const handleReject = async () => {
//     const isConfirm = await ConfirmDialog('คุณต้องการจะปฎิเสธ ?');
//     if (!isConfirm) {
//       return;
//     }
//     navigation.navigate('MainScreen', {
//       actionStatus: 'reject',
//       actionId: id,
//       actionOrderId: orderId,
//     });
//   };

//   const handleView = () => {
//     setIsModalVisible(true);
//   };
//   const handleCloseModal = () => setIsModalVisible(false);
//   return (
//     <View style={styles.container}>
//       {!isPending && (
//         <>
//           <View style={styles.top}>
//             <FlatList
//               data={bill?.items}
//               keyExtractor={item => item.id}
//               ListHeaderComponent={
//                 <PaymentDetailHeader bill={bill} onView={handleView} />
//               }
//               ListEmptyComponent={<NotFoundCard />}
//               renderItem={item => (
//                 <View style={styles.horizantal}>
//                   <Text style={styles.boxQuantity}>{item.item.quantity}x</Text>
//                   <View style={styles.boxFull}>
//                     <Text style={styles.textTitle}>{item.item.name}</Text>
//                     <Text style={styles.textComment}>{item.item.note}</Text>
//                   </View>
//                   <Text>฿{item.item.price}</Text>
//                 </View>
//               )}
//             />
//           </View>
//           <View style={styles.bottom}>
//             <View style={styles.line} />
//             <View style={styles.horizantal}>
//               <Text style={[styles.boxFull, styles.textTitle]}>ทั้งหมด</Text>
//               <Text style={styles.textTitle}>฿{bill?.amount}</Text>
//             </View>
//             <TouchableOpacity style={styles.button} onPress={handleAccept}>
//               <Text style={styles.buttonText}>อนุมัติ</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.button} onPress={handleReject}>
//               <Text style={styles.buttonText}>ปฎิเสธ</Text>
//             </TouchableOpacity>
//           </View>
//         </>
//       )}
//       <Modal visible={isModalVisible} animationType="slide">
//         <View style={UtilityStyle.flex1}>
//           <ImageBackground
//             source={{uri: bill?.imageUrl}}
//             style={PhotoStyles.background}
//             resizeMode="contain">
//             <TouchableOpacity onPress={handleCloseModal}>
//               <FontAwesome5Icons
//                 name="times-circle"
//                 style={PhotoStyles.closeButton}
//               />
//             </TouchableOpacity>
//           </ImageBackground>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default PaymentDetailScreen;

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
//   link: {
//     fontSize: 14,
//     color: '#B8860B',
//   },
// });

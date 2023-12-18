import {
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import UtilityStyle from '../Themes/Utilities';
import PhotoStyles from '../Screen/Styles/PhotoScreenStyle';

type Props = {
  id: string;
  orderId: string;
  name?: string;
  customer: string;
  createdDate: string;
  price: number;
  imageUrl: string;
  acceptText?: string;
  rejectText?: string;
  onView: (id: string, orderId: string) => void;
  onAccept?: (id: string, orderId: string) => void;
  onReject?: (id: string, orderId: string) => void;
};

const TransactionCard: React.FC<Props> = ({
  id,
  orderId,
  name,
  customer,
  createdDate,
  price,
  imageUrl,
  acceptText,
  rejectText,
  onView,
  onAccept,
  onReject,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleView = () => {
    onView(id, orderId);
  };
  const handleAccept = () => {
    if (!onAccept) {
      return;
    }
    onAccept(id, orderId);
  };
  const handleReject = () => {
    if (!onReject) {
      return;
    }
    onReject(id, orderId);
  };
  const handleTransactionView = () => {
    setIsModalVisible(true);
  };
  const handleCloseModal = () => setIsModalVisible(false);
  return (
    <>
      <TouchableOpacity onPress={handleView}>
        <View style={styles.card}>
          <View>{name && <Text style={styles.cardTitle}># {name}</Text>}</View>
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
              onPress={handleTransactionView}>
              <FontAwesome5Icons name="receipt" style={styles.cardIcon} />
              <Text style={styles.cardLink}>ใบเสร็จ</Text>
            </TouchableOpacity>
            {acceptText && (
              <TouchableOpacity
                style={styles.cardBottomTouch}
                onPress={handleAccept}>
                <FontAwesome5Icons name="check" style={styles.cardIcon} />
                <Text style={styles.cardLink}>{acceptText}</Text>
              </TouchableOpacity>
            )}
            {rejectText && (
              <TouchableOpacity
                style={styles.cardBottomTouch}
                onPress={handleReject}>
                <FontAwesome5Icons name="trash-alt" style={styles.cardIcon} />
                <Text style={styles.cardLink}>{rejectText}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
      <Modal visible={isModalVisible} animationType="slide">
        <View style={UtilityStyle.flex1}>
          <ImageBackground
            source={{uri: imageUrl}}
            style={PhotoStyles.background}
            resizeMode="contain">
            <TouchableOpacity onPress={handleCloseModal}>
              <FontAwesome5Icons
                name="times-circle"
                style={PhotoStyles.closeButton}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </Modal>
    </>
  );
};

export default TransactionCard;

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

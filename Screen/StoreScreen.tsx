import {
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../App';
import PhotoUploader from '../Components/PhotoUploader';
import {Asset} from 'react-native-image-picker';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import QueueQrCode from '../Components/QueueQrCode';
import {getShop} from '../Apis/Shop';
import {IShop} from '../Entities/Menu';

type Props = StackScreenProps<RootStackParamList, 'StoreScreen'>;

const StoreScreen: React.FC<Props> = ({navigation}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [shop, setShop] = useState<IShop | null>(null);
  const loadData = async () => {
    const shopData = await getShop('645341bd4d1ff223e331b588');
    setShop(shopData);
  };
  useEffect(() => {
    loadData();
  }, []);

  const image = shop?.imageUrl ?? '';
  const qrcodeUrl =
    'https://streetfood-f6b16.web.app/menu?shopId=645341bd4d1ff223e331b588&orderId=6453d8c795ef1c9891773cb1';
  const handleChange = (photo: Asset | null) => {
    console.log(photo);
  };
  const handleQrcodeView = () => {
    console.log('OK');
    setIsModalVisible(true);
  };
  const handleQrcodeClose = () => {
    setIsModalVisible(false);
  };
  const handleSave = () => {
    navigation.goBack();
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView>
        <View style={styles.card}>
          <View style={styles.cardBody}>
            <PhotoUploader
              photoUri={image}
              defaultIconName="store"
              onChange={handleChange}
            />
            <View style={styles.cardForm}>
              <Text>ชื่อร้าน</Text>
              <TextInput style={styles.textbox} defaultValue={shop?.name} />
            </View>
            <View style={styles.cardForm}>
              <Text>เบอร์โทรศัพท์</Text>
              <TextInput style={styles.textbox} defaultValue={shop?.phone} />
            </View>
            <View style={styles.cardForm}>
              <Text>บัญชีรับเงิน</Text>
              <View style={styles.horizantal}>
                <TextInput
                  style={styles.textbox}
                  defaultValue={shop?.receiveNumber}
                />
                <TouchableOpacity
                  style={styles.cardIcon}
                  onPress={handleQrcodeView}>
                  <FontAwesome5Icon name="qrcode" style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>บันทึก</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal visible={isModalVisible} transparent={true} animationType="fade">
          <QueueQrCode url={qrcodeUrl} onClose={handleQrcodeClose} />
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default StoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    borderRadius: 4,
    margin: 10,
    marginBottom: 0,
    padding: 10,
    backgroundColor: '#FFF',
  },
  cardBody: {
    gap: 12,
  },
  cardForm: {
    gap: 4,
  },
  horizantal: {
    flexDirection: 'row',
    gap: 4,
  },
  textbox: {
    backgroundColor: '#fefbf3',
    borderColor: '#B8860B66',
    borderWidth: 1,
    borderRadius: 4,
    height: 40,
    padding: 4,
    flex: 1,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#B8860B',
    height: 40,
    justifyContent: 'center',
    borderRadius: 4,
  },
  buttonText: {
    color: '#FFDAB9',
    textAlign: 'center',
  },
  cardIcon: {
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: 10,
  },
  icon: {
    color: '#B8860B',
    fontSize: 28,
  },
});

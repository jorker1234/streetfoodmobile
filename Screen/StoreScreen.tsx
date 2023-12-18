import {
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../App';
import PhotoUploader from '../Components/PhotoUploader';
import {Asset} from 'react-native-image-picker';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import QueueQrCode from '../Components/QueueQrCode';
import {getShop, updateShop} from '../Apis/Shop';
import {IShop} from '../Entities/Shop';
import {ApiStatus} from '../Entities/Utility';
import {useAuthenticate} from '../Contexts/AuthenticateContext';
import {AlertDialog} from '../Components/Dialog';
import TextBox from '../Components/TextBox';
import Button from '../Components/Button';
import UtilityStyle from '../Themes/Utilities';

type Props = StackScreenProps<RootStackParamList, 'StoreScreen'>;

const StoreScreen: React.FC<Props> = ({navigation}) => {
  const [status, setStatus] = useState(ApiStatus.COMPLETE);
  const [firstStatus, setFirstStatus] = useState(ApiStatus.PENDING);
  const isPending = status === ApiStatus.PENDING;
  const isFirstPending = firstStatus === ApiStatus.PENDING;
  const {user} = useAuthenticate();
  const shopId = user?.shopId ?? '';

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [photo, setPhoto] = useState<Asset | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [receiveNumber, setReceiveNumber] = useState('');
  const [imageUrl, setimageUrl] = useState('');
  const [promptpay, setPromptpay] = useState('');

  const loadData = useCallback(async () => {
    if (shopId) {
      setStatus(ApiStatus.PENDING);
      const result = await getShop(shopId);
      setStatus(ApiStatus.COMPLETE);
      setFirstStatus(ApiStatus.COMPLETE);
      if (result.error) {
        AlertDialog(result.error?.message);
        return;
      }
      if (result.data) {
        const shopData = result.data ?? ({} as IShop);
        setName(shopData.name);
        setPhone(shopData.phone);
        setReceiveNumber(shopData.receiveNumber);
        setimageUrl(shopData.imageUrl);
        setPromptpay(shopData.promptpay);
      }
    }
  }, [shopId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleChange = (asset: Asset | null) => {
    setPhoto(asset);
  };
  const handleQrcodeView = () => {
    setIsModalVisible(true);
  };
  const handleQrcodeClose = () => {
    setIsModalVisible(false);
  };
  const handleSave = async () => {
    setStatus(ApiStatus.PENDING);
    const shop = {
      id: shopId,
      name,
      phone,
      receiveNumber,
      imageUrl,
    } as IShop;
    const result = await updateShop(shop, photo);
    setStatus(ApiStatus.COMPLETE);
    if (result.error) {
      AlertDialog(result.error?.message);
      return;
    }
    navigation.goBack();
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView>
        <View style={styles.card}>
          <View style={styles.cardBody}>
            <PhotoUploader
              photoUri={imageUrl}
              defaultIconName="store"
              onChange={handleChange}
            />
            <View style={styles.cardForm}>
              <Text>ชื่อร้าน</Text>
              <TextBox
                value={name}
                onChangeText={setName}
                isPending={isFirstPending}
              />
            </View>
            <View style={styles.cardForm}>
              <Text>เบอร์โทรศัพท์</Text>
              <TextBox
                value={phone}
                onChangeText={setPhone}
                isPending={isFirstPending}
              />
            </View>
            <View style={styles.cardForm}>
              <Text>บัญชีรับเงิน</Text>
              <Text style={styles.subTitle}>
                (เบอร์โทรศัพท์ หรือ หมายเลขบัตรประชาชน)
              </Text>
              <View style={styles.horizantal}>
                <View style={UtilityStyle.flex1}>
                  <TextBox
                    value={receiveNumber}
                    onChangeText={setReceiveNumber}
                    isPending={isFirstPending}
                  />
                </View>
                {!!promptpay && (
                  <TouchableOpacity
                    style={styles.cardIcon}
                    onPress={handleQrcodeView}>
                    <FontAwesome5Icon name="qrcode" style={styles.icon} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <Button
              text="บันทึก"
              onPress={handleSave}
              disabled={isPending}
              isPending={!isFirstPending && isPending}
            />
          </View>
        </View>
        <Modal visible={isModalVisible} transparent={true} animationType="fade">
          <QueueQrCode url={promptpay} onClose={handleQrcodeClose} />
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
  subTitle: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  icon: {
    color: '#B8860B',
    fontSize: 28,
  },
});

import {ImageBackground, Modal, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import SettingCard from '../Components/SettingCard';
import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../App';
import {usePhotoContext} from '../Contexts/PhotoContext';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import UtilityStyle from '../Themes/Utilities';
import Styles from './Styles/PhotoScreenStyle';

type Props = StackScreenProps<RootStackParamList, 'PhotoScreen'>;

const PhotoScreen: React.FC<Props> = ({navigation, route}) => {
  const {setPhoto} = usePhotoContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {photoUrl} = route.params;
  const handleView = () => {
    setIsModalVisible(true);
  };
  const handleChoosePhoto = async () => {
    const {assets} = await launchImageLibrary({
      mediaType: 'photo',
      maxHeight: 300,
      maxWidth: 300,
    });
    if (assets && assets.length > 0) {
      uploadPhoto(assets[0]);
    }
  };
  const handleTakePhoto = async () => {
    const {assets} = await launchCamera({
      mediaType: 'photo',
      maxHeight: 300,
      maxWidth: 300,
    });
    if (assets && assets.length > 0) {
      uploadPhoto(assets[0]);
    }
  };
  const uploadPhoto = (photo: Asset) => {
    setPhoto(photo);
    navigation.goBack();
  };
  const handleCloseModal = () => setIsModalVisible(false);
  return (
    <View>
      {!!photoUrl && (
        <SettingCard icon="image" title="ดูรูปภาพ" onPress={handleView} />
      )}

      <SettingCard
        icon="images"
        title="เลือกรูปภาพ"
        onPress={handleChoosePhoto}
      />
      <SettingCard icon="camera" title="ถ่ายภาพ" onPress={handleTakePhoto} />
      <Modal visible={isModalVisible} animationType="slide">
        <View style={UtilityStyle.flex1}>
          <ImageBackground
            source={{uri: photoUrl}}
            style={Styles.background}
            resizeMode="contain">
            <TouchableOpacity onPress={handleCloseModal}>
              <FontAwesome5Icons
                name="times-circle"
                style={Styles.closeButton}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </Modal>
    </View>
  );
};

export default PhotoScreen;

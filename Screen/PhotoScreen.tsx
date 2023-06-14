import {
  ImageBackground,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
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
type Props = StackScreenProps<RootStackParamList, 'PhotoScreen'>;

const PhotoScreen: React.FC<Props> = ({navigation, route}) => {
  const {setPhoto} = usePhotoContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {photoUrl} = route.params;
  const handleView = () => {
    setIsModalVisible(true);
  };
  const handleChoosePhoto = async () => {
    const {assets} = await launchImageLibrary({mediaType: 'photo'});
    if (assets && assets.length > 0) {
      uploadPhoto(assets[0]);
    }
  };
  const handleTakePhoto = async () => {
    const {assets} = await launchCamera({mediaType: 'photo'});
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
        <View style={styles.container}>
          <ImageBackground
            source={{uri: photoUrl}}
            style={styles.backgroundImage}>
            <TouchableOpacity onPress={handleCloseModal}>
              <FontAwesome5Icons
                name="times-circle"
                style={styles.closeButton}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </Modal>
    </View>
  );
};

export default PhotoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  closeButton: {
    fontSize: 40,
    color: '#B8860B',
    margin: 20,
  },
});

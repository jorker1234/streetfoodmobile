import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import {Asset} from 'react-native-image-picker';
import {usePhotoContext} from '../Contexts/PhotoContext';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../App';

type Props = {
  defaultIconName: string;
  photoUri: string;
  onChange: (Photo: Asset | null) => void;
};

const PhotoUploader: React.FC<Props> = ({
  defaultIconName,
  photoUri,
  onChange,
}) => {
  const {photo, resetPhoto} = usePhotoContext();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const imageUri = photo?.uri ?? photoUri ?? '';
  useEffect(() => {
    console.log('resetPhoto');
    resetPhoto();
  }, []);

  useEffect(() => {
    onChange(photo);
  }, [onChange, photo]);
  const handlePhoto = () => {
    navigation.navigate('PhotoScreen', {photoUrl: imageUri});
  };
  const styleImage = !imageUri
    ? [styles.container, styles.containerBlank]
    : [styles.container];
  return (
    <TouchableOpacity onPress={handlePhoto} style={styleImage}>
      {!!imageUri && <Image source={{uri: imageUri}} style={styles.image} />}
      {!imageUri && (
        <FontAwesome5Icons name={defaultIconName} style={styles.imageIcon} />
      )}
      <View style={styles.cardIcon}>
        <FontAwesome5Icons name="camera" style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
};

export default PhotoUploader;

const styles = StyleSheet.create({
  container: {
    width: 151,
    height: 151,
    alignSelf: 'center',
    borderRadius: 100,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#B8860B',
    borderWidth: 1,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },

  imageIcon: {
    fontSize: 60,
    color: '#FFFFFF',
  },
  containerBlank: {
    backgroundColor: '#B8860B',
  },
  cardIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#DDDDDD',
    padding: 8,
    margin: 8,
    borderRadius: 100,
  },
  icon: {
    fontSize: 16,
  },
});

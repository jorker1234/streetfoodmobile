import {Image, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import {Asset} from 'react-native-image-picker';
import {usePhotoContext} from '../Contexts/PhotoContext';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import ComponentStyle from '../Themes/Components';
import UtilityStyle from '../Themes/Utilities';

type Props = {
  defaultIconName: string;
  photoUri: string;
  editable?: boolean;
  onChange: (Photo: Asset | null) => void;
};

const PhotoUploader: React.FC<Props> = ({
  defaultIconName,
  photoUri,
  editable = true,
  onChange,
}) => {
  const {photo, resetPhoto} = usePhotoContext();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const imageUri = photo?.uri ?? photoUri ?? '';
  useEffect(() => {
    resetPhoto();
  }, [resetPhoto]);

  useEffect(() => {
    onChange(photo);
  }, [onChange, photo]);
  const handlePhoto = () => {
    navigation.navigate('PhotoScreen', {photoUrl: imageUri});
  };
  const styleImage = !imageUri
    ? [ComponentStyle.photoContainer, UtilityStyle.backgroundPrimary]
    : [ComponentStyle.photoContainer];
  return (
    <TouchableOpacity
      onPress={handlePhoto}
      style={styleImage}
      disabled={!editable}>
      {!!imageUri && (
        <Image source={{uri: imageUri}} style={ComponentStyle.photoImage} />
      )}
      {!imageUri && (
        <FontAwesome5Icons
          name={defaultIconName}
          style={ComponentStyle.photoDefaultImage}
        />
      )}
      <View style={ComponentStyle.photoIcon}>
        <FontAwesome5Icons name="camera" style={UtilityStyle.font16} />
      </View>
    </TouchableOpacity>
  );
};

export default PhotoUploader;

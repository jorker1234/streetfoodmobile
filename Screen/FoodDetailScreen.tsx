import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../App';
import PhotoUploader from '../Components/PhotoUploader';
import {Asset} from 'react-native-image-picker';
import {IMenu} from '../Entities/Menu';
import {createMenu, deleteMenu, updateMenu} from '../Apis/Menu';
import {useAuthenticate} from '../Contexts/AuthenticateContext';
import {ActionType, ApiStatus} from '../Entities/Utility';

type Props = StackScreenProps<RootStackParamList, 'FoodDetailScreen'>;

const FoodDetailScreen: React.FC<Props> = ({route, navigation}) => {
  const {menu} = route.params;
  const [status, setStatus] = useState(ApiStatus.COMPLETE);
  const [actionType, setActionType] = useState(ActionType.NONE);
  const [photo, setPhoto] = useState<Asset | null>(null);
  const [name, setName] = useState(menu?.name ?? '');
  const [description, setDescription] = useState(menu?.description ?? '');
  const [price, setPrice] = useState(menu?.price?.toString());
  const [isHidden, setIsHidden] = useState(true);

  const {user} = useAuthenticate();

  const id = menu?.id ?? '';
  const shopId = user?.shopId ?? '';
  const isPending = status === ApiStatus.PENDING;
  const isEditable = status === ApiStatus.COMPLETE;
  const image = photo?.uri ?? menu?.imageUrl ?? '';
  const handleToggleSwitch = () => setIsHidden(previousState => !previousState);
  const statusName = isHidden ? 'โชว์สินค้า' : 'ซ่อนสินค้า';
  const handleSave = async () => {
    if (!shopId) {
      return;
    }
    setActionType(ActionType.UPDATE);
    setStatus(ApiStatus.PENDING);
    const params: IMenu = {
      id,
      name,
      shopId,
      description,
      isHidden,
      price: parseFloat(price ?? '0'),
    };
    const result = menu?.id
      ? await updateMenu(params, photo)
      : await createMenu(params, photo);
    setStatus(ApiStatus.COMPLETE);
    setActionType(ActionType.NONE);
    if (result.error) {
      Alert.alert(result.error.message);
      return;
    }
    navigation.navigate('FoodScreen', {lastUpdated: new Date().toISOString()});
  };
  const handleDelete = async () => {
    if (!id || !shopId) {
      return;
    }
    setActionType(ActionType.DELETE);
    setStatus(ApiStatus.PENDING);
    const result = await deleteMenu(id, shopId);
    setStatus(ApiStatus.COMPLETE);
    setActionType(ActionType.NONE);
    if (result.error) {
      Alert.alert(result.error.message);
      return;
    }
    navigation.navigate('FoodScreen', {lastUpdated: new Date().toISOString()});
  };
  const handleOnChange = (asset: Asset | null) => {
    setPhoto(asset);
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView>
        <View style={styles.card}>
          <View style={styles.cardBody}>
            <PhotoUploader
              photoUri={image}
              defaultIconName="image"
              editable={isEditable}
              onChange={handleOnChange}
            />
            <View style={styles.cardForm}>
              <Text>ชื่อรายการ</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                editable={isEditable}
                style={styles.textbox}
                value={name}
                onChangeText={setName}
              />
            </View>
            <View style={styles.cardForm}>
              <Text>รายละเอียด</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                editable={isEditable}
                style={styles.textbox}
                value={description}
                onChangeText={setDescription}
              />
            </View>
            <View style={styles.cardForm}>
              <Text>ราคา</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                editable={isEditable}
                keyboardType="number-pad"
                style={styles.textbox}
                value={price}
                onChangeText={setPrice}
              />
            </View>
            <View style={[styles.cardForm, styles.cardHorizantal]}>
              <Text style={styles.flex1}>{statusName}</Text>
              <Switch
                trackColor={{false: '#767577', true: '#fefbf3'}}
                thumbColor={isHidden ? '#B8860B' : '#f4f3f4'}
                //ios_backgroundColor="#fefbf3"
                disabled={!isEditable || !menu?.id}
                onValueChange={handleToggleSwitch}
                value={isHidden}
              />
            </View>
            <View style={styles.cardForm}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleSave}
                disabled={isPending}>
                {actionType !== ActionType.UPDATE && (
                  <Text style={styles.buttonText}>บันทึก</Text>
                )}
                {isPending && actionType === ActionType.UPDATE && (
                  <ActivityIndicator size="small" color="#FFDAB9" />
                )}
              </TouchableOpacity>
              {!!id && (
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleDelete}
                  disabled={isPending}>
                  {actionType !== ActionType.DELETE && (
                    <Text style={styles.buttonText}>ลบ</Text>
                  )}
                  {isPending && actionType === ActionType.DELETE && (
                    <ActivityIndicator size="small" color="#FFDAB9" />
                  )}
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FoodDetailScreen;

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
  cardHorizantal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
  textbox: {
    backgroundColor: '#fefbf3',
    borderColor: '#B8860B66',
    borderWidth: 1,
    borderRadius: 4,
    height: 40,
    padding: 4,
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
});

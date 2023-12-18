import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../App';
import {useAuthenticate} from '../Contexts/AuthenticateContext';
import {ActionType, ApiStatus} from '../Entities/Utility';
import {IMaterial} from '../Entities/Material';
import {createMaterial, deleteMaterial, updateMaterial} from '../Apis/Material';
import {ConfirmDialog} from '../Components/Dialog';

type Props = StackScreenProps<RootStackParamList, 'MaterialDetailScreen'>;

const MaterialDetailScreen: React.FC<Props> = ({route, navigation}) => {
  const {material} = route.params;
  const [status, setStatus] = useState(ApiStatus.COMPLETE);
  const [actionType, setActionType] = useState(ActionType.NONE);
  const [name, setName] = useState(material?.name ?? '');
  const [description, setDescription] = useState(material?.description ?? '');
  const [price, setPrice] = useState(material?.price?.toString());
  const [unit, setUnit] = useState(material?.unit ?? '');

  const {user} = useAuthenticate();

  const id = material?.id ?? '';
  const shopId = user?.shopId ?? '';
  const isPending = status === ApiStatus.PENDING;
  const isEditable = status === ApiStatus.COMPLETE;
  const handleSave = async () => {
    if (!shopId) {
      return;
    }
    setActionType(ActionType.UPDATE);
    setStatus(ApiStatus.PENDING);
    const params: IMaterial = {
      id,
      name,
      shopId,
      description,
      unit,
      price: parseFloat(price ?? '0'),
    };
    const result = material?.id
      ? await updateMaterial(params)
      : await createMaterial(params);
    setStatus(ApiStatus.COMPLETE);
    setActionType(ActionType.NONE);
    if (result.error) {
      Alert.alert(result.error.message);
      return;
    }
    navigation.navigate('MaterialScreen', {
      lastUpdated: new Date().toISOString(),
    });
  };
  const handleDelete = async () => {
    if (!id || !shopId) {
      return;
    }
    const isConfirm = await ConfirmDialog('คุณต้องการจะลบข้อมูล ?');
    if (!isConfirm) {
      return;
    }
    setActionType(ActionType.DELETE);
    setStatus(ApiStatus.PENDING);
    const result = await deleteMaterial(id, shopId);
    setStatus(ApiStatus.COMPLETE);
    setActionType(ActionType.NONE);
    if (result.error) {
      Alert.alert(result.error.message);
      return;
    }
    navigation.navigate('MaterialScreen', {
      lastUpdated: new Date().toISOString(),
    });
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView>
        <View style={styles.card}>
          <View style={styles.cardBody}>
            <View style={styles.cardForm}>
              <Text>ชื่อวัตถุดิบ</Text>
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
              <Text>ราคาต่อหน่วย</Text>
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
            <View style={styles.cardForm}>
              <Text>ชื่อหน่วย</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                editable={isEditable}
                style={styles.textbox}
                value={unit}
                onChangeText={setUnit}
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

export default MaterialDetailScreen;

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

import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../App';
import {useAuthenticate} from '../Contexts/AuthenticateContext';
import {ActionType, ApiStatus} from '../Entities/Utility';
import {IMaterial} from '../Entities/Material';
import {getMaterials} from '../Apis/Material';
import {ConfirmDialog} from '../Components/Dialog';
import DropDownPicker from 'react-native-dropdown-picker';
import {updateMenuMaterials} from '../Apis/MenuMaterial';

type Props = StackScreenProps<RootStackParamList, 'FoodMaterialDetailScreen'>;

const FoodMaterialDetailScreen: React.FC<Props> = ({route, navigation}) => {
  const {menuId, material, materialExistIds} = route.params;
  const [materials, setMaterials] = useState<IMaterial[]>([]);
  const [status, setStatus] = useState(ApiStatus.COMPLETE);
  const [actionType, setActionType] = useState(ActionType.NONE);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dropDownItems = materials.map(o => {
    return {
      label: o.name,
      value: o.id,
    };
  });

  const [materialId, setMaterialId] = useState(material?.id ?? '');
  const [quantity, setQuantity] = useState(material?.quantity?.toString());
  const [note, setNote] = useState(material?.note ?? '');
  const materialSelected = materials.find(o => o.id === materialId);
  const unit = materialSelected?.unit ?? 'หน่วย';
  const price = materialSelected?.price ?? 0;
  const quantityFloat = parseFloat(quantity ? quantity : '0');
  const amount = price === 0 || quantityFloat === 0 ? 0 : price * quantityFloat;

  const {user} = useAuthenticate();

  const id = material?.id ?? '';
  const shopId = user?.shopId ?? '';
  const isPending = status === ApiStatus.PENDING;
  const isEditable = status === ApiStatus.COMPLETE;

  const loadData = useCallback(async () => {
    if (shopId) {
      setStatus(ApiStatus.PENDING);
      const result = await getMaterials(shopId);
      setStatus(ApiStatus.COMPLETE);
      if (result.error) {
        Alert.alert(result.error?.message);
        return;
      }
      if (result.data) {
        const resultMaterials = result.data?.materials ?? [];
        const filteredMaterials = resultMaterials.filter(
          o => materialExistIds.indexOf(o.id) < 0 || id === o.id,
        );
        if (filteredMaterials.length === 0) {
          Alert.alert('ไม่มีวัตถุดิบให้เพิ่มแล้ว');
          navigation.navigate('FoodMaterialScreen', {
            menuId,
          });
          return;
        }
        setMaterials(filteredMaterials);
        if (!materialId) {
          setMaterialId(filteredMaterials[0].id);
        }
      }
    }
  }, [id, materialExistIds, materialId, menuId, navigation, shopId]);
  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSave = async () => {
    await updateMenuMaterial(materialId, quantity ?? '', note);
  };
  const handleDelete = async () => {
    const isConfirm = await ConfirmDialog('คุณต้องการจะลบข้อมูล ?');
    if (!isConfirm) {
      return;
    }
    await updateMenuMaterial(id, '0', '');
  };

  const updateMenuMaterial = async (
    materialId: string,
    quantityText: string,
    note: string,
  ) => {
    if (!menuId || !shopId) {
      return;
    }
    const quantity = parseFloat(quantityText ?? '0');
    const actionType = quantity === 0 ? ActionType.DELETE : ActionType.UPDATE;
    setActionType(actionType);
    setStatus(ApiStatus.PENDING);

    const result = await updateMenuMaterials(
      menuId,
      shopId,
      materialId,
      quantity,
      note,
    );
    setStatus(ApiStatus.COMPLETE);
    setActionType(ActionType.NONE);
    if (result.error) {
      Alert.alert(result.error.message);
      return;
    }
    navigation.navigate('FoodMaterialScreen', {
      menuId,
      lastUpdated: new Date().toISOString(),
    });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardBody}>
          <View style={styles.cardForm}>
            <Text>วัตถุดิบ</Text>
          </View>
          <DropDownPicker
            open={dropDownOpen}
            value={materialId}
            items={dropDownItems}
            setOpen={setDropDownOpen}
            setValue={setMaterialId}
            disabled={!!id}
          />
          <View style={styles.cardForm}>
            <Text>จำนวน ({unit})</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              editable={isEditable}
              keyboardType="number-pad"
              style={styles.textbox}
              value={quantity}
              onChangeText={setQuantity}
            />
          </View>
          <View style={styles.cardForm}>
            <Text>รายละเอียด</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              editable={isEditable}
              style={styles.textbox}
              value={note}
              onChangeText={setNote}
            />
          </View>
          <View style={styles.cardHorizantal}>
            <Text style={styles.labelTitle}>ราคาต่อ{unit}</Text>
            <Text>฿{price.toFixed(2)}</Text>
          </View>
          <View style={styles.cardHorizantal}>
            <Text style={[styles.labelTitle, styles.fontBold]}>ราคาสุทธิ</Text>
            <Text style={styles.fontBold}>฿{amount.toFixed(2)}</Text>
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
    </KeyboardAvoidingView>
  );
};

export default FoodMaterialDetailScreen;

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
    //flex: 1,
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
    zIndex: 0,
  },
  buttonText: {
    color: '#FFDAB9',
    textAlign: 'center',
  },
  labelTitle: {
    flex: 1,
  },
  fontBold: {
    fontWeight: 'bold',
  },
});

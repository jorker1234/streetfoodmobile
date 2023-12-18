import {Alert, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {RootStackParamList} from '../App';
import {StackScreenProps} from '@react-navigation/stack';
import {IMaterial} from '../Entities/Material';
import {ApiStatus} from '../Entities/Utility';
import {useAuthenticate} from '../Contexts/AuthenticateContext';
import {ConfirmDialog} from '../Components/Dialog';
import NotFoundCard from '../Components/NotFoundCard';
import ContentLoaderCard from '../Components/ContentLoaderCard';
import FoodMaterialCard from '../Components/FoodMaterialCard';
import {updateMenuMaterials} from '../Apis/MenuMaterial';
import {getMaterialByMenuId} from '../Apis/Material';
import HeaderButton from '../Components/HeaderButton';

type Props = StackScreenProps<RootStackParamList, 'FoodMaterialScreen'>;

const FoodMaterialScreen: React.FC<Props> = ({navigation, route}) => {
  const lastUpdated = route.params?.lastUpdated;
  const menuId = route.params?.menuId;
  const [status, setStatus] = useState(ApiStatus.COMPLETE);
  const [materials, setMaterials] = useState<IMaterial[]>([]);
  const [isRefresh, setIsRefresh] = useState(false);

  const isPending = status === ApiStatus.PENDING;
  const {user} = useAuthenticate();
  const shopId = user?.shopId;
  const amount = materials.reduce(
    (previousValue, material) =>
      previousValue + material.price * (material.quantity ?? 0),
    0,
  );

  const loadData = useCallback(async () => {
    if (shopId && menuId) {
      setStatus(ApiStatus.PENDING);
      const result = await getMaterialByMenuId(shopId, menuId);
      setStatus(ApiStatus.COMPLETE);
      if (result.error) {
        Alert.alert(result.error?.message);
        return;
      }
      if (result.data) {
        const resultMaterials = result.data?.materials ?? [];
        setMaterials(resultMaterials);
        const materialExistIds = resultMaterials.map(o => o.id);
        navigation.setOptions({
          headerRight: () =>
            HeaderButton({
              iconName: 'plus-circle',
              handlePress: () =>
                navigation.navigate('FoodMaterialDetailScreen', {
                  menuId,
                  materialExistIds,
                }),
            }),
        });
      }
    }
  }, [shopId, menuId, navigation]);
  useEffect(() => {
    loadData();
  }, [lastUpdated, loadData]);
  const handleRefresh = async () => {
    setIsRefresh(true);
    await loadData();
    setIsRefresh(false);
  };
  const handleView = (material: IMaterial) => {
    const materialExistIds = materials.map(o => o.id);
    navigation.navigate('FoodMaterialDetailScreen', {
      menuId,
      material,
      materialExistIds,
    });
  };
  const handleDelete = async (material: IMaterial) => {
    if (!material.id || !shopId) {
      return;
    }
    const isConfirm = await ConfirmDialog('คุณต้องการจะลบข้อมูล ?');
    if (!isConfirm) {
      return;
    }
    setStatus(ApiStatus.PENDING);
    const result = await updateMenuMaterials(
      menuId,
      shopId,
      material.id,
      0,
      '',
    );
    setStatus(ApiStatus.COMPLETE);
    if (result.error) {
      Alert.alert(result.error.message);
      return;
    }
    await loadData();
  };
  const emptyItems = [{id: '1'}, {id: '2'}, {id: '3'}, {id: '4'}];
  return (
    <View>
      {isPending && (
        <FlatList
          data={emptyItems}
          keyExtractor={item => item.id}
          renderItem={({item}) => <ContentLoaderCard />}
        />
      )}
      {!isPending && (
        <FlatList
          data={materials}
          keyExtractor={item => item.id}
          refreshing={isRefresh}
          onRefresh={handleRefresh}
          ListEmptyComponent={<NotFoundCard />}
          ListHeaderComponent={<FoodMaterialHeader amount={amount} />}
          renderItem={({item}) => (
            <FoodMaterialCard
              materail={item}
              onView={handleView}
              onDelete={handleDelete}
            />
          )}
          ListFooterComponent={<View style={styles.footer} />}
        />
      )}
    </View>
  );
};

const FoodMaterialHeader: React.FC<{
  amount: number;
}> = ({amount}) => {
  return (
    <View style={styles.mt1}>
      <View style={styles.horizantal}>
        <Text style={styles.textTitle}>รายการวัตถุดิบ</Text>
        <Text style={styles.textCost}>฿{amount}</Text>
      </View>
    </View>
  );
};

export default FoodMaterialScreen;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  footer: {
    marginBottom: 10,
  },
  card: {
    borderRadius: 4,
    margin: 10,
    marginBottom: 0,
    padding: 10,
    backgroundColor: '#FFF',
  },
  cardBody: {
    flexDirection: 'row',
    height: 100,
  },
  mt1: {
    marginTop: 1,
  },
  horizantal: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  textTitle: {
    fontWeight: 'bold',
    flex: 1,
  },
  textCost: {
    fontWeight: 'bold',
    marginRight: 20,
  },
});

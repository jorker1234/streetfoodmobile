import {Alert, FlatList, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {RootStackParamList} from '../App';
import {StackScreenProps} from '@react-navigation/stack';
import {IMaterial} from '../Entities/Material';
import {ApiStatus} from '../Entities/Utility';
import {useAuthenticate} from '../Contexts/AuthenticateContext';
import {deleteMaterial, getMaterials} from '../Apis/Material';
import {ConfirmDialog} from '../Components/Dialog';
import NotFoundCard from '../Components/NotFoundCard';
import MaterialCard from '../Components/MaterialCard';
import ContentLoaderCard from '../Components/ContentLoaderCard';

type Props = StackScreenProps<RootStackParamList, 'MaterialScreen'>;

const MaterialScreen: React.FC<Props> = ({navigation, route}) => {
  const lastUpdated = route.params?.lastUpdated;
  const [status, setStatus] = useState(ApiStatus.COMPLETE);
  const [materials, setMaterials] = useState<IMaterial[]>([]);
  const [isRefresh, setIsRefresh] = useState(false);

  const isPending = status === ApiStatus.PENDING;
  const {user} = useAuthenticate();
  const shopId = user?.shopId;

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
        setMaterials(result.data?.materials ?? []);
      }
    }
  }, [shopId]);
  useEffect(() => {
    loadData();
  }, [lastUpdated, loadData]);
  const handleRefresh = async () => {
    setIsRefresh(true);
    await loadData();
    setIsRefresh(false);
  };
  const handleView = (material: IMaterial) => {
    navigation.navigate('MaterialDetailScreen', {material});
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
    const result = await deleteMaterial(material.id, shopId);
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
          renderItem={({item}) => (
            <MaterialCard
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

export default MaterialScreen;

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
});

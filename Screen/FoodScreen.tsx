import {Alert, FlatList, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import FoodCard from '../Components/FoodCard';
import {RootStackParamList} from '../App';
import {StackScreenProps} from '@react-navigation/stack';
import {ApiStatus} from '../Entities/Utility';
import {useAuthenticate} from '../Contexts/AuthenticateContext';
import {deleteMenu, getMenus, updateMenuHidden} from '../Apis/Menu';
import {IMenu} from '../Entities/Menu';
import NotFoundCard from '../Components/NotFoundCard';
import {ConfirmDialog} from '../Components/Dialog';
import ContentLoaderCard from '../Components/ContentLoaderCard';

type Props = StackScreenProps<RootStackParamList, 'FoodScreen'>;

const MenuScreen: React.FC<Props> = ({navigation, route}) => {
  const lastUpdated = route.params?.lastUpdated;
  const [status, setStatus] = useState(ApiStatus.COMPLETE);
  const [menus, setMenus] = useState<IMenu[]>([]);
  const [isRefresh, setIsRefresh] = useState(false);

  const isPending = status === ApiStatus.PENDING;
  const {user} = useAuthenticate();
  const shopId = user?.shopId ?? '';

  const loadData = useCallback(async () => {
    if (shopId) {
      setStatus(ApiStatus.PENDING);
      const result = await getMenus(shopId);
      setStatus(ApiStatus.COMPLETE);
      if (result.error) {
        Alert.alert(result.error?.message);
        return;
      }
      if (result.data) {
        setMenus(result.data?.menus ?? []);
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
  const handleView = (menu: IMenu) => {
    navigation.navigate('FoodDetailScreen', {menu});
  };
  const handleDelete = async (menu: IMenu) => {
    const isConfirm = await ConfirmDialog('คุณต้องการจะลบข้อมูล ?');
    if (!isConfirm) {
      return;
    }
    setStatus(ApiStatus.PENDING);
    const result = await deleteMenu(menu.id, shopId);
    setStatus(ApiStatus.COMPLETE);
    if (result.error) {
      Alert.alert(result.error.message);
      return;
    }
    await loadData();
  };
  const handleStatusChange = async (menu: IMenu, isHidden: boolean) => {
    const text = isHidden ? 'ซ่อนสินค้า' : 'โชว์สินค้า';
    const isConfirm = await ConfirmDialog(`คณต้องการจะ${text} ?`);
    if (!isConfirm) {
      return;
    }
    setStatus(ApiStatus.PENDING);
    const result = await updateMenuHidden(menu.id, shopId, isHidden);
    setStatus(ApiStatus.COMPLETE);
    if (result.error) {
      Alert.alert(result.error.message);
      return;
    }
    await loadData();
  };
  const handleViewMaterial = (menu: IMenu) => {
    navigation.navigate('FoodMaterialScreen', {menuId: menu.id});
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
          data={menus}
          keyExtractor={item => item.id}
          refreshing={isRefresh}
          onRefresh={handleRefresh}
          ListEmptyComponent={<NotFoundCard />}
          renderItem={({item}) => (
            <FoodCard
              menu={item}
              onView={handleView}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              onViewMaterial={handleViewMaterial}
            />
          )}
          ListFooterComponent={<View style={styles.footer} />}
        />
      )}
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  footer: {
    marginBottom: 10,
  },
  contentLoader: {
    //backgroundColor: '#000',
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

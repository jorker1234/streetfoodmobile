import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import {IMenu} from '../Entities/Menu';

type Props = {
  menu: IMenu;
  onView: (menu: IMenu) => void;
  onDelete: (menu: IMenu) => void;
  onStatusChange: (menu: IMenu, isActive: boolean) => void;
  onViewMaterial: (menu: IMenu) => void;
};

const FoodCard: React.FC<Props> = ({
  menu,
  onView,
  onDelete,
  onStatusChange,
  onViewMaterial,
}) => {
  const handleView = () => {
    onView(menu);
  };
  const handleDelete = () => {
    onDelete(menu);
  };
  const handleStatusChange = () => {
    onStatusChange(menu, !menu.isHidden);
  };
  const handleMaterial = () => {
    onViewMaterial(menu);
  };
  const image = menu.imageUrl;
  const textHidden = menu.isHidden ? 'โขว์สินค้า' : 'ซ่อนสินค้า';
  const iconHidden = menu.isHidden ? 'eye' : 'eye-slash';
  return (
    <TouchableOpacity onPress={handleView}>
      <View style={styles.card}>
        <View style={styles.cardBody}>
          {!image && (
            <FontAwesome5Icons
              name="image"
              size={64}
              style={styles.cardImage}
            />
          )}
          {!!image && <Image source={{uri: image}} style={styles.image} />}
          <View style={styles.cardLef}>
            <Text style={styles.cardTitle}>{menu.name}</Text>
            <Text style={styles.cardDate}>{menu.description}</Text>
          </View>
          <Text style={styles.cardTitle}>฿{menu.price}</Text>
        </View>
        <View style={styles.cardBottom}>
          <TouchableOpacity
            style={styles.cardBottomTouch}
            onPress={handleStatusChange}>
            <FontAwesome5Icons name={iconHidden} style={styles.cardIcon} />
            <Text style={styles.cardLink}>{textHidden}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cardBottomTouch}
            onPress={handleDelete}>
            <FontAwesome5Icons name="trash-alt" style={styles.cardIcon} />
            <Text style={styles.cardLink}>ลบรายการ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cardBottomTouch}
            onPress={handleMaterial}>
            <FontAwesome5Icons name="list-alt" style={styles.cardIcon} />
            <Text style={styles.cardLink}>วัตถุดิบ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FoodCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 4,
    margin: 10,
    marginBottom: 0,
    padding: 10,
    backgroundColor: '#FFF',
  },
  cardBody: {
    flexDirection: 'row',
  },
  cardImage: {
    width: 64,
    marginRight: 20,
    color: '#B8860B',
  },
  image: {
    width: 64,
    height: 64,
    marginRight: 20,
  },
  cardLef: {
    gap: 4,
    flex: 1,
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardDate: {
    fontSize: 10,
  },
  cardBottom: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 20,
  },
  cardBottomTouch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardLink: {
    fontSize: 14,
    color: '#B8860B',
  },
  cardIcon: {
    paddingVertical: 10,
    paddingHorizontal: 4,
    color: '#B8860B',
    fontSize: 14,
    justifyContent: 'center',
  },
});

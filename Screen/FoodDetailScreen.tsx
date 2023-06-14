import {
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

type Props = StackScreenProps<RootStackParamList, 'FoodDetailScreen'>;

const FoodDetailScreen: React.FC<Props> = ({route, navigation}) => {
  const [isActive, setIsActive] = useState(true);
  const {id} = route.params;
  console.log(id);
  //   const image =
  //     'https://firebasestorage.googleapis.com/v0/b/streetfood-f6b16.appspot.com/o/menus%2Fstf_shop_01_menu_03_1683178432104.jpeg?alt=media&token=c889e993-d872-4dd8-a6ec-993f0615644e';
  const image = '';
  const handleToggleSwitch = () => setIsActive(previousState => !previousState);
  const statusName = isActive ? 'ใช้งาน' : 'สินค้าหมด';
  const handleSave = () => {
    navigation.goBack();
  };
  const handleDelete = () => {
    navigation.goBack();
  };
  const handleOnChange = (photo: Asset | null) => {
    console.log(photo);
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView>
        <View style={styles.card}>
          <View style={styles.cardBody}>
            <PhotoUploader
              photoUri={image}
              defaultIconName="image"
              onChange={handleOnChange}
            />
            <View style={styles.cardForm}>
              <Text>ชื่อรายการ</Text>
              <TextInput style={styles.textbox} />
            </View>
            <View style={styles.cardForm}>
              <Text>รายละเอียด</Text>
              <TextInput style={styles.textbox} />
            </View>
            <View style={styles.cardForm}>
              <Text>ราคา</Text>
              <TextInput style={styles.textbox} />
            </View>
            <View style={[styles.cardForm, styles.cardHorizantal]}>
              <Text style={styles.flex1}>{statusName}</Text>
              <Switch
                trackColor={{false: '#767577', true: '#fefbf3'}}
                thumbColor={isActive ? '#B8860B' : '#f4f3f4'}
                //ios_backgroundColor="#fefbf3"
                onValueChange={handleToggleSwitch}
                value={isActive}
              />
            </View>
            <View style={styles.cardForm}>
              <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>บันทึก</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleDelete}>
                <Text style={styles.buttonText}>ลบ</Text>
              </TouchableOpacity>
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

import {Alert} from 'react-native';

export const ConfirmDialog = (
  title: string,
  message = '',
  buttonOk = 'ตกลง',
  buttonCancel = 'ยกเลิก',
) => {
  return new Promise(reslove => {
    Alert.alert(title, message, [
      {text: buttonOk, onPress: () => reslove(true)},
      {
        text: buttonCancel,
        onPress: () => reslove(false),
        style: 'cancel',
      },
    ]);
  });
};

export const AlertDialog = (title: string, message = '', buttonOk = 'ตกลง') => {
  return new Promise(reslove => {
    Alert.alert(title, message, [
      {text: buttonOk, onPress: () => reslove(true)},
    ]);
  });
};

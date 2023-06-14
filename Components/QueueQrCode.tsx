import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import QRCode from 'react-native-qrcode-svg';

type Props = {
  url: string;
  onClose: () => void;
};

const QueueQrCode: React.FC<Props> = ({url, onClose}) => {
  return (
    <TouchableOpacity style={styles.dialog} onPress={onClose} activeOpacity={1}>
      <View style={styles.dialogView}>
        <TouchableOpacity activeOpacity={1}>
          <QRCode value={url} size={300} />
        </TouchableOpacity>
        <View />
      </View>
    </TouchableOpacity>
  );
};

export default QueueQrCode;

const styles = StyleSheet.create({
  dialog: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dialogView: {
    backgroundColor: '#FFF',
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    padding: 20,
    gap: 8,
  },
});

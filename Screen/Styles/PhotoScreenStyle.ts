import {StyleSheet} from 'react-native';
import Colors from '../../Themes/Colors';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  closeButton: {
    fontSize: 40,
    color: Colors.primary,
    margin: 20,
  },
});

export default styles;

import {StyleSheet} from 'react-native';
import Colors from '../../Themes/Colors';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    gap: 20,
  },
  loading: {
    color: Colors.textboxText,
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default styles;

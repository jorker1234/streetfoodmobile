import {StyleSheet} from 'react-native';
import Colors from '../../Themes/Colors';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: Colors.background,
    gap: 12,
  },
  logo: {
    flexGrow: 2,
    justifyContent: 'flex-end',
  },
  form: {
    flexGrow: 3,
    gap: 14,
    padding: 14,
    width: '100%',
  },
});

export default styles;

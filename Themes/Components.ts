import {StyleSheet} from 'react-native';
import Colors from './Colors';

const styles = StyleSheet.create({
  textbox2: {
    backgroundColor: Colors.textbox,
    borderRadius: 4,
    height: 40,
    padding: 4,
    color: Colors.textboxText,
  },
  textbox: {
    backgroundColor: Colors.textbox,
    borderColor: Colors.textboxBorder,
    borderWidth: 1,
    borderRadius: 4,
    height: 40,
    padding: 4,
    color: Colors.textboxText,
  },
  primaryButton: {
    marginTop: 10,
    backgroundColor: Colors.primaryButton,
    height: 40,
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: Colors.primaryButtonText,
    textAlign: 'center',
  },
  photoContainer: {
    width: 151,
    height: 151,
    alignSelf: 'center',
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  photoImage: {
    width: 150,
    height: 150,
  },
  photoDefaultImage: {
    fontSize: 60,
    color: Colors.white,
  },
  photoIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.gray,
    padding: 8,
    margin: 8,
    borderRadius: 100,
  },
});

export default styles;

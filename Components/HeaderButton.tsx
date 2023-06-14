import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';

type Props = {
  iconName: string;
  handlePress: () => void;
};

const HeaderButton: React.FC<Props> = ({iconName, handlePress}) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <FontAwesome5Icons name={iconName} style={styles.headerIcon} />
    </TouchableOpacity>
  );
};

export default HeaderButton;

const styles = StyleSheet.create({
  headerIcon: {
    margin: 8,
    color: '#B8860B',
    fontSize: 24,
  },
});

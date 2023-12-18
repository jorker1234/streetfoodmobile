import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import Components from '../Themes/Components';
import React from 'react';
import Colors from '../Themes/Colors';

type Props = {
  isPending?: boolean | undefined;
  text: string;
} & TouchableOpacityProps;

const Button = (props: Props) => {
  return (
    <TouchableOpacity style={Components.primaryButton} {...props}>
      {!props.isPending && (
        <Text style={Components.primaryButtonText}>{props.text}</Text>
      )}
      {props.isPending && (
        <ActivityIndicator size="small" color={Colors.activityIndicator} />
      )}
    </TouchableOpacity>
  );
};

export default Button;

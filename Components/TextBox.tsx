import {TextInput, TextInputProps, View} from 'react-native';
import Components from '../Themes/Components';
import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';
import Colors from '../Themes/Colors';

type Props = {
  isPending?: boolean | undefined;
} & TextInputProps;

const TextBox = (props: Props) => {
  return (
    <>
      {!props.isPending && (
        <TextInput
          style={Components.textbox}
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor={Colors.textboxPlaceholder}
          {...props}
        />
      )}
      {props.isPending && (
        <View style={Components.textbox}>
          <ContentLoader backgroundColor={Colors.primary}>
            <Rect x="0" y="0" rx="0" ry="0" width="30%" height="90%" />
          </ContentLoader>
        </View>
      )}
    </>
  );
};

export default TextBox;

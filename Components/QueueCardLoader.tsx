import {StyleSheet, View} from 'react-native';
import React from 'react';
import Colors from '../Themes/Colors';
import ContentLoader, {Rect} from 'react-content-loader/native';

const QueueCardLoader: React.FC<{}> = () => {
  return (
    <View style={styles.card}>
      <View style={styles.cardBody}>
        <ContentLoader backgroundColor={Colors.contentLoader}>
          <Rect x="5" y="10" rx="0" ry="0" width="18" height="18" />
          <Rect x="30" y="5" rx="0" ry="0" width="50 " height="10" />
          <Rect x="30" y="25" rx="0" ry="0" width="100" height="8" />
        </ContentLoader>
      </View>
    </View>
  );
};

export default QueueCardLoader;

const styles = StyleSheet.create({
  card: {
    borderRadius: 4,
    margin: 10,
    marginBottom: 0,
    padding: 10,
    backgroundColor: '#FFF',
    flexDirection: 'row',
  },
  cardBody: {
    gap: 4,
    flex: 1,
    height: 40,
  },
});

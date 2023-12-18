import {StyleSheet, View} from 'react-native';
import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';

const ContentLoaderCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContentLoader}>
        <ContentLoader backgroundColor="#B8860B">
          <Rect x="5" y="5" rx="0" ry="0" width="200" height="12" />
          <Rect x="5" y="22" rx="0" ry="0" width="100" height="12" />
        </ContentLoader>
      </View>
    </View>
  );
};

export default ContentLoaderCard;

const styles = StyleSheet.create({
  cardContentLoader: {
    flexDirection: 'row',
    height: 40,
  },

  card: {
    borderRadius: 4,
    margin: 10,
    marginBottom: 0,
    padding: 10,
    backgroundColor: '#FFF',
  },
});

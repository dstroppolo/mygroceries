import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';

import {Text} from 'native-base';

import {images} from '../constants/images';
import {categoryMappings} from '../constants/stringsMappings';

export default CategoryTile = ({name, onSelect}) => {
  return (
    <ImageBackground
      source={images.categories[name]}
      style={{width: 160, height: 160}}
      imageStyle={{borderTopLeftRadius: 40, borderBottomRightRadius: 40}}>
      <TouchableOpacity
        style={styles.tile}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => onSelect(name)}
        >
        <Text textBreakStrategy="simple" style={styles.title}>
          {categoryMappings[name]}
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  tile: {
    width: 160,
    height: 160,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  title: {
    fontSize: 30,
    color: '#F6F6F6',
    flexWrap: 'wrap',
    textAlign: 'center',
  },
});

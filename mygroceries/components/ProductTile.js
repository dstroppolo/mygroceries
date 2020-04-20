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

export default ProductTile = ({product, onSelect}) => {
  return (
    <ImageBackground
      source={{uri: product.image}}
      style={{width: 160, height: 160}}
      imageStyle={{borderTopLeftRadius: 40, borderBottomRightRadius: 40}}>
      <TouchableOpacity
        style={
          product.sale_price
            ? {...styles.tile, ...styles.saleBorder}
            : styles.tile
        }
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => onSelect()}>
        <Text textBreakStrategy="simple" style={styles.title}>
          {product.name && product.name.length > 56
            ? product.name.substr(0, 53) + '...'
            : product.name}
        </Text>
        <Text style={styles.price}>$ {product.sale_price ? product.sale_price: product.regular_price}</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  tile: {
    width: 160,
    height: 160,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 40,
    padding: 4,
  },
  title: {
    fontSize: 18,
    color: '#F6F6F6',
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  saleBorder: {
    borderWidth: 4,
    borderColor: '#22B07D',
  },
  price: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    color: '#F6F6F6'
  },
});

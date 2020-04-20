import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text, H1, Icon, H2} from 'native-base';

import {useRoute} from '@react-navigation/native';
import AppHeader from '../components/AppHeader';

export default Product = ({navigation}) => {
  const route = useRoute();
  const {product} = route.params;

  const _calculateSavings = (product) => {
    let sale = Number(product.sale_price);
    let reg = Number(product.regular_price);

    console.log(sale === NaN, sale);
    console.log(reg != 'NaN');

    if (!isNaN(sale) && !isNaN(reg))
      return (
        <Text style={{color: '#22B07D', ...styles.text}}>
          Save ${(reg - sale).toFixed(2)}!
        </Text>
      );

    return '';
  };

  return (
    <>
      <AppHeader
        title={product.name}
        showBack
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <Image
          style={{width: '100%', height: 250}}
          resizeMode="contain"
          source={{uri: product.image}}
        />
        <View style={styles.info}>
          {!!product.brand && <Text style={styles.text}>Brand: {product.brand}</Text>}
          <Text style={styles.text}>
            Regular Price:{' '}
            <Text
              style={{
                ...styles.text,
                textDecorationLine: !!product.sale_price
                  ? 'line-through'
                  : 'none',
              }}>
              ${product.regular_price}
              {product.unit}
            </Text>
          </Text>
          {!!product.sale_price && (
            <Text style={styles.text}>
              Sale Price: ${product.sale_price} {_calculateSavings(product)}
            </Text>
          )}
          {!!product.weight && <Text style={styles.text}>Size: {product.weight}</Text>}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    paddingVertical: 4,
  },
});

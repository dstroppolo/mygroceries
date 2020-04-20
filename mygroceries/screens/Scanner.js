import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
  TextInput,
} from 'react-native';
import {Text, Spinner, Form, Item, Input} from 'native-base';
import {RNCamera} from 'react-native-camera';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import {config} from '../constants/config';
import {
  fetchProduct,
} from '../helpers/fetchers';

export const Scanner = () => {
  const [scannedCode, setScannedCode] = useState('');
  const [fetching, setFetching] = useState(false);
  const [enterManually, setEnterManually] = useState(false);
  const [fetchedProduct, setFetchedProduct] = useState({});
  const [manualCode, setManualCode] = useState('');
  const [error, setError] = useState('');

  const textInputRef = useRef();
  const navigation = useNavigation();

  useEffect(() => {
    if (scannedCode != '') _fetchProduct(scannedCode);
  }, [scannedCode]);

  useEffect(() => {
    _focusOnField();
  }, [enterManually]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setFetchedProduct({});
        setScannedCode('');
        setFetching(false);
        setEnterManually(false);
        setError(false);
      };
    }, []),
  );

  const _showProduct = () => {
    return (
      <View style={styles.productSection}>
        {fetching ? (
          <Spinner />
        ) : (
          <Image
            source={{uri: fetchedProduct.image}}
            style={{width: '100%', height: 250}}
            resizeMode="contain"
          />
        )}
      </View>
    );
  };

  const _showCamera = () => {
    return (
      <RNCamera
        cameraView
        style={styles.preview}
        onBarCodeRead={({data}) => {
          if (scannedCode == '') setScannedCode(data);
        }}
      />
    );
  };

  const _showEnterManually = () => {
    return (
      <Form style={{flex: 1, justifyContent: 'center', padding: 8}}>
        <Item>
          <TextInput
            style={{width: '100%'}}
            keyboardType="numeric"
            ref={textInputRef}
            placeholder="Barcode"
            value={manualCode}
            onChangeText={(text) => {setError(''); setManualCode(text)}}
          />
        </Item>

        {!!error && <Text style={{color:'red'}}>{error}</Text>}

      </Form>
    );
  };

  const _focusOnField = () => {
    if (textInputRef.current) textInputRef.current.focus();
  };

  const _showBeforeScanOption = () => {
    return (
      <>
        <Text style={styles.text}>Scan a barcode</Text>
        <Text style={styles.text}>- OR -</Text>
        <Button title="Enter Manually" onPress={() => setEnterManually(true)} />
      </>
    );
  };

  const _showAfterScanOption = () => {
    return (
      <>
        <Button
          title="See Product Page"
          onPress={() =>
            navigation.navigate('Home', {screen: 'Product', params: {product: fetchedProduct}})
          }
        />
        <Text style={styles.text}>- OR -</Text>
        <Button
          title="Scan Again"
          onPress={() => {
            setScannedCode('');
            setFetchedProduct({});
          }}
        />
      </>
    );
  };

  const _showDuringManualEntryOption = () => {
    return (
      <>
        <Button
          title="Search for Product"
          onPress={() => _fetchProduct(manualCode)}
        />
        <Text style={styles.text}>- OR -</Text>
        <Button
          title="Scan a barcode"
          onPress={() => setEnterManually(false)}
        />
      </>
    );
  };

  const _fetchProduct = async (code) => {
    setFetching(true);
      let res = await fetchProduct(code);
      if (!res.barcode) {
        setError('That item doesnt exist!');
      } else {
        setFetchedProduct(res);
      }
    setFetching(false);
  };

  // <Button title="Clear Scan" onPress={() => setScannedCode('')} />
  return (
    <View style={styles.container}>
      <View style={{height: '50%'}}>
        {fetchedProduct.barcode
          ? _showProduct()
          : enterManually
          ? _showEnterManually()
          : _showCamera()}
      </View>
      <View
        style={{flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
        {!!fetchedProduct.barcode
          ? _showAfterScanOption()
          : enterManually
          ? _showDuringManualEntryOption()
          : _showBeforeScanOption()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    height: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  productSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default Scanner;

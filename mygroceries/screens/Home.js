import React, {useState, useRef, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Button, Text} from 'native-base';

import {config} from '../constants/config';
import {categoryMappings} from '../constants/stringsMappings';
import CategoryTile from '../components/CategoryTile';
import AppHeader from '../components/AppHeader';
import ProductTile from '../components/ProductTile';
import {
  fetchMainCategories,
  fetchSubCategories,
  fetchProducts,
} from '../helpers/fetchers';
import {useLoggedIn} from '../helpers/hooks';

export const Home = ({navigation}) => {
  const [mainCategories, setMaincategories] = useState([]);
  const [selectedMain, setSelectedMain] = useState('');
  const [selectedSub, setSelectedSub] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const LIMIT = 12;

  const scrollRef = useRef();
  const isLoggedIn = useLoggedIn();

  const _fetchMainCategories = async () => {
    let res = await fetchMainCategories();
    setMaincategories(res);
  };

  const _fetchSubCategories = async () => {
    let res = await fetchSubCategories(selectedMain);
    setSubcategories(res);
    if (selectedSub != '') setSelectedSub(res[0].sub_category);
  };

  const _fetchProducts = async () => {
    let res = await fetchProducts(selectedSub, LIMIT, offset);
    setProducts(res);
  };

  const _fetchMoreProducts = async () => {
    let curOffset = offset + LIMIT;
    let res = await fetchProducts(selectedSub, LIMIT, curOffset);
    setProducts([...products, ...res]);
    setOffset(curOffset);
  };

  const _renderCategoryTiles = () => {
    if(mainCategories && mainCategories.length) {
    return mainCategories.map((cat, i) => {
      return (
        <View
          key={`${cat.main_category}-${i}`}
          style={{width: '50%', alignItems: 'center', marginVertical: 8}}>
          <CategoryTile name={cat.main_category} onSelect={setSelectedMain} />
        </View>
      );
    });
  }
  };

  const _renderProductTiles = () => {
    return products.map((prod, i) => {
      return (
        <View
          key={`${prod.barcode}-${i}`}
          style={{width: '50%', alignItems: 'center', marginVertical: 8}}>
          <ProductTile
            product={prod}
            onSelect={() => navigation.navigate('Product', {product: prod})}
          />
        </View>
      );
    });
  };

  const _clearMainCategory = () => {
    setSelectedMain('');
    setSelectedSub('');
    setSubcategories([]);
    setProducts([]);
    setOffset(0);
  };

  const _setSelectedSub = (sub) => {
    setOffset(0);
    setSelectedSub(sub);
  };

  useFocusEffect(
    React.useCallback(() => {
      _fetchMainCategories();
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      if (selectedMain != '') _fetchSubCategories();
    }, [selectedMain]),
  );

  useEffect(() => {
    if (selectedSub != '') {
      _fetchProducts();
    }
  }, [selectedSub]);

  return (
    <>
      <AppHeader
        title={categoryMappings[selectedMain] || 'My Grocery Store'}
        onBackPress={_clearMainCategory}
        subcategories={subcategories}
        selectedSub={selectedSub}
        setSelectedSub={_setSelectedSub}
        showBack={!!selectedSub}
        scrollRef={scrollRef}
      />

      {isLoggedIn ? (
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
          }}>
          {selectedMain ? _renderProductTiles() : _renderCategoryTiles()}

          {!!selectedMain && products.length % LIMIT == 0 && (
            <View style={{width: '100%', alignItems: 'center'}}>
              <Button
                backgroundColor="#2B12AF"
                style={{
                  width: 300,
                  height: 60,
                  margin: 8,
                  justifyContent: 'center',
                }}
                onPress={async () => {
                  _fetchMoreProducts();
                }}>
                <Text style={{color: '#F6F6F6', fontSize: 20}}>Load More</Text>
              </Button>
            </View>
          )}
        </ScrollView>
      ) : (
        <Text>Not signed in</Text>
      )}
    </>
  );
};

export default Home;

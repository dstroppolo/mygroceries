import React, {useState} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {config} from '../constants/config';
import {categoryMappings} from '../constants/stringsMappings';
import CategoryTile from '../components/CategoryTile';
import AppHeader from '../components/AppHeader';

export const Home = () => {
  const [mainCategories, setMaincategories] = useState([]);
  const [selectedMain, setSelectedMain] = useState('');
  const [selectedSub, setSelectedSub] = useState('');
  const [subcategories, setSubcategories] = useState([]);

  const _fetchMainCategories = () => {
    fetch(`${config.api}/categories`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);

        setMaincategories(res);
      });
  };

  const _fetchSubCategories = () => {
    fetch(`${config.api}/categories/${selectedMain}`)
      .then((res) => res.json())
      .then((res) => {
        setSubcategories(res);
        setSelectedSub(res[0].sub_category)
      });
  };

  const _renderCategoryTiles = () => {
    return mainCategories.map((cat) => {
      return (
        <View key={cat.main_category} style={{width: '50%', alignItems: 'center', marginVertical: 8}}>
          <CategoryTile name={cat.main_category} onSelect={setSelectedMain} />
        </View>
      );
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      _fetchMainCategories();
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      if(selectedMain != '')
        _fetchSubCategories();
    }, [selectedMain]),
  );

  return (
    <>
    <AppHeader title={categoryMappings[selectedMain] || "My Grocery Store"} subcategories={subcategories} selectedSub={selectedSub} setSelectedSub={setSelectedSub} />
    
      <ScrollView contentContainerStyle={{flexDirection: 'row',  flexWrap: 'wrap', justifyContent: 'center'}}>

        {_renderCategoryTiles()}
      </ScrollView>
    
    </>
  );
};

export default Home;

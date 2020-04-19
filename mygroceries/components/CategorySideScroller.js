import React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Text, H1} from 'native-base';

import {subcategoryMappings} from '../constants/stringsMappings';

export default CategorySideScroller = ({category, subcategories, selectedSub, setSelectedSub}) => {
  const _renderSubCategories = () => {
    if(subcategories && subcategories.length) {
      return subcategories.map((cat,i) => {
        return (
          <TouchableOpacity key={cat.sub_category} onPress={() => setSelectedSub(cat.sub_category)}>
            <Text style={{...styles.text, color: selectedSub===cat.sub_category ? '#FA8776' : i%2===0 ? '#a195e5' : '#4D4384', fontWeight: selectedSub===cat.sub_category ? 'bold' : 'normal'}}>
              {subcategoryMappings[cat.sub_category]}
            </Text>
          </TouchableOpacity>
        )
      })
    }
  }

  return (
    <View>
    <ScrollView contentContainerStyle={styles.container} horizontal showsHorizontalScrollIndicator={false}>
      {_renderSubCategories()}
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    alignItems: 'flex-end'
  },
  text: {
    marginRight: 24,
    fontSize: 24
  }
});

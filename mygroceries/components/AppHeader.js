import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, H1, H3, H2} from 'native-base';
import CategorySideScroller from './CategorySideScroller';

export default AppHeader = ({title, subcategories, selectedSub, setSelectedSub}) => {
  return (
    <View style={styles.container}>
        <H1>{title}</H1>
        <CategorySideScroller subcategories={subcategories} setSelectedSub={setSelectedSub} selectedSub={selectedSub} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '20%',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
    justifyContent: 'space-between'
  }
})
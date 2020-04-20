import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, H1, Icon, H2} from 'native-base';
import CategorySideScroller from './CategorySideScroller';

export default AppHeader = ({
  title,
  subcategories,
  selectedSub,
  setSelectedSub,
  onBackPress,
  showBack,
  scrollRef
}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        {showBack && (
          <Icon
            type="MaterialCommunityIcons"
            name="menu-left"
            onPress={() => onBackPress()}
          />
        )}
        <H1 style={{flexWrap: 'wrap'}}>{title}</H1>
      </View>
      <CategorySideScroller
        subcategories={subcategories}
        setSelectedSub={setSelectedSub}
        selectedSub={selectedSub}
        scrollRef={scrollRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '20%',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
    justifyContent: 'space-between',
  },
});

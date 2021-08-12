import React, {useEffect, useState} from 'react';
import { StyleSheet, Dimensions, ScrollView, FlatList, Text, View, SafeAreaView } from 'react-native';
import { Block, theme } from 'galio-framework';
import { withNavigation } from '@react-navigation/compat';

import RecipeCard from "./RecipeCard";
const { width } = Dimensions.get('screen');


function RecipeList({recipes, onEndReached, navigation}) {

  return(
    <FlatList
      showsVerticalScrollIndicator={false}
      style={[styles.recipeList]}
      data={recipes}
      renderItem={(item) => <RecipeCard item={item}/>}
      keyExtractor={(item, index) => index.toString()}
      onEndReached={onEndReached}
      onEndReachedThreshold = { 0 }
    />
  )
}

const styles = StyleSheet.create({
  recipeList: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});

export default withNavigation(RecipeList);

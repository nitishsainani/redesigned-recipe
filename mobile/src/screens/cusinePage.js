import React, {useEffect, useState} from 'react';
import { StyleSheet, Dimensions, ScrollView, FlatList, Text, View, SafeAreaView } from 'react-native';
import { Block, theme } from 'galio-framework';

import { Card } from '../components';
import articles from '../constants/articles';
import {CuisineService, RecipeService} from "../services";
import RecipeCard from "../components/recipe/RecipeCard";
import CuisineCard from "../components/recipe/CuisineCard";
const { width } = Dimensions.get('screen');

function CuisinePage(props) {
  const [cuisines, setCuisines] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const size = 10;

  useEffect(() => {
    setPage(1);
    CuisineService
      .getCuisines(1, size)
      .then((response => {
        setCuisines(response.cuisines);
        setTotalPages(response.total);
        setPage(page + 1);
      }))
      .catch(console.log);
  }, []);

  const onEndReached = () => {
    if(refreshing || page > totalPages) {
      return;
    }
    setRefreshing(true);
    CuisineService
      .getCuisines(page, size)
      .then(response => {
        setCuisines(cuisines.concat(response.cuisines));
        setPage(page + 1);
      })
      .catch(console.log)
    setRefreshing(false);
  }

  return (
    <Block flex center style={styles.home}>
      <FlatList
      showsVerticalScrollIndicator={false}
      style={styles.articles}
      data={cuisines}
      renderItem={({item}) => <CuisineCard cuisine={item}/>}
      keyExtractor={(item, index) => index.toString()}
      onEndReached={onEndReached}
      onEndReachedThreshold = { 0 }
      />
    </Block>
  );
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});

export default CuisinePage;

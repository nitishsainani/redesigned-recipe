import React, {useEffect, useState} from 'react';
import { StyleSheet, Dimensions, View, PickerIOS, Picker } from 'react-native';
import {Block, Button, Text, theme,} from 'galio-framework';
import DropDownPicker from 'react-native-dropdown-picker';


import {CuisineService, RecipeService} from "../services";
import {RecipeList} from "../components/recipe";
import Input from "../components/Input";
import Icon from "../components/Icon";
import argonTheme from "../constants/Theme";
import {THEME} from "galio-framework/src/theme/colors";
import CheckBoxModal from "../components/CheckBoxModal";
import ArButton from "../components/Button";
const { width, height } = Dimensions.get('screen');

var handler;

const Search = ({value, onChangeText}) => {
  return (
    <Input
      right
      color="black"
      style={styles.search}
      placeholder="What are you looking for?"
      placeholderTextColor={'#8898AA'}
      iconContent={<Icon size={16} color={theme.COLORS.MUTED} name="search-zoom-in" family="ArgonExtra" />}
      onChangeText={onChangeText}
      value={value}
    />
  );
}

const ButtonChildrenIconText = ({title, name, family}) => {
  return (
    <Block row>
      <Icon {...{name, family, color: 'white'}}/>
      <Text bold color={'white'} style={{marginLeft: 5}}>{title}</Text>
    </Block>
  )
}

function RecipeFinder(props) {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [cuisines, setCuisines] = useState([]);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const size = 10;

  const initializeRecipes = () => {
    setPage(2);
    RecipeService
      .getRecipes(1, size, search, getSelectedCuisinesCommaList())
      .then((response => {
        setRecipes(response.recipes);
        setTotalPages(response.total);
      }))
      .catch(console.log);
  }

  const onEndReached = () => {
    if(refreshing || page > totalPages) {
      return;
    }
    setRefreshing(true);
    RecipeService
      .getRecipes(page, size, search, getSelectedCuisinesCommaList())
      .then(response => {
        setRecipes(recipes.concat(response.recipes));
        setPage(page + 1);
      })
      .catch(console.log)
    setRefreshing(false);
  }

  const initializeCuisines = () => {
    CuisineService
      .getCuisines(1, 100)
      .then(res => {
        setCuisines(res.cuisines)
        setSelectedCuisines(res.cuisines.map(cuisine => false))
      })
      .catch(console.log)
  }

  const onSelectedCuisinesChange = (newVal, changeIndex) => {
    setSelectedCuisines(
      selectedCuisines.map((prevVal, index) => index === changeIndex ? newVal : prevVal)
    )
  }

  const getSelectedCuisinesCommaList = () => {
    let res = [];
    cuisines.map((cuisine, key) => {
      selectedCuisines[key] && res.push(cuisine.id)
    });
    console.log(res.join(","))
    return res.join(",");
  }

  useEffect(() => {
    initializeRecipes();
    initializeCuisines();
  }, []);

  useEffect(() => {
    clearTimeout(handler);
    handler = setTimeout(initializeRecipes, 2000);
    // initializeRecipes()
  }, [selectedCuisines, search])

  useEffect(() => console.log(selectedCuisines), [selectedCuisines])

  return (
    <Block center style={styles.home}>
      <Search value={search} onChangeText={setSearch} />
      <Block row>
        <ArButton onPress={() => setFilterModalVisible(true)} children={<ButtonChildrenIconText title={'Filter Cuisine'} name={'filter'} family={'font-awesome-5'}/>} />
        {/*<ArButton onPress={() => setFilterModalVisible(true)}>Filter</ArButton>*/}
      </Block>
      <CheckBoxModal
        visible={filterModalVisible}
        initialValues={selectedCuisines}
        onChangeSelected={onSelectedCuisinesChange}
        setVisible={setFilterModalVisible}
        options={cuisines}
      />
      <RecipeList recipes={recipes} onEndReached={onEndReached} />
    </Block>
  );
}

const styles = StyleSheet.create({
  home: {
    width: width - theme.SIZES.BASE * 2,
    height: '100%'
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: argonTheme.COLORS.BORDER,
  },
  filter: {
    borderColor: argonTheme.COLORS.BORDER
  },
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center"
  }
});

export default RecipeFinder;

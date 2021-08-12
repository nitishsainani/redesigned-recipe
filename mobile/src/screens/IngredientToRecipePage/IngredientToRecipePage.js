import React, {useEffect, useState} from 'react';
import { StyleSheet, Dimensions, View, PickerIOS, Picker } from 'react-native';
import {Block, Button, Text, theme,} from 'galio-framework';
import DropDownPicker from 'react-native-dropdown-picker';


import {CuisineService, RecipeService} from "../../services";
import {RecipeList} from "../../components/recipe";
import Input from "../../components/Input";
import Icon from "../../components/Icon";
import argonTheme from "../../constants/Theme";
import {THEME} from "galio-framework/src/theme/colors";
import {CuisineFilterModal, IngredientFilterModal} from "./components";
import ArButton from "../../components/Button";
import {Search} from "./components";
const { width, height } = Dimensions.get('screen');

var handler;

const ButtonChildrenIconText = ({title, name, family}) => {
  return (
    <Block row>
      <Icon {...{name, family, color: 'white'}}/>
      <Text bold color={'white'} style={{marginLeft: 5}}>{title}</Text>
    </Block>
  )
}

function IngredientToRecipe(props) {
  const [cuisineFilterModalVisible, setCuisineFilterModalVisible] = useState(false);
  const [ingredientFilterModalVisible, setIngredientFilterModalVisible] = useState(false);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const size = 10;

  const initializeRecipes = () => {
    setPage(2);
    RecipeService
      .getRecipes(1, size, search, selectedCuisines.join(","), selectedIngredients.join(","))
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
      .getRecipes(page, size, search, selectedCuisines.join(","), selectedIngredients.join(","))
      .then(response => {
        setRecipes(recipes.concat(response.recipes));
        setPage(page + 1);
      })
      .catch(console.log)
    setRefreshing(false);
  }

  const onSelectedCuisinesChange = (changeCuisineId, newVal) => {
    if(newVal) {
      setSelectedCuisines(selectedCuisines.concat([changeCuisineId]))
    } else {
      setSelectedCuisines(selectedCuisines.filter(item => item !== changeCuisineId))
    }
  }

  const onSelectedIngredientsChange = (changeIngredientId, newVal) => {
    if(newVal) {
      setSelectedIngredients(selectedIngredients.concat([changeIngredientId]))
    } else {
      setSelectedIngredients(selectedIngredients.filter(item => item !== changeIngredientId))
    }
  }

  useEffect(() => {
    initializeRecipes();

    // On focus clear selected ingredients and recipes
    props.navigation.addListener('focus', () => {
      setSelectedIngredients([]);
      setSelectedCuisines([]);
    })
  }, []);

  useEffect(() => {
    clearTimeout(handler);
    handler = setTimeout(initializeRecipes, 2000);
    // initializeRecipes()
  }, [selectedCuisines, search, selectedIngredients])

  return (
    <Block center style={styles.home}>
      <Search value={search} onChangeText={setSearch} />
      <Block row>
        <ArButton onPress={() => setCuisineFilterModalVisible(true)} children={<ButtonChildrenIconText title={'Filter Cuisine'} name={'filter'} family={'font-awesome-5'}/>} />
        <ArButton onPress={() => setIngredientFilterModalVisible(true)} children={<ButtonChildrenIconText title={'Filter Ingredient'} name={'filter'} family={'font-awesome-5'}/>}/>
      </Block>
      <CuisineFilterModal
        visible={cuisineFilterModalVisible}
        initialValues={selectedCuisines}
        onChangeSelected={onSelectedCuisinesChange}
        setVisible={setCuisineFilterModalVisible}
      />
      <IngredientFilterModal
        visible={ingredientFilterModalVisible}
        initialValues={selectedIngredients}
        onChangeSelected={onSelectedIngredientsChange}
        setVisible={setIngredientFilterModalVisible}
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

  filter: {
    borderColor: argonTheme.COLORS.BORDER
  },
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center"
  }
});

export default IngredientToRecipe;

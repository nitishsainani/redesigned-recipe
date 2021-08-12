import React, {useEffect, useState} from 'react';
import {StyleSheet, Dimensions, ScrollView, View,} from 'react-native';
import {Block, Text, theme,} from 'galio-framework';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {RecipeService} from "../services";
import {RecipeList} from "../components/recipe";
import ShoppingListService from "../services/shoppingListService";
import {THEME} from "galio-framework/src/theme/colors";
import {Button} from "../components";
import argonTheme from "../constants/Theme";
const { width } = Dimensions.get('screen');

const HorizontalLine = ({style}) => <View style={[{flex: 1, height: 1, backgroundColor: 'gray',}, style]}/>

const capitaliseCase = (str) => {
  if (!str) {
    return "";
  }
  str = str.toString();
  const words = str.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  return words.join(" ");
}


function ShoppingListItem(props) {

}

const ShoppingListView = ({ingredients}) => {
  const perWidth = (width - theme.SIZES.BASE * 2) / 3;
  const [items, setItems] = useState(ingredients);

  useEffect(() => {
    setItems(ingredients);
  }, [ingredients])

  const removeIngredientFromShoppingList = (index, ingredient) => {
    setItems(items.filter(item => item !== ingredient))
    ShoppingListService.removeItem(ingredient).then();
  }

  const clearShoppingList = () => {
    setItems([]);
    ShoppingListService.clearShoppingList().then();
  }

  return (
    <ScrollView style={{marginTop: 10}} showsVerticalScrollIndicator={false}>
      <Block flex row space={'between'} middle>
        <Block width={perWidth} left>
          <Text bold size={20}>{'Ingredient'}</Text>
        </Block>
        <Button
          style={{width: perWidth - 40, backgroundColor: argonTheme.COLORS.ERROR}}
          onPress={clearShoppingList}
        >
          {"Delete All"}
        </Button>
      </Block>
      <HorizontalLine style={{marginTop: 10}}/>
      {items && items.map((ingredient, key) => {
        return (<View key={key}>
          <Block flex row space={'between'} middle>
            <Block width={perWidth} left>
              <Text size={20}>{capitaliseCase(ingredient)}</Text>
            </Block>
            <Button
              onPress={() => removeIngredientFromShoppingList(key, ingredient)}
              style={{width: perWidth - 40}}
            >
              {"Remove"}
            </Button>
          </Block>
          <HorizontalLine/>
        </View>);
      })}
    </ScrollView>
  );
}


function ShoppingList(props) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      ShoppingListService.getShoppingList().then(setItems).catch(console.log);
    });
  }, []);

  useEffect(() => console.log(items), [items]);

  return (<>
    <Block flex center style={styles.home}>
      <Block style={styles.articles}>
        <ShoppingListView ingredients={items}/>
      </Block>
    </Block>
  </>);
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

export default ShoppingList;

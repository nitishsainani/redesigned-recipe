import React, {useEffect, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {Block, Text, theme} from 'galio-framework';
import {SceneMap, ScrollPager, TabBar, TabView} from 'react-native-tab-view';
import {Button} from '../components';
import Carousel from "react-native-snap-carousel";
import InstructionCard from "../components/recipe/InstructionCard";
import {RecipeService} from "../services";
import Icon from "../components/Icon";
import {THEME} from "galio-framework/src/theme/colors";
import argonTheme from "../constants/Theme";
import ShoppingListService from "../services/shoppingListService";

const {width, height} = Dimensions.get('screen');

String.prototype.trimLeft = function (charlist) {
  if (charlist === undefined)
    charlist = "\s";

  return this.replace(new RegExp("^[" + charlist + "]+"), "");
};

String.prototype.trimRight = function (charlist) {
  if (charlist === undefined)
    charlist = "\s";

  return this.replace(new RegExp("[" + charlist + "]+$"), "");
};

String.prototype.trim = function (charlist) {
  return this.trimLeft(charlist).trimRight(charlist);
};

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

const HorizontalLine = ({style}) => <View style={[{flex: 1, height: 1, backgroundColor: 'gray',}, style]}/>

const RecipeDetail = ({recipe}) => {
  const details = [
    {
      icon: {name: 'silverware-fork-knife', family: 'material-community'},
      text: recipe.cuisine.title3,
    },
    {
      icon: {name: 'stopwatch', family: 'entypo'},
      text: recipe.preparationTime || 'According To Preparation'
    }
  ]

  const Detail = ({icon, text}) => {
    return (
      <Block flex center>
        <Icon {...{...icon, ...{color: THEME.DARK_SECONDARY}}} style={{marginRight: 5}}/>
        <Text color={THEME.DARK_SECONDARY}>{text}</Text>
      </Block>
    );
  }

  return (<Block>
    <Text h5 bold style={{marginBottom: 10, color: THEME.DARK_SECONDARY}}>{recipe.title}</Text>
    <HorizontalLine style={{marginBottom: 10, marginTop: 10}}/>
    <Block center flex row style={{marginBottom: 10}}>
      {details.map((detail, key) => {
        return <Detail key={key} {...detail}/>
      })}
    </Block>
    <HorizontalLine style={{marginTop: 10}}/>
  </Block>);
}

const RecipeIngredients = ({recipe}) => {
  const perWidth = (width - theme.SIZES.BASE * 2) / 3;
  const [presence, setPresence] = useState([])

  useEffect(() => {
    ShoppingListService.areItemsInShoppingList(
      (recipe.ingredients || []).map(ingredient => ingredient.ingredient.title)
    ).then(setPresence)
  }, [recipe]);

  const addIngredientToShoppingList = (index, ingredient) => {
    setPresence(presence.map((v, i) => i === index ? true : v));
    ShoppingListService.addItem(ingredient.ingredient.title).then()
  }

  const removeIngredientFromShoppingList = (index, ingredient) => {
    setPresence(presence.map((v, i) => i === index ? false : v));
    ShoppingListService.removeItem(ingredient.ingredient.title).then()
  }

  const addMultipleIngredientToShoppingList = (ingredientList) => {
    setPresence(presence.map(item => true));
    ShoppingListService.addMultipleItem(ingredientList.map(ingredient => ingredient.ingredient.title)).then();
  }

  return (
    <ScrollView style={{marginTop: 10}} showsVerticalScrollIndicator={false}>
      <Block flex row space={'between'} middle>
        <Block width={perWidth} left>
          <Text bold size={20}>{'Ingredient'}</Text>
        </Block>
        <Block width={perWidth} middle>
          <Text bold center size={20}>{'Quantity'}</Text>
        </Block>
        <Button style={{width: perWidth - 40, backgroundColor: argonTheme.COLORS.SUCCESS}} onPress={() => addMultipleIngredientToShoppingList(recipe.ingredients)}>Add All To Shopping</Button>
      </Block>
      <HorizontalLine style={{marginTop: 10}}/>
      {recipe.ingredients && recipe.ingredients.map((ingredient, key) => {
        return (<View key={key}>
          <Block flex row space={'between'} middle>
            <Block width={perWidth} left>
              <Text size={20}>{capitaliseCase(ingredient.ingredient.title)}</Text>
            </Block>
            <Block width={perWidth} middle>
              <Text center size={20}>
                {
                  (ingredient.quantity ? ingredient.quantity.toString() : '*Acc To Taste*')
                  + " " +
                  (capitaliseCase(ingredient.ingredient.unit) || 'Pieces')
                }
              </Text>
            </Block>
            <Button
              onPress={() => {
                !presence[key] ?
                  addIngredientToShoppingList(key, ingredient) :
                  removeIngredientFromShoppingList(key, ingredient)
              }}
              style={{width: perWidth - 40}}
            >
              {presence[key] ? "Remove" : "Add"}
            </Button>
          </Block>
          <HorizontalLine/>
        </View>);
      })}
    </ScrollView>
  );
}

const RecipeNutrients = ({recipe}) => {
  const perWidth = (width - theme.SIZES.BASE * 2) / 2;
  return (
    <ScrollView style={{marginTop: 10}} showsVerticalScrollIndicator={false}>
      <Block flex row space={'between'} middle style={{marginVertical: 10}}>
        <Block width={perWidth} left>
          <Text bold size={20}>{'Nutrient'}</Text>
        </Block>
        <Block width={perWidth} right>
          <Text bold center size={20}>{'Quantity'}</Text>
        </Block>
      </Block>
      <HorizontalLine style={{marginVertical: 10}}/>
      {recipe.nutrients && recipe.nutrients.map((nutrient, key) => {
        return (<View key={key}>
          <Block flex row space={'between'} middle>
            <Block width={perWidth} left>
              <Text size={20}>{capitaliseCase(nutrient.nutrient.title)}</Text>
            </Block>
            <Block width={perWidth} right>
              <Text size={20}>
                {nutrient.quantity.toString()}
              </Text>
            </Block>
          </Block>
          <HorizontalLine style={{marginVertical: 10}}/>
        </View>);
      })}
    </ScrollView>
  );
}

const RecipeSteps = ({recipe}) => {
  const instructionsList = recipe.instructions.replaceAll('\t', ' ').trim().trim('-').trim().trim('| ').split('|');

  return (<Carousel
    layout={'stack'}
    // layoutCardOffset={`18`}
    data={instructionsList}
    sliderWidth={width - theme.SIZES.BASE * 2}
    itemWidth={width - theme.SIZES.BASE * 2 - 40}
    renderItem={(item, key) => <InstructionCard key={key} item={item}/>}
  />);
}

export default function RecipePage(props) {
  const {navigation} = props;
  const [recipe, setRecipe] = useState(props.route.params && props.route.params.recipe);

  if (!recipe) {
    return <Text center h5>
      {'Oops Cannot Find the recipe'}
    </Text>
  }

  useEffect(() => {
    RecipeService
      .getRecipeDetail(recipe.id)
      .then(setRecipe)
      .catch(console.log)
  }, []);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'ingredients', title: 'Ingredients'},
    {key: 'steps', title: 'Steps'},
    {key: 'nutrients', title: 'Nutrients'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'ingredients':
        return <RecipeIngredients recipe={recipe}/>
      case 'steps':
        return <RecipeSteps recipe={recipe} />
      case 'nutrients':
        return <RecipeNutrients recipe={recipe} />
      default:
        return null;
    }
  }

  let renderArticles = () => {
    return (
      <Block flex style={styles.articles}>
        <RecipeDetail recipe={recipe}/>

        <TabView
          renderTabBar={(props) => <TabBar style={{backgroundColor: argonTheme.COLORS.PRIMARY}} {...props}/>}
          tabBarPosition={"top"}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width, height: height - 400}}
          style={{height: height * 0.7}}
          renderPager={props => <ScrollPager {...props}/>}
        />



        {/*<Card item={articles[0]} horizontal/>*/}
        {/*<Block flex row>*/}
        {/*  <Card item={articles[1]} style={{marginRight: theme.SIZES.BASE}}/>*/}
        {/*  <Card item={articles[2]}/>*/}
        {/*</Block>*/}
        {/*<Card item={articles[3]} horizontal/>*/}
        {/*<Card item={articles[4]} full/>*/}
      </Block>
    );
  }

  return (
    <ScrollView style={{}}>
      <Block flex center style={styles.home}>
        {renderArticles()}
      </Block>
    </ScrollView>
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
  scene: {
    flex: 1,
  },
});

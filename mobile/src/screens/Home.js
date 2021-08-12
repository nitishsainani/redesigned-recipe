import React, {useEffect, useState} from 'react';
import { StyleSheet, Dimensions, } from 'react-native';
import { Block, theme, } from 'galio-framework';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {RecipeService} from "../services";
import {RecipeList} from "../components/recipe";
const { width } = Dimensions.get('screen');


const _signIn = async () => {
  try {
    // Toast.show({
    //   type: 'error',
    //   position: 'bottom',
    //   text1: 'Hello',
    //   text2: 'This is some something 👋',
    //   visibilityTime: 4000,
    //   autoHide: true,
    //   topOffset: 30,
    //   bottomOffset: 40,
    //   onShow: () => {},
    //   onHide: () => {},
    //   onPress: () => {}
    // });
    // return;
    // await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    if(!await GoogleSignin.isSignedIn()) {
      const userInfo = await GoogleSignin.signIn();
      console.log(await GoogleSignin.getTokens());
    } else {
      console.log(await GoogleSignin.getTokens())
    }
    // console.log(userInfo);
  } catch (error) {
    console.log(error);
    return;
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
};

function Home(props) {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const size = 10;

  useEffect(() => {
    AsyncStorage.getItem('asdf').then(console.log);

    setPage(1);
    RecipeService
      .getRecipes(1, size)
      .then((response => {
        setRecipes(response.recipes);
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
    RecipeService
      .getRecipes(page, size)
      .then(response => {
        setRecipes(recipes.concat(response.recipes));
        setPage(page + 1);
      })
      .catch(console.log)
    setRefreshing(false);
  }

  return (<>
    <Block flex center style={styles.home}>
      <Block style={styles.articles}>
        <RecipeList recipes={recipes} onEndReached={onEndReached} />
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
    paddingBottom: theme.SIZES.BASE,
  },
});

export default Home;

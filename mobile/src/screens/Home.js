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

    // GoogleSignin.configure({
    //   scopes: ['profile', 'email',], // what API you want to access on behalf of the user, default is email and profile
    //   webClientId: '185816397363-gkbjq2leic2q8sr9i9gd9279001nc79t.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    //   offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    //   // hostedDomain: '', // specifies a hosted domain restriction
    //   // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
    //   // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    //   // accountName: '', // [Android] specifies an account name on the device that should be used
    //   iosClientId: '185816397363-kg3s84pnt1td68qp923pgup4jfqdbfa4.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    //   // googleServicePlistPath: '', // [iOS] optional, if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
    // });

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
        {/*<GoogleSigninButton*/}
        {/*  style={{ width: 192, height: 48 }}*/}
        {/*  size={GoogleSigninButton.Size.Wide}*/}
        {/*  color={GoogleSigninButton.Color.Dark}*/}
        {/*  onPress={_signIn}*/}
        {/*  disabled={false} />*/}
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

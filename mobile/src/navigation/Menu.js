import React from "react";
import { useSafeArea } from "react-native-safe-area-context";
import {
  ScrollView,
  StyleSheet,
  Image
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import Images from "../constants/Images";
import argonTheme from "../constants/Theme";
import { DrawerItem as DrawerCustomItem } from '../components';

function CustomDrawerContent({ drawerPosition, navigation, profile, focused, state, ...rest }) {
  const insets = useSafeArea();
  const screens = [
    {
      title: "Home",
      icon: {
        name: "chef-hat",
        family: "material-community",
        size: 20,
        color: argonTheme.COLORS.PRIMARY,
      }
    },
    {
      title: "Cuisines",
      icon: {
        name: "utensils",
        family: "font-awesome-5",
        size: 20,
        color: argonTheme.COLORS.PRIMARY,
      }
    },
    // {
    //   title: "Courses",
    //   icon: {
    //     name: "swatchbook",
    //     family: "font-awesome-5",
    //     size: 20,
    //     color: argonTheme.COLORS.PRIMARY,
    //   }
    // },
    {
      title: "Recipe Finder",
      icon: {
        name: "searchengin",
        family: "font-awesome-5",
        size: 20,
        color: argonTheme.COLORS.PRIMARY,
      }
    },
    // {
    //   title: "Diet Plans",
    //   icon: {
    //     name: "lightbulb",
    //     family: "font-awesome-5",
    //     size: 20,
    //     color: argonTheme.COLORS.PRIMARY,
    //   }
    // },
    {
      title: "Ingredients To Recipe",
      icon: {
        name: "spaceship",
        family: "ArgonExtra",
        size: 20,
        color: argonTheme.COLORS.PRIMARY,
      }
    },
    // {
    //   title: "Surprise Me",
    //   icon: {
    //     name: "gift",
    //     family: "antdesign",
    //     size: 20,
    //     color: argonTheme.COLORS.PRIMARY,
    //   }
    // },
    {
      title: "Shopping List",
      icon: {
        name: "clipboard-list",
        family: "font-awesome-5",
        size: 20,
        color: argonTheme.COLORS.PRIMARY,
      }
    },
    // {
    //   title: "Elements",
    //   icon: {
    //     name: "shop",
    //     family: "ArgonExtra",
    //     size: 20,
    //     color: argonTheme.COLORS.PRIMARY,
    //   }
    // },
    // {
    //   title: "Articles",
    //   icon: {
    //     name: "map-big",
    //     family: "ArgonExtra",
    //     size: 20,
    //     color: argonTheme.COLORS.ERROR,
    //   }
    // },
    // {
    //   title: "Profile",
    //   icon: {
    //     name: "person",
    //     family: "fontisto",
    //     size: 20,
    //     color: argonTheme.COLORS.PRIMARY,
    //   }
    // },
  ]
  return (
    <Block
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <Block flex={0.06} style={styles.header}>
        <Image styles={styles.logo} source={Images.Logo} />
      </Block>
      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
              return (
                <DrawerCustomItem
                  title={item.title}
                  icon={item.icon}
                  key={index}
                  navigation={navigation}
                  focused={state.index === index}
                />
              );
            })}
            {/*<Block flex style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}>*/}
            {/*  <Block style={{ borderColor: "rgba(0,0,0,0.2)", width: '100%', borderWidth: StyleSheet.hairlineWidth }}/>*/}
            {/*  <Text color="#8898AA" style={{ marginTop: 16, marginLeft: 8 }}>DOCUMENTATION</Text>*/}
            {/*</Block>*/}
            {/*<DrawerCustomItem title="Getting Started" navigation={navigation} />*/}
        </ScrollView>
      </Block>
    </Block>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: 'center'
  }
});

export default CustomDrawerContent;

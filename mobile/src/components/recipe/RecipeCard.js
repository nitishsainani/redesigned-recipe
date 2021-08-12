import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { argonTheme } from '../../constants';

const colors = ['#b71c1c', '#880E4F', '#4A148C', '#1A237E', '#004D40', '#263238']
const getColor = (index) => colors[index % colors.length]

RecipeCard.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 2,
    marginHorizontal: 5,
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
    // justifyContent: 'center', //Centered vertically
    // alignItems: 'center', // Centered horizontally
    // flex:1
  },
  imageContainer: {
    borderRadius: 4,
    elevation: 10,
    overflow: 'hidden',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullImage: {
    height: 215
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    elevation: 1,
  },
});


function RecipeCard(props) {
  const { navigation, item, horizontal, full, style, ctaColor, imageStyle, title, } = props;
  const {index} = item;
  const recipe = item.item;

  const imageStyles = [
    full ? styles.fullImage : styles.horizontalImage,
    imageStyle
  ];

  const cardContainer = [styles.card, styles.shadow, style];
  const imgContainer = [styles.imageContainer,
    horizontal ? styles.horizontalStyles : styles.verticalStyles,
    styles.shadow
  ];

  return (
    <Block row={horizontal} card flex style={cardContainer}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('RecipePage', {recipe})}>
        <Block flex style={imgContainer}>
          <Image source={{uri: 'https://picsum.photos/300/300'}} style={imageStyles} />
        </Block>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('RecipePage', {recipe})}>
        <Block flex center middle space="between" style={styles.cardDescription}>
          <Text h6 style={{fontWeight: '500'}} center>{recipe.title}</Text>
          <Text size={12} muted={!ctaColor} color={ctaColor || argonTheme.COLORS.ACTIVE} bold>{recipe.preparationTime}</Text>
        </Block>
      </TouchableWithoutFeedback>
    </Block>
  );
}

export default withNavigation(RecipeCard);

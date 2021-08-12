import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { argonTheme } from '../../constants';
import Icon from "../Icon";


class InstructionCard extends React.Component {
  render() {
    const { navigation, item, horizontal, style, ctaColor, imageStyle } = this.props;
    const full = true;
    const instruction = item.item;

    const imageStyles = [
      full ? styles.fullImage : styles.horizontalImage,
      imageStyle
    ];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow
    ];

    const colors = ['#b71c1c', '#880E4F', '#4A148C', '#1A237E', '#004D40', '#263238']
    const backgroundColor = colors[item.index % colors.length]

    return (
      <Block row={horizontal} card flex style={cardContainer.concat({backgroundColor, })}>
        {/*<TouchableWithoutFeedback onPress={() => navigation.navigate('Pro')}>*/}
        {/*  <Block flex style={imgContainer}>*/}
        {/*    <Image source={{uri: 'https://picsum.photos/300/300'}} style={imageStyles} />*/}
        {/*  </Block>*/}
        {/*</TouchableWithoutFeedback>*/}
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Pro')}>
          <Block center flex row>
            <Icon name={'chef-hat'} family={'material-community'} size={40} color={'white'}/>
            <Text h3 color={'white'}>{'Step '}</Text>
            <Text h3 color={'white'}>{item.index + 1}</Text>
            <Icon name={'chef-hat'} family={'material-community'} size={40} color={'white'}/>
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Pro')}>
          <Block flex space="between" style={styles.cardDescription}>
            <Text h6 style={styles.cardTitle} color={'white'}>{instruction}</Text>
            {/*<Text size={12} muted={!ctaColor} color={ctaColor || argonTheme.COLORS.ACTIVE} bold>{item.cta}</Text>*/}
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

InstructionCard.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
}

const styles = StyleSheet.create({
  card: {
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 400,
    padding: 30
  },
  cardTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingVertical: 40,
    textAlign: 'center',
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
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
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});

export default withNavigation(InstructionCard);

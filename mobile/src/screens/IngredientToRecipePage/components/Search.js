import React, {useEffect, useState} from 'react';
import Input from "../../../components/Input";
import Icon from "../../../components/Icon";
import {theme} from "galio-framework";
import argonTheme from "../../../constants/Theme";
import {Dimensions, StyleSheet} from "react-native";
const { width, height } = Dimensions.get('screen');

export default function Search({value, onChangeText}) {
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

const styles = StyleSheet.create({
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: argonTheme.COLORS.BORDER,
  },
});

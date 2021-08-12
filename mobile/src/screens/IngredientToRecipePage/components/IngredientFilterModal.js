import React, { useState, useEffect, useMemo } from "react";
import {Alert, Modal, StyleSheet, Pressable, View, Picker, Dimensions, FlatList} from "react-native";
import {Checkbox} from "galio-framework";
import {ScrollPager, TabBar, TabView} from "react-native-tab-view";
import argonTheme from "../../../constants/Theme";
import {Block, Text, theme} from 'galio-framework';
import ArButton from "../../../components/Button";
import {THEME} from "galio-framework/src/theme/colors";
import {IngredientService} from "../../../services";
import RecipeCard from "../../../components/recipe/RecipeCard";
import Search from "./Search";
const { width, height } = Dimensions.get('screen');

var handler;

const CheckBoxIngredient = ({item, initialValues, onChange}) => {
  return <Checkbox
    color="error"
    initialValue={(() => initialValues.includes(item.item.id))()}
    label={item.item.title}
    iconFamily="material-community"
    iconName="silverware-fork-knife"
    onChange={(val) => onChange(item.item.id, val)}
    style={{margin: 5}}
    labelStyle={{fontSize: 25}}
  />
}

const IngredientFilterModal = ({initialValues, onChangeSelected, visible, setVisible}) => {
  const [modalVisible, setModalVisible] = useState(visible);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [ingredients, setIngredients] = useState([]);
  const [search, setSearch] = useState('');
  const size = 40;

  const initializeIngredients = () => {
    IngredientService
      .getIngredients(1, size, search)
      .then(res => {
        setIngredients(res.ingredients)
        setTotalPages(res.total);
        setPage(2);
      })
      .catch(console.log)
  }

  const onEndReached = () => {
    if(refreshing || page > totalPages) {
      return;
    }
    setRefreshing(true);
    IngredientService
      .getIngredients(page, size, search)
      .then(response => {
        setIngredients(ingredients.concat(response.ingredients));
        setPage(page + 1);
      })
      .catch(console.log)
    setRefreshing(false);
  }

  useEffect(initializeIngredients, []);
  useEffect(() => {
    clearTimeout(handler);
    handler = setTimeout(initializeIngredients, 1000);
  }, [search]);

  return (<>
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        console.log("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={[styles.modalView, {height: height - 120, width: width - 40}]}>
        <ArButton onPress={() => setVisible(false)}>Close</ArButton>
        <Search value={search} onChangeText={setSearch} />
        {useMemo(() => <FlatList
          showsVerticalScrollIndicator={false}
          style={[styles.recipeList]}
          data={ingredients}
          renderItem={(item) => <CheckBoxIngredient item={item} onChange={onChangeSelected} initialValues={initialValues}/>}
          keyExtractor={(item, index) => index.toString() + item.id.toString()}
          onEndReached={onEndReached}
          onEndReachedThreshold = { 0 }
        />, [initialValues, ingredients])}
        </View>
    </Modal>
  </>);
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    marginTop: 100,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default IngredientFilterModal;

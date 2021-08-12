import React, { useState, useEffect } from "react";
import {Alert, Modal, StyleSheet, Pressable, View, Picker, Dimensions, FlatList} from "react-native";
import {Checkbox} from "galio-framework";
import {ScrollPager, TabBar, TabView} from "react-native-tab-view";
import argonTheme from "../../../constants/Theme";
import {Block, Text, theme} from 'galio-framework';
import ArButton from "../../../components/Button";
import {THEME} from "galio-framework/src/theme/colors";
import {CuisineService, RecipeService} from "../../../services";
import RecipeCard from "../../../components/recipe/RecipeCard";
const { width, height } = Dimensions.get('screen');

const CuisineFilterModal = ({initialValues, onChangeSelected, visible, setVisible}) => {
  const [modalVisible, setModalVisible] = useState(visible);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(2);
  const [totalPages, setTotalPages] = useState(0);
  const [cuisines, setCuisines] = useState([]);
  const [search, setSearch] = useState('');
  const size = 40;

  const initializeCuisines = () => {
    CuisineService
      .getCuisines(1, size)
      .then(res => {
        setCuisines(res.cuisines)
        setTotalPages(res.total);
      })
      .catch(console.log)
  }

  const onEndReached = () => {
    if(refreshing || page > totalPages) {
      return;
    }
    setRefreshing(true);
    CuisineService
      .getCuisines(page, size, search)
      .then(response => {
        setCuisines(cuisines.concat(response.cuisines));
        setPage(page + 1);
      })
      .catch(console.log)
    setRefreshing(false);
  }

  useEffect(initializeCuisines, []);

  const CheckBoxCuisine = ({item}) => {
    return <Checkbox
      color="error"
      initialValue={initialValues.includes(item.item.id)}
      label={item.item.title3}
      iconFamily="material-community"
      iconName="silverware-fork-knife"
      onChange={(val) => onChangeSelected(item.item.id, val)}
      style={{margin: 5}}
      labelStyle={{fontSize: 25}}
    />
  }

  return (<>
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        console.log("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={[styles.modalView, {height: height - 120, width: width - 40}]}>
        <ArButton onPress={() => setVisible(false)}>Done</ArButton>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={[styles.recipeList]}
          data={cuisines}
          renderItem={(item) => <CheckBoxCuisine item={item}/>}
          keyExtractor={(item, index) => item.id}
          onEndReached={onEndReached}
          onEndReachedThreshold = { 0 }
        />
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

export default CuisineFilterModal;

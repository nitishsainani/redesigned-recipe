import React, { useState, useEffect } from "react";
import {Alert, Modal, StyleSheet, Pressable, View, Picker, Dimensions} from "react-native";
import {Checkbox} from "galio-framework";
import {ScrollPager, TabBar, TabView} from "react-native-tab-view";
import argonTheme from "../constants/Theme";
import {Block, Text, theme} from 'galio-framework';
import ArButton from "./Button";
import {THEME} from "galio-framework/src/theme/colors";
const { width, height } = Dimensions.get('screen');

const CheckBoxModal = ({options, initialValues, onChangeSelected, visible, setVisible}) => {
  const [modalVisible, setModalVisible] = useState(visible);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'ingredients', title: 'Ingredients'},
    {key: 'steps', title: 'Steps'},
    {key: 'nutrients', title: 'Nutrients'},
  ]);

  useEffect(() => console.log(modalVisible), [modalVisible])

  return (
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
          {options && options.map((option, key) => {
            return <Checkbox
              key={key}
              color="error"
              initialValue={initialValues ? initialValues[key] : false}
              label={option.title3}
              iconFamily="material-community"
              iconName="silverware-fork-knife"
              onChange={(val) => onChangeSelected(val, key)}
              style={{margin: 5}}
              labelStyle={{fontSize: 25}}
            />
          })}
        </View>
    </Modal>
  );
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

export default CheckBoxModal;

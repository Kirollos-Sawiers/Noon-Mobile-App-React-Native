import React from "react";
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  //////////////////////////////////////////////////////////
  centeredView: {

    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  modalView: {
    width: '100%',
    height: '100%',
    margin: 20,
    backgroundColor: "white",
    padding: 35,

  },
  button: {
    borderRadius: 3,
    padding: 15,
    marginTop: 60,
    marginBottom: 20,
    marginHorizontal: 10,
    elevation: 2,
    backgroundColor: "#d0d3d8",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  headerText: {
    margin: 15,
    fontSize: 25,
    fontWeight: "bold",
  },
  boldText: {
    marginLeft: 15,
    fontSize: 15,
    fontWeight: "bold",
  },
  noonLogo: {
    margin: 15,
  },
});
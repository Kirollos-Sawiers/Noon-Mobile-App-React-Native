import React from "react";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

  },

  box: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  maincardcontainer: {
    width: 400,
    height: "auto",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e8e8e8",
    margin: 20,
  },
  cardcontainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  cardcontent: {
    display: "flex",
    alignitems: "center",
    justifyContent: "center",
  },
  cardcover: {
    width: 180,
    height: 210,
    marginVertical: 10,
  },
  pricecontainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 10,
  },
  ratecontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
});

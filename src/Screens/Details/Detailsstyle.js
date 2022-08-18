import React from "react";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "auto",
    backgroundColor: "white",
  },
  headContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
  },
  cardcontent: {
    display: "flex",
    alignitems: "center",
    justifyContent: "center",
  },
  cardcover: {
    width: "100%",
    height: 130,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  ratecontainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  rateBox: {
    width: 40,
    height: 20,
    marginHorizontal: 10,
    backgroundColor: "#38ae04",
    borderRadius: 3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  mainlistcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sublistcontainer: {
    margin: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  listicon: {
    marginRight: 15,
  },
  colorCardSection: {
    width: 100,
    height: 120,
    marginLeft: 10,
    marginBottom: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "lightgrey",
  },
  sellerIconContainer: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 25,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e6ecf7",
  },
});

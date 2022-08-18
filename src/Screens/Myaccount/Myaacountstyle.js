import React from "react";
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    body: {
        backgroundColor: "white",
    },
    signcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    mainlistcontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sublistcontainer: {
        margin: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    footercontainer: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: "#e6ecf7",
        height: 305,
    },
    socialcontainer: {
        marginVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    text: {
        fontSize: 18,
        marginTop: 15,
        marginLeft: 15,
        fontWeight: 'bold',
    },
    subText: {
        marginLeft: 15,
        marginBottom: 30,
        color: 'grey',
    },
    footerText: {
        fontSize: 10,
        color: 'grey',
        marginVertical: 10,
    },
    noonLogo: {
        margin: 15,
    },
    header: {
        padding: 15,
        fontWeight: 'bold',
        color: 'grey',
        backgroundColor: "#e6ecf7",
    },
    listicon: {
        marginRight: 15,
    },
    //////////////////////////////////////////////////////////
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
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
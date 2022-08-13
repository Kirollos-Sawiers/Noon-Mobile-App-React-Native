import React from "react";
import { StyleSheet } from "react-native";


export default StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchBar: {
        fontSize: 10,
        border: "1px solid lightgrey",
        width: "75%",
        height: "75%",
        boxShadow: "none"
    },
    noonLogo: {
        marginLeft:10,
        marginRight:10
    },
    sahelBanner: {
        // marginTop: "0.3rem",
        width: 500,
        height: 50,
    },
    avatarLogo:{
        // width:"100%",
        // height:"100%"
    }
})
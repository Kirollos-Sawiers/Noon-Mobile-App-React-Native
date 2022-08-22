import React from "react";
import { StyleSheet } from "react-native";


export default StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
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
    },
    maincardcontainer: {
        width: 200,
        height: "auto",
        backgroundColor: 'white',
        borderWidth:1,
        borderColor:'#e8e8e8',
        margin:5,
    
    },
    cardcontainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    cardcontent: {
        display: 'flex',
        alignitems: 'center',
        justifyContent: 'center',
    },
    cardcover: {
        width: 180,
        height: 210,
        marginVertical: 10,
    },
    pricecontainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 10,
    },
    ratecontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
    
    },
})
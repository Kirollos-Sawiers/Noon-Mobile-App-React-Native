import React from "react";
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    body: {
        backgroundColor: "white",
        width: "100%",
        height: "100%",
    },
    searchBar: {
        marginBottom: 10,
        marginHorizontal: 15,
        fontSize: 10,
        border: "1px solid lightgrey",
        boxShadow: "none",
        backgroundColor: "#e6ecf7",
        height: 35,
    },
    gif: {
        marginBottom: 10,
        resizeMode: "cover",
        width: "100%",
        height: 150.75
    },
    sahelBanner: {
        resizeMode: "cover",
        width: "100%",
        height: 50,
    },

    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    sectionHeader: {
        fontWeight: '800',
        fontSize: 18,
        color: '#f4f4f4',
        marginTop: 20,
        marginBottom: 5,
    },
    // item: {
    //     maxWidth: 300,
    //     flexWrap: "wrap",
    //     // backgroundColor:"#ffeedd"
    // },
    itemPhoto: {
        width: 72,
        height: 107.34,
    },
    itemText: {
        color: 'rgba(255, 255, 255, 0.5)',
        marginTop: 5,
    },
    // listheaderphoto: {
    //     width: '100%',
    //     height: 41,
    //     marginVertical: 10,
    // },
//////////////////////////////////////////////////
maincardcontainer: {
    width: 200,
    height: 'auto',
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


///////////////////////////////////////////////
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
    }
});
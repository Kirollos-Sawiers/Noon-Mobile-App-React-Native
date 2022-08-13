import React from "react";
import { Text, View, Image, ScrollView, StyleSheet } from "react-native";
import Expressicon from "../../../assets/svg/fulfilment_express_v2-en.svg";
import Ratestaricon from "../../../assets/svg/ratestar.svg";


function Category() {

    return (
        <View style={style.maincardcontainer}>
            <View style={style.cardcontainer}>
                <Image
                    source={{ uri: 'https://f.nooncdn.com/products/tr:n-t_200/v1653304132/N51219502A_1.jpg' }}
                    style={style.cardcover}
                />
                <Text style={{ fontWeight: '300' }}>Apple Watch Series 7 GPS 45mm Aluminium Case Wi...</Text>
            </View>
            <View style={style.pricecontainer}>
                <Text>EGP </Text>
                <Text style={{ fontWeight: 'bold' }}>9149.00</Text>
            </View>
            <View style={style.pricecontainer}>
                <Text style={{ textDecorationLine: 'line-through', color: 'grey' }}>EGP 12550</Text>
                <Text style={{ fontWeight: 'bold', color: '#38AE04' }}>   27% OFF</Text>
            </View>
            <View style={style.ratecontainer}>
                <Expressicon
                    width="60" height="16"
                />
                <View style={{ flexDirection: "row", alignItems: 'center', }}>
                    <Ratestaricon />
                    <Text style={{ fontWeight: 'bold', color: '#f5a523' }}> 4.8</Text>
                    <Text style={{ color: 'lightgrey' }}> (253)</Text>
                </View>
            </View>
        </View>

    )
}

const style = StyleSheet.create({
    maincardcontainer: {
        width: 200,
        height: 'auto',
        backgroundColor: 'white',
        border: "1px solid grey",
    },
    cardcontainer: {
        flexDirection: 'column',
        alignItems: 'center',
        border: "1px solid grey",

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
});
export default Category;
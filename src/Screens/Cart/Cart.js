import React from "react";
import { Text, View, Image, ScrollView } from "react-native";
import Emptycarticon from "../../../assets/svg/empty-state-cart.svg";
import style from "./Cartstyle";


function Cart() {

    return (
        <View style={style.container}>
            <Emptycarticon/>
            <Text style={style.text}>Your cart is empty</Text>
            <Text style={style.subText}>Be sure to fill your cart with something you like</Text>
        </View>
       
    )
}

export default Cart;
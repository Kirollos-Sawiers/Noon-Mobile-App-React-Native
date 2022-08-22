import React, { useState, useEffect } from "react";
import Expressicon from "../../../assets/svg/fulfilment_express_v2-en.svg";
import Ratestaricon from "../../../assets/svg/ratestar.svg";
import {
  View,
  Image,
  Text,
  FlatList,
  Pressable,
} from "react-native";
import style from "./Productsstyle";


const Products = ({ route, navigation }) => {
  const { categoryId } = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchData = async () => {
    const resp = await fetch(
      `https://api.escuelajs.co/api/v1/categories/${categoryId}/products`
    );
    const dataresp = await resp.json();
    setData(dataresp);
    setLoading(false);
    console.log(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item }) => {
  let salePrice = item.price - item.price * 0.05;

    return (
      <Pressable
      //    onPress={() => {
      // 			navigation.navigate('Details',{
      // 				productId: item.id,
      // 			});
      // 			console.log(item.id)
      // 		}}
      >
        <View style={style.maincardcontainer}>
          <View style={style.cardcontainer}>
            <Image source={{ uri: item.images[2] }} style={style.cardcover} />
          </View>
          <Text style={{ marginLeft: 10 }}>{item.title}</Text>

          <View style={style.pricecontainer}>
            <Text style={{ fontWeight: "300" }}>EGP </Text>
            <Text style={{ fontWeight: "bold" }}>{salePrice}</Text>
          </View>
          <View style={style.pricecontainer}>
            <Text
              style={{
                textDecorationLine: "line-through",
                fontWeight: "300",
                color: "grey",
              }}
            >
              EGP {item.price}
            </Text>
            <Text style={{ fontWeight: "bold", color: "#38AE04" }}>
              {" "}
              5% OFF
            </Text>
          </View>
          <View style={style.ratecontainer}>
            <Expressicon width="60" height="16" />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ratestaricon fill="#f5a523" />
              <Text style={{ fontWeight: "bold", color: "#f5a523" }}> 4.8</Text>
              <Text style={{ color: "lightgrey" }}> (253)</Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  



  return (
    <View>
      {loading && (
        <Image
          style={{
            width: 200,
            height: 200,
            alignSelf: "center",
            justifyContent: "center",
          }}
          source={{
            uri: "https://f.nooncdn.com/s/app/com/noon/images/_loaders/noon-loader.gif",
          }}
        />
      )}

      <View style={style.container}>
        {data && (
          <View style = {style.container}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default Products;

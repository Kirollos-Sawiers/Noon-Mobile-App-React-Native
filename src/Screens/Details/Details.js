import React, { useState, useEffect } from "react";
import { Text, View, Image, ScrollView, FlatList, SectionList,ToastAndroid, } from "react-native";
import { Divider, Button, ProgressBar, List, Searchbar } from "react-native-paper";
import style from "./Detailsstyle";
import Logo from "../../../assets/svg/noon-logo-en.svg";
import Expressicon from "../../../assets/svg/fulfilment_express_v2-en.svg";
import Ratestaricon from "../../../assets/svg/ratestar.svg";
import Arrowicon from "../../../assets/svg/right-chevron.svg";
import Installmenticon from "../../../assets/svg/installments.svg";
import Warrantyicon from "../../../assets/svg/warranty.svg";
import Returnsicon from "../../../assets/svg/free_returns.svg";
import Noonlockericon from "../../../assets/svg/noon-locker.svg";
import Sellericon from "../../../assets/svg/seller.svg";
import Doticon from "../../../assets/svg/dot.svg";
import { collection, doc, setDoc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../database/firebase";
import Carousel from "../Carousel/Carousel";
import data from "./data"
import AsyncStorage from '@react-native-async-storage/async-storage';


function Details({ route, navigation }) {
  const [product, setProduct] = useState({});
  const [productHighlights, setproductHighlights] = useState([]);
  const [keys, setKeys] = useState([]);

  const { itemId } = route.params;
  // const { productId } = route.params;
  // console.log(productId);

  
	// useEffect(() => {
	// 	const unsubscribe = navigation.addListener("focus", () => {
  //     getProduct();
	// 	});
	// 	return unsubscribe;
	// }, [navigation]);

  useEffect(() => {
    getProduct();
    return () => { };
  }, []);

  const getProduct = () => {
    getDoc(doc(db, "Mobile", itemId))
      .then((docData) => {
        if (docData.exists()) {
          setProduct(docData.data());
          setproductHighlights(product.highlights)
   console.log(product.highlights)

        } else {
          console.log("Error getting data");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  // console.log(product);

  const InternalMemory = ({ item }) => {
    return (
      <Button mode="outlined" style={{ margin: 10 }} color="#383838">
        {item}
      </Button>
    );
  };
  const ColorName = ({ item }) => {
    return (
      <View style={style.colorCardSection}>
        <Image
          source={{
            uri: product.img,
          }}
          style={{ width: 80, height: 100 }}
        />
        <Text style={{ fontWeight: "bold", fontSize: 12 }}>{item}</Text>
      </View>
    );
  };
  let salePrice = product.price - (product.price * (parseInt(product.discount))*0.01);

  const Highlights = ({item}) => {
  //  console.log(productHighlights)
    return (
      <>
      <View style={{marginLeft:10}}>
        <List.Section style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 15, color: "#383838" }}><Doticon width="5" height="5" fill="grey" style={{ marginBottom: 5 }} /> {item}</Text>
        </List.Section>
        </View>
      </>
    );
  };

  // Add to cart
  const addToCart = async (itemId) => {
    let itemArray = await AsyncStorage.getItem('productsIds');
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      array.push(itemId);
      console.log(itemArray);
      try {
        await AsyncStorage.setItem('productsIds', JSON.stringify(array));
				ToastAndroid.show("Product Added To Your Cart!", ToastAndroid.SHORT);
      } catch (error) {
        return error;
      }
    } else {
      let array = [];
      array.push(itemId);
      try {
        await AsyncStorage.setItem('productsIds', JSON.stringify(array));
				ToastAndroid.show("Product Added To Your Cart!", ToastAndroid.SHORT);
        console.log(array);

      } catch (error) {
        return error;
      }
    }
  };


  return (
    <View style={{ paddingBottom: 60}}>

      <ScrollView>
  
        <View style={style.mainContainer}>

          {/* Section One */}

          <View style={style.headContainer}>
            <Text style={{ fontWeight: "bold", color: "#2b4cd7" }}>{product.brand}</Text>
            <View style={style.ratecontainer}>
              <View style={style.rateBox}>
                <Text
                  style={{ fontSize: 12, fontWeight: "bold", color: "white" }}
                >
                  5.0{" "}
                </Text>
                <Ratestaricon width="10" height="10" fill="white" />
              </View>
              <Text style={{ fontSize: 12, textDecorationLine: "underline" }}>
                {product.numberOfRatings} rating
              </Text>
            </View>
          </View>
          <Text style={{ fontWeight: "bold", fontSize: 18, marginLeft: 10, marginBottom: 40 }}>
            {product.name}
          </Text>

          <View style={{ width: "100%", height: 400 }}>
            <Image source={{ uri: product.img }} style={{ width: 250, height: 340, alignSelf: "center" }} />
          </View>

          <View style={style.headContainer}>
            <View style={style.priceContainer}>
              <Text style={{ fontWeight: "300", fontSize: 18 }}>EGP </Text>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                {salePrice}
              </Text>
              <Text style={{ fontWeight: "300", fontSize: 12, color: "grey" }}>
                {" "}
                (Inclusive of VAT)
              </Text>
            </View>
            <Expressicon width="80" height="20" />
          </View>

          <View style={style.priceContainer}>
            <Text
              style={{
                textDecorationLine: "line-through",
                fontWeight: "300",
                fontSize: 16,
                color: "grey",
                marginLeft: 10,
              }}
            >
              EGP {product.price}
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
                color: "#38AE04",
                marginLeft: 5,
              }}
            >
              {product.discount}% OFF
            </Text>
          </View>
          <Text
            style={{ fontWeight: "400", fontSize: 12, color: "red", margin: 10 }}
          >
            Low stoke: only 2 left
          </Text>
          <Divider style={{ padding: 6, backgroundColor: "#e6ecf7" }} />

          {/* Section Two */}

          <View style={style.priceContainer}>
            <Text style={{ fontWeight: "bold", fontSize: 16, marginLeft: 10 }}>
              Free delivery{" "}
            </Text>
            <Text style={{ fontSize: 16, marginVertical: 10 }}>by</Text>
            <Text style={{ fontWeight: "bold", fontSize: 16, color: "#f5a523" }}>
              {" "}
              Sat, Aug 20
            </Text>
          </View>
          <Text
            style={{
              fontWeight: "300",
              fontSize: 14,
              marginLeft: 10,
              marginBottom: 15,
            }}
          >
            Order in 11h 25m
          </Text>
          <Divider style={{ padding: 6, backgroundColor: "#e6ecf7" }} />

          {/* Section Three */}

          <View style={style.priceContainer}>
            <Installmenticon width="25" height="25" style={{ margin: 10 }} />
            <Text
              style={{
                fontWeight: "300",
                fontSize: 14,
                marginVertical: 20,
              }}
            >
              Get it on{" "}
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 14,
              }}
            >
              0% interest{" "}
            </Text>
            <Text
              style={{
                fontWeight: "300",
                fontSize: 14,
              }}
            >
              installments for{" "}
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 14,
              }}
            >
              EGP 2,055.00 per month{" "}
            </Text>
            <Arrowicon width="15" style={{ marginLeft: 30 }} />
          </View>
          <Image
            source={{
              uri: "https://f.nooncdn.com/cms/pages/20220419/7e4b7c8e9d1f4d6dc041e183e07ff1e1/en_pdp-01.png",
            }}
            style={style.cardcover}
          />

          <View style={style.mainlistcontainer}>
            <View style={style.sublistcontainer}>
              <Warrantyicon style={style.listicon} />
              <Text style={{ fontWeight: "300", marginVertical: 10 }}>
                No warranty
              </Text>
            </View>
            <View style={style.sublistcontainer}>
              <Arrowicon width={15} height={15} style={{ marginLeft: 10 }} />
            </View>
          </View>
          <Divider />
          <View style={style.mainlistcontainer}>
            <View style={style.sublistcontainer}>
              <Returnsicon style={{ marginRight: 10 }} />
              <Text style={{ fontWeight: "300", marginVertical: 10 }}>
                This item is eligible for free returns
              </Text>
            </View>
            <View style={style.sublistcontainer}>
              <Arrowicon width={15} height={15} style={{ marginLeft: 10 }} />
            </View>
          </View>
          <Divider />
          <View style={style.mainlistcontainer}>
            <View style={style.sublistcontainer}>
              <Noonlockericon style={{ marginRight: 10 }} />
              <Text style={{ fontWeight: "300", marginVertical: 10 }}>
                Free delivery on noon lockers
              </Text>
            </View>
            <View style={style.sublistcontainer}>
              <Arrowicon width={15} height={15} style={{ marginLeft: 10 }} />
            </View>
          </View>
          <Divider />
          <Divider style={{ padding: 6, backgroundColor: "#e6ecf7" }} />

          {/* Section Four */}

          <View>
            <Text style={{ fontWeight: "bold", fontSize: 18, margin: 10 }}>
              Internal Memory
            </Text>
            <View style={style.priceContainer}>
              <FlatList
              horizontal
              data={product.storage}
              renderItem={({ item }) => (
                <>
                  <View>
                    <InternalMemory item={item} />
                  </View>
                </>
              )}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
            />
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 18, margin: 10 }}>
              Color Name
            </Text>
            <View style={style.priceContainer}>
              <FlatList
              horizontal
              data={product.colors}
              renderItem={({ item }) => (
                <>
                  <View>
                    <ColorName item={item} />
                  </View>
                </>
              )}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
            />
            </View>
          </View>
          <Divider style={{ padding: 6, backgroundColor: "#e6ecf7" }} />

          {/* Section Five */}

          <View style={style.priceContainer}>
            <View style={style.sellerIconContainer}>
              <Sellericon width="25" height="25" />
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "300",
                      fontSize: 16,
                      marginLeft: 10,
                      marginBottom: 5,
                    }}
                  >
                    Sold by{" "}
                  </Text>
                  <Text
                    style={{ fontWeight: "bold", fontSize: 16, color: "#2b4cd7" }}
                  >
                    Original Stores{" "}
                  </Text>
                </View>
                <View style={style.ratecontainer}>
                  <View style={style.rateBox}>
                    <Text
                      style={{ fontSize: 12, fontWeight: "bold", color: "white" }}
                    >
                      4.1{" "}
                    </Text>
                    <Ratestaricon width="10" height="10" fill="white" />
                  </View>
                  <Text style={{ fontSize: 12 }}>
                    {product.numberOfRatings} Positive Seller Ratings
                  </Text>
                </View>
              </View>
              <Arrowicon width="15" style={{ marginLeft: 180 }} />
            </View>
          </View>
          <Divider style={{ marginHorizontal: 15 }} />
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 14,
                margin: 10,
              }}
            >
              Product as Described
            </Text>
            <View style={{ width: 300, borderRadius: 2, flexDirection: "row", alignItems: "center", }}>
              <ProgressBar progress={0.3} color="#38AE04" style={{ width: 250, borderRadius: 3, height: 6, backgroundColor: "lightgrey" }} />
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 12,
                  color: "#38AE04",
                  marginLeft: 10,
                }}
              >
                {product.rating} %
              </Text>
            </View>
          </View>
          <Divider style={{ padding: 6, backgroundColor: "#e6ecf7" }} />

          {/* Section Six */}
          <View>
            <Text style={{ width: 130, borderBottomWidth: 3, borderBottomColor: "#2b4cd7", padding: 20, fontWeight: "bold", fontSize: 18, color: "#2b4cd7" }}>Overview</Text>

            <View>
              <Text style={{ fontWeight: "bold", fontSize: 18, margin: 10, }}>Highlights</Text>
              <FlatList
              style={{ width: "100%", margin: 10, paddingRight: 10 }}
              vertical
              data={product.highlights}
              renderItem={({ item }) => (
                <>
                  <View>
                    <Highlights item={item} />
                  </View>
                </>
              )}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
            />
              {/* <Highlights /> */}
            </View>
          </View>
          <Divider style={{ padding: 6, backgroundColor: "#e6ecf7" }} />
        </View>
      </ScrollView>
      <View style={{ backgroundColor:"white",paddingVertical:5}}>
      <Button color="white" style={{ width: "80%", height: 50, backgroundColor: "#2b4cd7", paddingTop: 5, fontWeight: "bold",alignSelf:"center" }} onPress={() => { addToCart(itemId) }} >Add to cart</Button>
    </View>
    </View>
  );
}

export default Details;

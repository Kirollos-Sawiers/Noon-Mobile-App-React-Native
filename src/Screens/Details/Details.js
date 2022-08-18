import React, { useState, useEffect } from "react";
import { Text, View, Image, ScrollView, FlatList } from "react-native";
import { Divider, Button,ProgressBar, Searchbar } from "react-native-paper";
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
import { collection, doc, setDoc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../database/firebase";

function Details({ route }) {
  const [product, setProduct] = useState({});

  const { itemId } = route.params;

  useEffect(() => {
    getProduct();
    return () => {};
  }, []);

  const getProduct = () => {
    getDoc(doc(db, "Mobile", itemId))
      .then((docData) => {
        if (docData.exists()) {
          setProduct(docData.data());
        } else {
          console.log("Error getting data");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  console.log(product);

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
            uri: "https://f.nooncdn.com/products/tr:n-t_80/v1652872655/N51463098A_1.jpg",
          }}
          style={{ width: 80, height: 100 }}
        />
        <Text style={{ fontWeight: "bold", fontSize: 12 }}>{item}</Text>
      </View>
    );
  };
  return (
    <ScrollView>
      <View style={style.mainContainer}>
        {/* Section One */}

        <View style={style.headContainer}>
          <Text style={{ fontWeight: "bold", color: "#2b4cd7" }}>Google</Text>
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
              1 rating
            </Text>
          </View>
        </View>
        <Text style={{ fontWeight: "bold", fontSize: 18, marginLeft: 10 }}>
          {product.description}
        </Text>

        {/*  cruasel  */}

        <View>
          <Image source={{ uri: product.img }} style={style.cardcover} />
        </View>

        <View style={style.headContainer}>
          <View style={style.priceContainer}>
            <Text style={{ fontWeight: "300", fontSize: 18 }}>EGP </Text>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              {product.price}
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
                  77% Positive Seller Ratings
                </Text>
              </View>
            </View>
            <Arrowicon width="15" style={{ marginLeft: 180 }} />
          </View>					
        </View>
				<Divider style = {{marginHorizontal: 15}} />
				<Text
            style={{
              fontWeight: "bold",
              fontSize: 14,
							margin: 10,
            }}
          >
            Product as Described
          </Text>
					<View style={{width: 250,borderRadius:2, margin:20,flexDirection:"row",alignItems: "center", justifyContent:"flex-end"}}>
					<ProgressBar progress={0.82} color="#38AE04" style={{borderRadius:3,height:6, backgroundColor:"lightgrey"}}/>
					<Text
            style={{
              fontWeight: "bold",
              fontSize: 12,
              color: "#38AE04",
              marginLeft: 10,
            }}
          >
            82%
          </Text>
					</View>
        <Divider style={{ padding: 6, backgroundColor: "#e6ecf7" }} />

      </View>
    </ScrollView>
  );
}

export default Details;

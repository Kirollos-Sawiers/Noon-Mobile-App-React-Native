import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  Pressable,
} from "react-native";
import { Searchbar } from "react-native-paper";
import style from "./Homestyle";
import Logo from "../../../assets/svg/noon-logo-en.svg";
import Expressicon from "../../../assets/svg/fulfilment_express_v2-en.svg";
import Ratestaricon from "../../../assets/svg/ratestar.svg";
import Carousel from "../Carousel/Carousel";
import datacarousel from "./carouseldata";
import { sections } from "./sectionsdata";
import { collection, doc, setDoc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../database/firebase";

function Home({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const [mobiles, setMobiles] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllMobiles();
    FetchData();
    return () => {};
  }, []);

  const searchFilter = (text) => {
    if (text) {
      const newData = mobiles.filter((item) => {
        const itemData = item.name ? item.name : "";
        const textData = text;
        return itemData.indexOf(textData) !== -1;
      });
      setFilterData(newData);
      setSearchQuery(text);
    } else {
      setFilterData(mobiles);
      setSearchQuery(text);
    }
  };

  const FetchData = async () => {
    const resp = await fetch(`https://api.escuelajs.co/api/v1/products`);
    const dataresp = await resp.json();
    setData(dataresp);
    // setLoading(false);
    // console.log(data);
  };

  const ProductsApi = ({ item, catid }) => {
    let salePrice = item.price - item.price * 0.05;
    if (item.category.id == catid) {
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
                <Text style={{ fontWeight: "bold", color: "#f5a523" }}>
                  {" "}
                  4.8
                </Text>
                <Text style={{ color: "lightgrey" }}> (253)</Text>
              </View>
            </View>
          </View>
        </Pressable>
      );
    } else {
      return (
        <Image
          source={{
            uri: "https://f.nooncdn.com/cms/pages/20220629/c776b7c3f5f2af83e77ff33baf95bb3c/en_mb_eg-strip-01.gif",
          }}
          style={{ width: "100%", height: "30%" }}
        />
      );
    }
  };

  const ListItem = ({ item }) => {
    return (
      <View>
        <Image
          source={{
            uri: item.uri,
          }}
          style={item.img}
          resizeMode="cover"
        />
      </View>
    );
  };
  const getAllMobiles = () => {
    getDocs(collection(db, "Mobile"))
      .then((docSnap) => {
        let data = [];
        docSnap.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        setMobiles(data);
        setFilterData(data);
        setLoading(false);

        // console.log("document data : ", mobiles);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
  const ProductCart = ({ item }) => {
    let salePrice = item.price - item.price * parseInt(item.discount) * 0.01;
    return (
      <Pressable
        onPress={() => {
          navigation.navigate("Details", {
            itemId: item.id,
          });
          console.log(item.id);
        }}
      >
        <View style={style.maincardcontainer}>
          <View style={style.cardcontainer}>
            <Image source={{ uri: item.img }} style={style.cardcover} />
          </View>
          <Text style={{ marginLeft: 10 }}>{item.name}</Text>

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
              {item.discount}% OFF
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
    <View style={{ backgroundColor: "white" }}>
      <ScrollView>
        <View style={style.container}>
          <Logo width={72} height={20} fill={"black"} style={style.noonLogo} />
          <Searchbar
             placeholder="What are you looking for?"
             onChangeText={(text) => searchFilter(text)}
             value={searchQuery}
             style={style.searchBar}
          />
        </View>
        {loading && (
          <View style={{ width: "100%", height: "100%" }}>
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
          </View>
        )}
        {mobiles && (
          <View>
            <Image
              source={{
                uri: "https://k.nooncdn.com/cms/pages/20220711/c0fcf46593a74ab27356e1580aba5195/en_mb_eg-toggle-01.png",
              }}
              style={style.sahelBanner}
            />
            {/* <Carousel data={datacarousel} /> */}

            <FlatList
              horizontal
              data={sections.section1}
              renderItem={({ item }) => (
                <>
                  <View>
                    <ListItem item={item} />
                  </View>
                </>
              )}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
            />
            <View
              style={{
                backgroundColor: "#ffdcc0",
                padding: 15,
                flexDirection: "row",
              }}
            >
              <Image
                style={{ width: 220, height: 190 }}
                source={{
                  uri: "https://f.nooncdn.com/cms/pages/20220817/278451758357ba2370444e10f0cc0b5f/en_mb_eg-mega-01.png",
                }}
              />
              <Image
                style={{ width: 220, height: 190, marginLeft: 20 }}
                source={{
                  uri: "https://f.nooncdn.com/cms/pages/20220815/957c391282b2ca131b4178327a91fa37/en_mb_eg-mega-01.png",
                }}
              />
            </View>
            <View>
              <Text style={{ fontSize: 24, fontWeight: "bold", margin: 15 }}>
                Hot deals
              </Text>
              <FlatList
                horizontal
                data={filterData}
                renderItem={({ item }) => (
                  <>
                    <ProductCart item={item} />
                  </>
                )}
                showsHorizontalScrollIndicator={true}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            <View style={{ backgroundColor: "#ebffe2" }}>
              <Image
                style={{
                  width: "100%",
                  height: 60,
                  margin: 10,
                  alignSelf: "center",
                }}
                source={{
                  uri: "https://f.nooncdn.com/cms/pages/20220821/a8b1e16b91b9e4ed36f085bd36119e0e/titles/en_mb_eg-title-01.png",
                }}
              />
              <View
                style={{ flexDirection: "row", margin: 10, flexWrap: "wrap" }}
              >
                <Image
                  style={{ width: 130, height: 180, marginLeft: 20 }}
                  source={{
                    uri: "https://f.nooncdn.com/cms/pages/20220821/a8b1e16b91b9e4ed36f085bd36119e0e/Backpacks/en_mb_eg-cat-01.png",
                  }}
                />
                <Image
                  style={{ width: 130, height: 180, marginLeft: 20 }}
                  source={{
                    uri: "https://f.nooncdn.com/cms/pages/20220821/a8b1e16b91b9e4ed36f085bd36119e0e/Backpacks/en_mb_eg-cat-02.png",
                  }}
                />
                <Image
                  style={{ width: 130, height: 180, marginLeft: 20 }}
                  source={{
                    uri: "https://f.nooncdn.com/cms/pages/20220821/a8b1e16b91b9e4ed36f085bd36119e0e/Backpacks/en_mb_eg-cat-03.png",
                  }}
                />
                <Image
                  style={{ width: 205, height: 185, marginLeft: 20 }}
                  source={{
                    uri: "https://f.nooncdn.com/cms/pages/20220821/a8b1e16b91b9e4ed36f085bd36119e0e/Backpacks/en_mb_eg-cat-04.png",
                  }}
                />
                <Image
                  style={{ width: 205, height: 185, marginLeft: 20 }}
                  source={{
                    uri: "https://f.nooncdn.com/cms/pages/20220821/a8b1e16b91b9e4ed36f085bd36119e0e/Backpacks/en_mb_eg-cat-05.png",
                  }}
                />
              </View>
            </View>
            <View style={{ width: "100%", height: 340 }}>
              <FlatList
                horizontal
                data={data}
                renderItem={({ item }) => (
                  <>
                    <View>
                      <ProductsApi item={item} catid={1} />
                    </View>
                  </>
                )}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            <View style={{ backgroundColor: "#ffe6d3" }}>
              <Image
                style={{
                  width: "100%",
                  height: 60,
                  margin: 10,
                  alignSelf: "center",
                }}
                source={{
                  uri: "https://f.nooncdn.com/cms/pages/20220821/27ab828f91e73e1fd2b617fb5035d4f6/en_mb_eg-title-0.png",
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{ width: 125, height: 220 }}
                  source={{
                    uri: "https://f.nooncdn.com/cms/pages/20220821/a8b1e16b91b9e4ed36f085bd36119e0e/Coupon-Zone-beauty/en_mb_eg-cat-01.png",
                  }}
                />
                <Image
                  style={{ width: 125, height: 220, marginLeft: 20 }}
                  source={{
                    uri: "https://f.nooncdn.com/cms/pages/20220821/a8b1e16b91b9e4ed36f085bd36119e0e/Coupon-Zone-beauty/en_mb_eg-cat-02.png",
                  }}
                />
                <Image
                  style={{ width: 125, height: 220, marginLeft: 20 }}
                  source={{
                    uri: "https://f.nooncdn.com/cms/pages/20220821/27ab828f91e73e1fd2b617fb5035d4f6/en_mb_eg-cat-03.png",
                  }}
                />
                <Image
                  style={{ width: 200, height: 225, marginTop: 15 }}
                  source={{
                    uri: "https://f.nooncdn.com/cms/pages/20220821/27ab828f91e73e1fd2b617fb5035d4f6/en_mb_eg-cat-04.png",
                  }}
                />
                <Image
                  style={{
                    width: 200,
                    height: 225,
                    marginLeft: 20,
                    marginVertical: 15,
                  }}
                  source={{
                    uri: "https://f.nooncdn.com/cms/pages/20220821/27ab828f91e73e1fd2b617fb5035d4f6/en_mb_eg-cat-05.png",
                  }}
                />
              </View>
            </View>

            <View style={{ width: "100%", height: 340 }}>
              <FlatList
                horizontal
                data={data}
                renderItem={({ item }) => (
                  <>
                    <View>
                      <ProductsApi item={item} catid={2} />
                    </View>
                  </>
                )}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            <Image
              style={{
                width: "100%",
                height: 160,
                margin: 10,
                alignSelf: "center",
              }}
              source={{
                uri: "https://f.nooncdn.com/cms/pages/20220810/8f4967ab2d465af5df3f0f2d2d261cf3/en_mb_eg-spot-01.png",
              }}
            />
            <View style={{ width: "100%", height: 340 }}>
              <FlatList
                horizontal
                data={data}
                renderItem={({ item }) => (
                  <>
                    <View>
                      <ProductsApi item={item} catid={3} />
                    </View>
                  </>
                )}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            <View style={{ backgroundColor: "#fffbcc", paddingBottom: 15 }}>
              <Image
                style={{
                  width: "100%",
                  height: 60,
                  margin: 10,
                  alignSelf: "center",
                }}
                source={{
                  uri: "https://f.nooncdn.com/cms/pages/20220808/f0a3a577360e2b4314f57f6ad1a48815/en_mb_eg-title-11.png",
                }}
              />
              <FlatList
                horizontal
                data={sections.section2}
                renderItem={({ item }) => (
                  <>
                    <View>
                      <ListItem item={item} />
                    </View>
                  </>
                )}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            <View style={{ width: "100%", height: 340 }}>
              <FlatList
                horizontal
                data={data}
                renderItem={({ item }) => (
                  <>
                    <View>
                      <ProductsApi item={item} catid={4} />
                    </View>
                  </>
                )}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>

          </View>)}
      </ScrollView>
    </View>
  );
}

export default Home;

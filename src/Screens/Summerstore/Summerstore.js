import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  SectionList,
  SafeAreaView,
  FlatList,
	Pressable,
} from "react-native";
import { Searchbar } from "react-native-paper";
import Logo from "../../../assets/svg/noon-logo-en.svg";
import Expressicon from "../../../assets/svg/fulfilment_express_v2-en.svg";
import Ratestaricon from "../../../assets/svg/ratestar.svg";
import style from "./summerstorestyle";
import { collection, doc, setDoc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../database/firebase";

function Summerstore({ navigation}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobiles, setMobiles] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    getAllMobiles();
    return () => {};
  }, []);

  // getDoc(doc(db, "Mobile", "Iphone6s")).then((docData) => {
  //     if (docData.exists()){
  //         console.log(docData.data());
  //         setData(docData.data());
  //     }else {
  //         console.log("Error getting data");
  //     }
  // }).catch((error) => {
  //     console.log(error.message);
  // });

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

        console.log("document data : ", mobiles);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

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

  const ListProduct = ({ item }) => {
    let salePrice = item.price - (item.price * (parseInt(item.discount))*0.01);
    return (
			<Pressable onPress={() => {
				navigation.navigate('Details', {
					itemId: item.id,
				});
				console.log(item.id)
			}}>
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
            <Ratestaricon fill = "#f5a523"/>
            <Text style={{ fontWeight: "bold", color: "#f5a523" }}> 4.8</Text>
            <Text style={{ color: "lightgrey" }}> (253)</Text>
          </View>
        </View>
      </View>
			</Pressable>
    );
  };

  return (
    <View style={style.body}>
      <SafeAreaView style={{ flex: 1 }}>
        <Logo width={72} height={20} fill={"black"} style={style.noonLogo} />
        <Searchbar
          placeholder="What are you looking for?"
          onChangeText={(text) => searchFilter(text)}
          value={searchQuery}
          style={style.searchBar}
        />
				<ScrollView>
        {loading && (
          <View style={{width: '100%', height: '100%'}}>
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
    {mobiles && ( <View>
      <Image
          source={{
            uri: "https://k.nooncdn.com/cms/pages/20220711/c0fcf46593a74ab27356e1580aba5195/en_mb_eg-toggle-01.png",
          }}
          style={style.sahelBanner}
        />
        <Image
          source={{
            uri: "https://k.nooncdn.com/cms/pages/20220629/c776b7c3f5f2af83e77ff33baf95bb3c/en_mb_eg-strip-01.gif",
          }}
          style={style.gif}
        />
        {/* <Image
                        source={{
                            uri: 'https://k.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-title-01.png',
                        }}
                        style={{ width: '100%', height: 41 }}
                    /> */}

        <SectionList
          contentContainerStyle={{ paddingHorizontal: 10 }}
          stickySectionHeadersEnabled={false}
          sections={SECTIONS}
          renderSectionHeader={({ section }) => (
            <>
              <Image
                source={{
                  uri: `${section.uri}`,
                }}
                style={section.listheaderimg}
              />
              <FlatList
                horizontal
                data={section.data}
                renderItem={({ item }) => (
                  <>
                    <View style={section.imgcontainer}>
                      <ListItem item={item} />
                    </View>
                  </>
                )}
                showsHorizontalScrollIndicator={true}
                keyExtractor={(item, index) => index.toString()}
              />
              <FlatList
                horizontal
                data={filterData}
                renderItem={({ item }) => (
                  <>
                    <View style={section.imgcontainer}>
                      <ListProduct item={item} />
                    </View>
                  </>
                )}
                showsHorizontalScrollIndicator={true}
                keyExtractor={(item, index) => index.toString()}
              />
            </>
          )}
          renderItem={({ item, section }) => {
            return <>{/* <ListItem item={item} /> */}</>;
          }}
        /> 
        </View>
        )}
				</ScrollView>
      </SafeAreaView>
    </View>
  );
}

const SECTIONS = [
  {
    uri: "https://k.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-title-01.png",
    // horizontal: true,
    head: "Your personal essentials",
    imgcontainer: {
      backgroundColor: "white",
    },
    listheaderimg: {
      width: "100%",
      height: 41,
      paddingVertical: 10,
      backgroundColor: "white",
    },
    data: [
      {
        key: "1",
        img: {
          width: 72,
          height: 107.38,
          margin: 10,
        },
        uri: "https://k.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-CB-01.png",
      },
      {
        key: "2",
        img: {
          width: 72,
          height: 107.38,
          margin: 10,
        },
        uri: "https://k.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-CB-14.png",
      },

      {
        key: "3",
        img: {
          width: 72,
          height: 107.38,
          margin: 10,
        },
        uri: "https://k.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-CB-02.png",
      },
      {
        key: "4",
        img: {
          width: 72,
          height: 107.38,
          margin: 10,
        },
        uri: "https://k.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-CB-06.png",
      },
      {
        key: "5",
        img: {
          width: 72,
          height: 107.38,
          margin: 10,
        },
        uri: "https://k.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-CB-09.png",
      },
      {
        key: "6",
        img: {
          width: 72,
          height: 107.38,
          margin: 10,
        },
        uri: "https://k.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-CB-11.png",
      },
      {
        key: "7",
        img: {
          width: 72,
          height: 107.38,
          margin: 10,
        },
        uri: "https://k.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-CB-05.png",
      },
      {
        key: "8",
        img: {
          width: 72,
          height: 107.38,
          margin: 10,
        },
        uri: "https://k.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-CB-13.png",
      },
      {
        key: "9",
        img: {
          width: 72,
          height: 107.38,
          margin: 10,
        },
        uri: "https://k.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-CB-04.png",
      },
      {
        key: "10",
        img: {
          width: 72,
          height: 107.38,
          margin: 10,
        },
        uri: "https://k.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-CB-03.png",
      },
      {
        key: "11",
        img: {
          width: 72,
          height: 107.38,
          margin: 10,
        },
        uri: "https://k.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-CB-08.png",
      },
      {
        key: "12",
        img: {
          width: 72,
          height: 107.38,
          margin: 10,
        },
        uri: "https://k.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-CB-10.png",
      },
      {
        key: "13",
        img: {
          width: 72,
          height: 107.38,
          margin: 10,
        },
        uri: "https://k.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-CB-12.png",
      },
      {
        key: "14",
        img: {
          width: 72,
          height: 107.38,
          margin: 10,
        },
        uri: "https://k.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-CB-07.png",
      },
    ],
  },
  {
    uri: "https://k.nooncdn.com/cms/pages/20220629/918c4b9b9d284002987ea08173de9dae/en_mb_eg-title-10.png",
    imgcontainer: {
      backgroundColor: "#ffeedd",
    },
    listheaderimg: {
      width: "100%",
      height: 41,
      paddingVertical: 15,
      backgroundColor: "#ffeedd",
    },
    data: [
      {
        key: "1",
        img: {
          width: 215,
          height: 150,
          margin: 10,
        },
        uri: "https://k.nooncdn.com/cms/pages/20220810/fea8e44934458caa3cb4ea5128cb4313/en_mb_eg-mega-01.png",
      },
      {
        key: "2",
        img: {
          width: 215,
          height: 150,
          margin: 10,
        },
        uri: "https://k.nooncdn.com/cms/pages/20220811/fde266e07f55639146a307e3ce9ef541/en_mb_eg-mega-07.png",
      },

      {
        key: "3",
        img: {
          width: 215,
          height: 150,
          margin: 10,
        },
        uri: "https://k.nooncdn.com/cms/pages/20220810/fea8e44934458caa3cb4ea5128cb4313/en_mb_eg-mega-04.png",
      },
      {
        key: "4",
        img: {
          width: 215,
          height: 150,
          margin: 10,
        },
        uri: "https://k.nooncdn.com/cms/pages/20220810/fea8e44934458caa3cb4ea5128cb4313/en_mb_eg-mega-05.png",
      },
    ],
  },
  {
    uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-title-03.png",
    imgcontainer: {
      backgroundColor: "white",
    },
    listheaderimg: {
      width: "100%",
      height: 41,
      paddingVertical: 10,
      backgroundColor: "white",
    },
    data: [
      {
        key: "1",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-cat-08.png",
      },
      {
        key: "2",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-cat-09.png",
      },

      {
        key: "3",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-cat-10.png",
      },
      {
        key: "4",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-cat-11.png",
      },
      {
        key: "5",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-cat-06.png",
      },
      {
        key: "6",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-cat-06.png",
      },
      {
        key: "7",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-cat-12.png",
      },
      {
        key: "8",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-cat-07.png",
      },
    ],
  },
  ////////////////////////////////////////////////////////////////////////////////////
  {
    uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-title-08.png",
    imgcontainer: {
      backgroundColor: "#eafbff",
    },
    listheaderimg: {
      width: "100%",
      height: 41,
      paddingVertical: 10,
      backgroundColor: "#eafbff",
    },
    data: [
      {
        key: "1",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/b18bb213c1f15a43e18c94e5fba66321/en_mb_eg-cat-38.png",
      },
      {
        key: "2",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/918c4b9b9d284002987ea08173de9dae/en_mb_eg-cat-39.png",
      },

      {
        key: "3",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/918c4b9b9d284002987ea08173de9dae/en_mb_eg-cat-40.png",
      },
      {
        key: "4",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/918c4b9b9d284002987ea08173de9dae/en_mb_eg-cat-41.png",
      },
      {
        key: "5",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/918c4b9b9d284002987ea08173de9dae/en_mb_eg-cat-42.png",
      },
      {
        key: "6",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/918c4b9b9d284002987ea08173de9dae/en_mb_eg-cat-43.png",
      },
      {
        key: "7",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/918c4b9b9d284002987ea08173de9dae/en_mb_eg-cat-44.png",
      },
    ],
  },
  ////////////////////////////////////////////////////////////////////////////////////
  {
    uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-title-05.png",
    imgcontainer: {
      backgroundColor: "white",
    },
    listheaderimg: {
      width: "100%",
      height: 41,
      paddingVertical: 10,
      backgroundColor: "white",
    },
    data: [
      {
        key: "1",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-cat-20.png",
      },
      {
        key: "2",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-cat-21.png",
      },

      {
        key: "3",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-cat-22.png",
      },
      {
        key: "4",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-cat-23.png",
      },
      {
        key: "5",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-cat-24.png",
      },
      {
        key: "6",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/918c4b9b9d284002987ea08173de9dae/en_mb_eg-cat-25.png",
      },
    ],
  },
  ////////////////////////////////////////////////////////////////////////////////////
  {
    uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-title-04.png",
    imgcontainer: {
      backgroundColor: "#ffeed0",
    },
    listheaderimg: {
      width: "100%",
      height: 41,
      paddingVertical: 10,
      backgroundColor: "#ffeed0",
    },
    data: [
      {
        key: "1",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-cat-13.png",
      },
      {
        key: "2",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-cat-14.png",
      },

      {
        key: "3",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-cat-15.png",
      },
      {
        key: "4",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-cat-16.png",
      },
      {
        key: "5",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-cat-17.png",
      },
      {
        key: "6",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-cat-18.png",
      },
      {
        key: "7",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-cat-19.png",
      },
    ],
  },
  ////////////////////////////////////////////////////////////////////////////////////
  {
    uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-title-07.png",
    imgcontainer: {
      backgroundColor: "white",
    },
    listheaderimg: {
      width: "100%",
      height: 41,
      paddingVertical: 10,
      backgroundColor: "white",
    },
    data: [
      {
        key: "1",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-cat-32.png",
      },
      {
        key: "2",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-cat-33.png",
      },

      {
        key: "3",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-cat-34.png",
      },
      {
        key: "4",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-cat-35.png",
      },
      {
        key: "5",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-cat-36.png",
      },
      {
        key: "6",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-cat-37.png",
      },
    ],
  },
  ////////////////////////////////////////////////////////////////////////////////////
  {
    uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-title-06.png",
    imgcontainer: {
      backgroundColor: "#eafbff",
    },
    listheaderimg: {
      width: "100%",
      height: 41,
      paddingVertical: 10,
      backgroundColor: "#eafbff",
    },
    data: [
      {
        key: "1",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-cat-26.png",
      },
      {
        key: "2",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-cat-27.png",
      },

      {
        key: "3",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-cat-28.png",
      },
      {
        key: "4",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-cat-29.png",
      },
      {
        key: "5",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-cat-30.png",
      },
      {
        key: "6",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-cat-31.png",
      },
    ],
  },
  ////////////////////////////////////////////////////////////////////////////////////
  {
    uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-title-02.png",
    imgcontainer: {
      backgroundColor: "white",
    },
    listheaderimg: {
      width: "100%",
      height: 41,
      paddingVertical: 10,
      backgroundColor: "white",
    },
    data: [
      {
        key: "1",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-cat-01.png",
      },
      {
        key: "2",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-cat-02.png",
      },

      {
        key: "3",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220703/7079adc3454fc56384a4422f161f6f1c/en_mb_eg-cat-03.png",
      },
      {
        key: "4",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-cat-04.png",
      },
      {
        key: "5",
        img: {
          width: 110,
          height: 160,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/918c4b9b9d284002987ea08173de9dae/en_mb_eg-cat-05.png",
      },
    ],
  },
  ////////////////////////////////////////////////////////////////////////////////////
  {
    uri: "https://f.nooncdn.com/cms/pages/20220629/d510e73f026cc6ddd1e343b0b53a2f5a/en_mb_eg-title-09.png",
    imgcontainer: {
      backgroundColor: "#ffdcc0",
    },
    listheaderimg: {
      width: "100%",
      height: 41,
      paddingVertical: 10,
      backgroundColor: "#ffdcc0",
    },
    data: [
      {
        key: "1",
        img: {
          width: 147,
          height: 190,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/918c4b9b9d284002987ea08173de9dae/en_mb_eg-cat-45.png",
      },
      {
        key: "2",
        img: {
          width: 147,
          height: 190,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/918c4b9b9d284002987ea08173de9dae/en_mb_eg-cat-46.png",
      },

      {
        key: "3",
        img: {
          width: 147,
          height: 190,
          marginHorizontal: 5,
          marginVertical: 15,
        },
        uri: "https://f.nooncdn.com/cms/pages/20220629/918c4b9b9d284002987ea08173de9dae/en_mb_eg-cat-47.png",
      },
    ],
  },
  ////////////////////////////////////////////////////////////////////////////////////
];

export default Summerstore;

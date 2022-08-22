import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Text,FlatList,Pressable } from "react-native";

const ForYou = ({ navigation }) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const resp = await fetch("https://api.escuelajs.co/api/v1/categories");
    const dataresp = await resp.json();
    setData(dataresp);
    setLoading(false);
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <Pressable
       onPress={() => {
				navigation.navigate('Products',{
					categoryId: item.id,
				});
				console.log(item.id)
			}}
      >
      <View style={styles.box}>
      <Image
        source={{
          uri: item.image
        }}
        style={{
          width: 120,
          height: 80,
          resizeMode: "cover",
          borderRadius:30,
        }}
      />
      <Text style={{ textAlign: "center", fontWeight: "bold",marginTop:10}}>
       {item.name}
      </Text>
    </View>
    </Pressable>
    );
  };

  return (
    <View style={{ marginTop: 20,}}>
      <Text style={{marginLeft:25,marginTop:10,fontWeight: 'bold'}}>Top Picks</Text>
      {loading && <Image style={{width:200, height:200, alignSelf: 'center'}} source = {{uri : "https://f.nooncdn.com/s/app/com/noon/images/_loaders/noon-loader.gif"}}/>}

      <View style={styles.container}>

        {data && (
      <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: "#fff",
    flexDirection: "row",
  },

  box: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal:30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ForYou;

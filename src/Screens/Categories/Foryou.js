import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

function ForYou() {
  return (
    <View style={{ marginTop: 20, fontWeight: "bold" }}>
      <Text>Top Picks</Text>
      <View style={styles.container}>
        <View style={styles.box}>
          <Image
            source={{
              uri: "https://k.nooncdn.com/cms/pages/20190404/6377d905b0cbc2a70ce1512cea5f8686/mobiles-above-aed-2000.jpg",
            }}
            style={{
              width: 75,
              height: 75,
              resizeMode: "contain",
            }}
          />
          <Text style={{ textAlign: "center", justifyContent: "center" }}>
            Mobiles
          </Text>
        </View>

        <View style={[styles.box, { flexDirection: "column" }]}>
          <Image
            source={{
              uri: "https://k.nooncdn.com/cms/pages/20190404/6377d905b0cbc2a70ce1512cea5f8686/mobiles-powerbanks.jpg",
            }}
            style={{
              width: 75,
              height: 75,
              resizeMode: "contain",
            }}
          />
          <Text style={{ textAlign: "center" }}>Electronics Accessories</Text>
        </View>

        <View style={styles.box}>
          <Image
            source={{
              uri: "https://k.nooncdn.com/cms/pages/20190404/6377d905b0cbc2a70ce1512cea5f8686/elec-view-all-01.jpg",
            }}
            style={{
              width: 75,
              height: 75,
              resizeMode: "contain",
            }}
          />
          <Text style={{ textAlign: "center" }}>Video games</Text>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.box}>
          <Image
            source={{
              uri: "https://k.nooncdn.com/cms/pages/20190404/6377d905b0cbc2a70ce1512cea5f8686/fragrance-bestsellers.jpg",
            }}
            style={{
              width: 75,
              height: 75,
              resizeMode: "contain",
            }}
          />
          <Text style={{ textAlign: "center", justifyContent: "center" }}>
            Fragnance
          </Text>
        </View>

        <View style={[styles.box, { flexDirection: "column" }]}>
          <Image
            source={{
              uri: "https://k.nooncdn.com/cms/pages/20190404/6377d905b0cbc2a70ce1512cea5f8686/elec-laptops.jpg",
            }}
            style={{
              width: 75,
              height: 75,
              resizeMode: "contain",
            }}
          />
          <Text style={{ textAlign: "center" }}>Laptop</Text>
        </View>

        <View style={styles.box}>
          <Image
            source={{
              uri: "https://k.nooncdn.com/cms/pages/20190404/6377d905b0cbc2a70ce1512cea5f8686/beauty-best-sellers.jpg",
            }}
            style={{
              width: 75,
              height: 75,
              resizeMode: "contain",
            }}
          />
          <Text style={{ textAlign: "center" }}>Makeup</Text>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.box}>
          <Image
            source={{
              uri: "https://k.nooncdn.com/cms/pages/20190404/6377d905b0cbc2a70ce1512cea5f8686/appliance-coffee-makers.jpg",
            }}
            style={{
              width: 75,
              height: 75,
              resizeMode: "contain",
            }}
          />
          <Text style={{ textAlign: "left", justifyContent: "center" }}>
            Home & Kitchen
          </Text>
        </View>
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
    border: 2,
    width: 75,
    height: 75,
    margin: 4,
  },
});

export default ForYou;

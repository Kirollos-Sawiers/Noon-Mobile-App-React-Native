import React from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import ForYou from "./Foryou";

const data = [
  "just for you",
  "Men's Fashion",
  "Woman's fashion",
  "Grocery",
  "BabyToys",
  "Mobiles & Tablets",
  "Electronics",
  "Tvs & Accessories",
  "Laptop & Accessories",
  "home",
  "Appliances",
  "Automotive",
  "Sports",
  "Health & beauty",
  "Stationary & Books",
];

// setSelectedItem: React.Dispatch<React.SetStateAction<any>>;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const widthProportion = "60%";
const sidePortion = "30%";

function Category() {
  const [selectedItem, setSelectedItem] = React.useState(null);

  const animatedValue = new Animated.Value(0); //makes reactnative save current position when component receive new value or props
  const { width, height } = Dimensions.get("screen");

  const _renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => actionOnRow(item)}>
        <View
          style={[
            styles.nonsenseItem,
            { backgroundColor: item === selectedItem ? "white" : "#bcc7dc" },
          ]}
        >
          <Text style={styles.itemText}>{item}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const actionOnRow = (item) => {
    console.log("Selected Item :", item);
    setSelectedItem(item);
  };

  let translateY = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: [0, -180],
    extrapolate: "clamp",
  });

  //----------------- Tab ------------------------
  const Tabs = React.forwardRef(({ item }, ref) => {
    return (
      <View ref={ref}>
        <Text
          style={{
            color: "white",
            fontSize: 84 / data.length,
            fontWeight: "800",
            textTransform: "uppercase",
          }}
        >
          {data}
        </Text>
      </View>
    );
  });

  return (
    <View style={{ flexDirection: "row", top: 40 }}>
      <View style={styles.container}>
        <AnimatedFlatList
          // contentContainerStyle={{marginTop: 200}}
          showsVerticalScrollIndicator={false}
          // scrollEventThrottle={16} // <-- Use 1 here to make sure no events are ever missed
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: animatedValue } } }],
            { useNativeDriver: false } // <-- Add this
          )}
          data={data}
          renderItem={_renderItem}
          keyExtractor={(item, i) => i}
        />
        {/* <Animated.View /> */}

        <Animated.View
          style={[styles.headerWrapper, { transform: [{ translateY }] }]}
        />
      </View>
      <View style={styles.box}>
        {(() => {
          switch (selectedItem) {
            case "just for you":
              return <ForYou />;
            case "Men's Fashion":
              return <ForYou />;
            case "Woman's fashion":
              return <ForYou />;
            case "Grocery":
              return <ForYou />;
            case "BabyToys":
              return <ForYou />;
            case "Mobiles & Tablets":
              return <ForYou />;
            case "Electronics":
              return <ForYou />;
            case "Tvs & Accessories":
              return <ForYou />;
            case "home":
              return <ForYou />;
            case "Appliances":
              return <ForYou />;
            case "Automotive":
              return <ForYou />;
            case "Sports":
              return <ForYou />;
            case "Health & beauty":
              return <ForYou />;
            case "Stationary & Books":
              return <ForYou />;
            default:
              return <ForYou />;
          }
        })()}
      </View>
      {/* <Tabs animatedValue={animatedValue} data={data}/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#bcc7dc",
  },

  itemText: {
    fontSize: 13,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: 18,
    left: 0,
  },

  headerWrapper: {
    position: "absolute",
    backgroundColor: "red",
    height: 0,
    left: 0,
    right: 0,
  },

  box: {
    flex: 5,
    backgroundColor: "white",
  },
});

export default Category;

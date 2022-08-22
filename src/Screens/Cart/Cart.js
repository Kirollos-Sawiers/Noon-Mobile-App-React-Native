import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	Image,
	ScrollView,
	TouchableOpacity,
	ToastAndroid,
	StyleSheet,
	TextInput,
	TouchableHighlight,
} from "react-native";
import Emptycarticon from "../../../assets/svg/empty-state-cart.svg";
import style from "./Cartstyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import {COLOURS, Items} from '../Database/database';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import { collection, doc, setDoc, getDoc, getDocs } from "firebase/firestore";
import { auth, db } from "../../../database/firebase";
import { onAuthStateChanged } from "firebase/auth";

function Cart({ navigation }) {
	const [noProducts, setNoProducts] = useState(true);
	const [getProducts, setGetProducts] = useState(false);
	const [product, setProduct] = useState([]);
	const [products, setProducts] = useState([]);
	const [total, setTotal] = useState(null);
	const [count, setCount] = useState(0);
	const [number, onChangeNumber] = React.useState(null);

	let tomorrow = moment().add(1, "days").calendar().toString();

	let timecount2 = moment().startOf("hour").fromNow().toString();

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			getDataFromFirebase();
		});
		return unsubscribe;
	}, [navigation]);

	const getDataFromFirebase = async () => {
		let items = await AsyncStorage.getItem("productsIds");
		let productsData = [];
		let itemsId = JSON.parse(items);
		console.log(itemsId);
		if (itemsId.length > 0) {
			itemsId.map((productid) => {
				getDoc(doc(db, "Mobile", productid))
					.then((docData) => {
						if (docData.exists()) {
							// console.log(docData.data())
							productsData.push(docData.data());
							// console.log(products)
							setProducts(productsData);
							getTotal(productsData);
							console.log(productsData.length)
								setNoProducts(false);
								setGetProducts(true)
								console.log("fe data")
						} else {
							console.log("Error getting data");
						}
					})
					.catch((error) => {
						console.log(error.message);
					});
			});

		} else {
			console.log("no IDs available");
			setNoProducts(true);
			setGetProducts(false);
			console.log("mafeesh data")
			getTotal(productsData);

		}
		return <></>;
	};

	//get total price of all items in the cart

	const getTotal = (productData) => {
		let total = 0;
		for (let index = 0; index < productData.length; index++) {
			let productPrice = parseInt(productData[index].price);
			productPrice = productData[index].price - (productData[index].price * (parseInt(productData[index].discount))*0.01);
			total = total + productPrice;
		}
		console.log(total)
		setTotal(total);
	};

	const removeItemFromCart = async (id) => {
		let itemArray = await AsyncStorage.getItem("productsIds");
		itemArray = JSON.parse(itemArray);
		if (itemArray) {
			let array = itemArray;
			console.log(array);
			for (let index = 0; index < array.length; index++) {
				if (array[index] === id) {
					array.splice(index, 1);
					// console.log(array);
				}
				await AsyncStorage.setItem("productsIds", JSON.stringify(array));
				getDataFromFirebase();
			}
		}
	};

	let itemcount = products.length;

	const checkOut = () => {
		{
			const unsubscribe = onAuthStateChanged(auth, (user) => {
			  if (user) {
				console.log(user.email);
				ToastAndroid.show("Items will be Deliverd SOON!", ToastAndroid.SHORT);

				navigation.navigate("Home");
			  } else {
				ToastAndroid.show("You don't have an account...! please create a new one.", ToastAndroid.SHORT);

				navigation.navigate("Signup");
			  }
			});
			return unsubscribe;
		  }

	
	};

	const renderProducts = (data, index) => {
		let salePrice = data.price - (data.price * (parseInt(data.discount))*0.01);

		return (
			<View style={{ padding: 16, backgroundColor: "white" }} key={index}>
				<TouchableOpacity
					key={data.key}
					onPress={() =>
						navigation.navigate("ProductInfo", { productID: data.id })
					}
					style={{
						width: "100%",
						height: 100,
						marginVertical: 6,
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<View
						style={{
							flex: 1,
							height: "100%",
							justifyContent: "space-around",
						}}
					>
						<View style={{ marginRight: 18 }}>
							<Text
								style={{
									fontSize: 16,
									color: "grey",
									textTransform: "capitalize",
								}}
							>
								{data.brand}
							</Text>
							<Text
								style={{
									fontSize: 16,
									maxWidth: "100%",
									color: "black",
									fontWeight: "600",
									letterSpacing: 1,
								}}
							>
								{data.name}
							</Text>
							<View
								style={{
									marginTop: 10,
									flexDirection: "column",
									opacity: 0.6,
									marginBottom: 15,
								}}
							>
								<Text
									style={{
										fontSize: 14,
										fontWeight: "800",
										maxWidth: "85%",
										marginRight: 4,
										textDecorationLine: "line-through",
										color:"red"
									}}
								>
									EGP {data.price}
								</Text>
								<Text
									style={{
										fontSize: 20,
										fontWeight: "800",
										maxWidth: "85%",
										marginRight: 4,
									}}
								>
									EGP {salePrice}
								</Text>
							</View>
						</View>
					</View>

					<View
						style={{
							width: 200,
							height: 100,
							padding: 10,
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: "white",
							borderRadius: 5,
							marginRight: 5,
						}}
					>
						<Image
							source={{ uri: data.img }}
							style={{
								width: 150,
								height: 100,
								resizeMode: "contain",
							}}
						/>
					</View>
				</TouchableOpacity>

				<View>
					<Text>{timecount2}</Text>
				</View>

				<View>
					<Text style={{ fontWeight: "800" }}>
						Free delivery
						<Text style={{ fontWeight: "400" }}>
							{" "}
							{"\u00A0"} by {"\u00A0"}
						</Text>
						<Text style={{ fontWeight: "800", color: "green" }}>
							{" "}
							{tomorrow}
						</Text>
					</Text>
				</View>
				<View>
					<Text>
						Discount{" "}
						<Text style={{ fontWeight: "800", marginLeft: 5, color: "green" }}>
							{data.discount}%
						</Text>{" "}
					</Text>
				</View>

				{/* items counter */}

				<View
					style={{
						flexDirection: "row",
						// justifyContent: 'space-between',
						alignItems: "center",
					}}
				>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<View
							style={{
								borderRadius: 100,
								marginRight: 20,
								padding: 4,
								borderWidth: 1,
								borderColor: "#F0F0F3",
								opacity: 0.5,
							}}
						>
							<MaterialCommunityIcons
								name="minus"
								style={{
									fontSize: 16,
									color: "#777777",
								}}
							/>
						</View>
						<Text>1</Text>
						<View
							style={{
								borderRadius: 100,
								marginLeft: 20,
								padding: 4,
								borderWidth: 1,
								borderColor: "#B9B9B9",
								opacity: 0.5,
							}}
						>
							<MaterialCommunityIcons
								name="plus"
								style={{
									fontSize: 16,
									color: "#777777",
								}}
							/>
						</View>
					</View>
					<TouchableOpacity onPress={() => removeItemFromCart(data.id)}>
						<MaterialCommunityIcons
							name="delete-outline"
							style={{
								fontSize: 25,
								color: "#777777",
								backgroundColor: "#F0F0F3",
								padding: 8,
								borderRadius: 5,
								alignItems: "flex-end",
								marginLeft: 200,
								marginRight: 10,
							}}
						/>
					</TouchableOpacity>
					<Text style={{ fontSize: 15, color: "#777777" }}>Remove</Text>
				</View>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<View
						style={{
							flex: 1,
							height: 0.3,
							backgroundColor: "black",
							marginTop: 10,
						}}
					/>
				</View>
			</View>
		);
	};

	return (
		<View>
			{noProducts && (
				<View style={style.container}>
					<Emptycarticon />
					<Text style={style.text}>Your cart is empty</Text>
					<Text style={style.subText}>
						Be sure to fill your cart with something you like
					</Text>
				</View>
			)}
			{getProducts && (
				<View
					style={{
						width: "100%",
						height: "100%",
						position: "relative",
						backgroundColor: "white",
					}}
				>
					<ScrollView>
						<View>
							<Image
								source={{
									uri: "https://f.nooncdn.com/cms/pages/20220711/c0fcf46593a74ab27356e1580aba5195/en_mb_eg-toggle-01.png",
								}}
								style={{
									width: "100%",
									height: 75,
									resizeMode: "contain",
								}}
							/>
						</View>
						<View style={{ paddingHorizontal: 16 }}>
							{products ? products.map(renderProducts) : null}
						</View>

						<View style={{ backgroundColor: "#ccddff" }}>
							{/******************** Add Coupoun Section ***************************/}
							<View
								style={{
									paddingHorizontal: 16,
									marginVertical: 10,
								}}
							>
								<View
									style={{
										flexDirection: "row",
										width: window.width,
										height: 50,
										margin: 5,
										padding: 0,
										alignItems: "center",
										justifyContent: "center",
										backgroundColor: "#fff",
									}}
								>
									<View style={{ flex: 4 }}>
										<TextInput
											onChangeText={(textEntry) => {
												this.setState({ searchText: textEntry });
											}}
											style={{ backgroundColor: "transparent", margin: 12 }}
											onSubmitEditing={() => {
												this.onSubmit(this.state.searchText);
											}}
											placeholder="Enter Coupoun"
										/>
									</View>

									<View style={{ flex: 1 }}>
										{/* <View style={{width:1,height:30,backgroundColor: 'black',marginTop:0}}></View> */}
										<TouchableHighlight
											onPress={() => {
												Apply();
											}}
											underlayColor="transparent"
										>
											<View>
												<Text
													style={{
														backgroundColor: "white",
														marginLeft: 20,
														borderLeftWidth: 0.8,
														padding: 6,
													}}
												>
													Apply
												</Text>
											</View>
										</TouchableHighlight>
									</View>
								</View>
								{/**************** * Total calculation Section *****************/}
								<View
									style={{
										paddingHorizontal: 16,
										marginTop: 40,
										marginBottom: 10,
									}}
								>
									<View
										style={{
											flexDirection: "row",
											alignItems: "center",
											justifyContent: "space-between",
											marginBottom: 8,
										}}
									>
										<Text
											style={{
												fontSize: 18,
												fontWeight: "400",
												maxWidth: "80%",
												color: "black",
												opacity: 0.5,
											}}
										>
											Subtotal
										</Text>
										<Text
											style={{
												fontSize: 18,
												fontWeight: "400",
												color: "black",
												opacity: 0.8,
											}}
										>
											EGP {total}.00
										</Text>
									</View>
									<View
										style={{
											flexDirection: "row",
											alignItems: "center",
											justifyContent: "space-between",
											marginBottom: 10,
										}}
									>
										<Text
											style={{
												fontSize: 18,
												fontWeight: "400",
												maxWidth: "80%",
												color: "black",
												opacity: 0.5,
											}}
										>
											Shipping fee
										</Text>
										<Text
											style={{
												fontSize: 18,
												fontWeight: "800",
												color: "green",
												opacity: 0.8,
											}}
										>
											Free
										</Text>
									</View>
									<View
										style={{
											flexDirection: "row",
											alignItems: "center",
											justifyContent: "space-between",
										}}
									>
										<Text
											style={{
												fontSize: 18,
												fontWeight: "800",
												maxWidth: "80%",
												color: "black",
												opacity: 0.5,
											}}
										>
											Total
											<Text style={{ fontSize: 10 }}>(inclusive VAT)</Text>
										</Text>
										<Text
											style={{
												fontSize: 18,
												fontWeight: "800",
												color: "black",
											}}
										>
											EGP {total}.00
										</Text>
									</View>
								</View>
							</View>
							{/***************************** * Payment Section *********************/}
							<Text
								style={{
									fontSize: 16,
									color: "black",
									fontWeight: "500",
									letterSpacing: 1,
									marginLeft: 25,
								}}
							>
								Payment Method
							</Text>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
									margin: 20,
									marginRight: 30,
									marginLeft: 30,
								}}
							>
								<Image
									style={{ width: 100, height: 40, resizeMode: "contain" }}
									source={{
										uri: "https://pngimg.com/uploads/mastercard/mastercard_PNG14.png",
									}}
								/>
								<Image
									style={{ width: 100, height: 40, resizeMode: "contain" }}
									source={{
										uri: "https://w7.pngwing.com/pngs/424/169/png-transparent-credit-card-visa-electron-mastercard-credit-card-text-logo-banner-thumbnail.png",
									}}
								/>
								<Image
									style={{ width: 100, height: 40, resizeMode: "contain" }}
									source={{
										uri: "https://w7.pngwing.com/pngs/639/345/png-transparent-american-express-merchant-services-credit-card-bank-logo-credit-card-blue-text-logo.png",
									}}
								/>

								{/* <MaterialCommunityIcons
                name="chevron-right"
                style={{fontSize: 22, color: COLOURS.black}}
              /> */}
							</View>
						</View>
					</ScrollView>

					<View
						style={{
							flexDirection: "row",
							backgroundColor: "#ffffcc",
							paddingHorizontal: 16,
							marginVertical: 10,
						}}
					>
						<Text
							style={{
								fontSize: 12,
								padding: 10,
								backgroundColor: "#ffffcc",
								color: "black",
								fontWeight: "500",
								letterSpacing: 1,
								marginBottom: 60,
							}}
						>
							Monthly Installment Plans available for orders above 500 EGP.
						</Text>

						<MaterialCommunityIcons
							name="chevron-right"
							style={{ fontSize: 40, color: "orange", alignItems: "center" }}
						/>
					</View>

					<View
						style={{
							position: "absolute",
							bottom: 0,
							height: "8%",
							width: "100%",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<TouchableOpacity
							onPress={() => (total != 0 ? checkOut() : null)}
							style={{
								width: "80%",
								height: 60,
								backgroundColor: "blue",
								justifyContent: "center",
								alignItems: "center",
								borderRadius:5
							}}
						>
							<Text
								style={{
									fontSize: 18,
									fontWeight: "500",
									letterSpacing: 1,
									color: "white",
									textTransform: "uppercase",
								}}
							>
								Buy {itemcount} items for EGP {total}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			)}
		</View>
	);
}
const styles = StyleSheet.create({
	input: {
		height: 50,
		margin: 12,
		borderWidth: 0.5,
		padding: 10,
		backgroundColor: "white",
	},
});

export default Cart;

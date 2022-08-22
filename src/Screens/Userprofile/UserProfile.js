import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import {
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  Alert,
  Modal,
  Button,
} from "react-native";
import { TextInput } from "react-native-paper";
import style from "./UserProfilestyle";
import Logo from "../../../assets/svg/noon-logo-en.svg";
import Closeicon from "../../../assets/svg/close.svg";
import * as Yup from "yup";
import { auth, db } from "../../../database/firebase";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

const UserProfile = ({ navigation }) => {
  const [fbemail, setFbemail] = useState("");
  const [fbpassword, setFbpassword] = useState("");
  const [fbfirstname, setFbFisrtname] = useState("");
  const [fblastname, setFbLastname] = useState("");
  const [userData, setuserData] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.email);
        getUserData();
      }
    });
    return unsubscribe;
  }, []);

  const getUserData = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getDoc(doc(db, "mobileUsers", `${user.email}`))
          .then((docData) => {
            if (docData.exists()) {
              console.log("data submitted");
              console.log(docData.data());
              setuserData(docData.data());
        setLoading(false);
            }
          })
          .catch((error) => {
            console.log(error.messege);
          });
      } else {
        console.log("Error getting data");
      }
    });
  };
  const updateUserData = () => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.email)
    updateDoc(doc(db, "mobileUsers", `${user.email}`), {
      firstName: fbfirstname,
      lastName: fblastname,
    }).then(() => {
        setFbFisrtname("")
        setFbLastname("")
        getUserData()
      }).catch((error) => {
        console.log(error.messege);
      })
    } else {
      console.log("Error updating data")
    }
  });

  };

  return (
    <View style={style.centeredView}>
      <Modal animationType="slide" transparent={false}>
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Logo
                width={72}
                height={20}
                fill={"black"}
                style={style.noonLogo}
              />
              <Closeicon
                width={15}
                height={15}
                onPress={() => {
                  navigation.navigate("Myaccount");
                }}
              />
            </View>
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
 {userData && ( <View>
            <Text style={style.headerText}>
              {userData.firstName + " " + userData.lastName}{" "}
            </Text>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
              }}
              validationSchema={Yup.object({
                firstName: Yup.string().required(
                  "Hold up, this field is required."
                ),
                lastName: Yup.string().required(
                  "Hold up, this field is required."
                ),
                email: Yup.string()
                  .required("Hold up, this field is required.")
                  .email("oh no! please enter a valid email"),
                password: Yup.string().required(
                  "Hold up, this field is required."
                ),
              })}
              onSubmit={(values) => {
                alert(JSON.stringify(values));
              }}
            >
              {(props) => (
                <View>
                  <TextInput
                    label="First Name"
                    onChangeText={(text) => setFbFisrtname(text)}
                    onChange={props.handleChange("firstName")}
                    placeholder={userData.firstName}
                    underlineColor="lightgrey"
                    activeUnderlineColor="grey"
                    style={{ backgroundColor: "transparent", marginBottom: 20 }}
                  />
                  {props.touched.firstName && props.errors.firstName ? (
                    <Text style={{ color: "red", fontSize: 10 }}>
                      {props.errors.firstName}
                    </Text>
                  ) : null}
                  <TextInput
                    label="Last Name"
                    onChangeText={(text) => setFbLastname(text)}
                    onChange={props.handleChange("lastName")}
                    placeholder={userData.lastName}
                    underlineColor="lightgrey"
                    activeUnderlineColor="grey"
                    style={{ backgroundColor: "transparent", marginBottom: 20 }}
                  />
                  {props.touched.lastName && props.errors.lastName ? (
                    <Text style={{ color: "red", fontSize: 10 }}>
                      {props.errors.lastName}
                    </Text>
                  ) : null}
                  {/* <TextInput
                    label="Email"
                    onChangeText={(text) => setFbemail(text)}
                    onChange={props.handleChange("email")}
                    placeholder="Please enter your email address"
                    underlineColor="lightgrey"
                    activeUnderlineColor="grey"
                    style={{ backgroundColor: "transparent", marginBottom: 20 }}
                  />
                  {props.touched.email && props.errors.email ? (
                    <Text style={{ color: "red", fontSize: 10 }}>
                      {props.errors.email}
                    </Text>
                  ) : null}
                  <TextInput
                    label="Passward"
                    type="password"
                    secureTextEntry={true}
                    onChangeText={(text) => setFbpassword(text)}
                    onChange={props.handleChange("password")}
                    placeholder="Please enter your password"
                    underlineColor="lightgrey"
                    activeUnderlineColor="grey"
                    style={{ backgroundColor: "transparent", marginBottom: 20 }}
                  />
                  {props.touched.password && props.errors.password ? (
                    <Text
                      style={{ color: "red", fontSize: 10, marginBottom: 20 }}
                    >
                      {props.errors.password}
                    </Text>
                  ) : null} */}

                  <Pressable
                    style={style.button}
                  onPress={updateUserData}
                  >
                    <Text style={style.textStyle}>Save Changes</Text>
                  </Pressable>
                </View>
              )}
            </Formik>
            </View>
 )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UserProfile;

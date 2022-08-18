import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Text, View, Image, ScrollView, Pressable, Alert, Modal, Button,ImageBackground } from "react-native";
import { TextInput } from 'react-native-paper';
import style from "./signinformstyle";
import Logo from "../../../assets/svg/noon-logo-en.svg";
import Closeicon from "../../../assets/svg/close.svg";
import * as Yup from "yup";
import {auth} from '../../../database/firebase'
import { onAuthStateChanged,signInWithEmailAndPassword } from "firebase/auth";



function Signinform({ navigation }) {

  const [fbemail, setFbemail] = useState('')
  const [fbpassword, setFbpassword] = useState('')

  useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth, user => {
      if(user){
        navigation.navigate("Home")
      }
    })
    return unsubscribe
  },[])

  const handleSignIn = () => {
  signInWithEmailAndPassword(auth, fbemail, fbpassword)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('signed in with : ', user.email);
      }).catch(error => alert(error.message));
  }

  return (

    <View style={style.centeredView}>
      <Modal
        animationType="slide"
        transparent={false}
      >
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
              <Logo width={72} height={20} fill={"black"} style={style.noonLogo} />
              <Closeicon width={15} height={15} onPress={() => { navigation.navigate("Myaccount") }} />
            </View>

            <Text style={style.headerText}>Ahlan! Welcome back!</Text>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={Yup.object({
                email: Yup.string().required("Hold up, this field is required.").email("oh no! please enter a valid email"),
                password: Yup.string().required("Hold up, this field is required."),
              })}
              onSubmit={(values) => {
                alert(JSON.stringify(values))
              }}
            >
              {props => (
                <View>
                  <TextInput
                    label="Email"
                    value={fbemail}
                    onChangeText={(text) => setFbemail(text)}
                    onChange={props.handleChange("email")}
                    placeholder="Please enter your email address"
                    underlineColor="lightgrey"
                    activeUnderlineColor="grey"
                    style={{ backgroundColor: "transparent", marginBottom: 10 }}
                  />
                  {props.touched.email && props.errors.email ? (<Text style={{ color: "red", fontSize: 10 }}>{props.errors.email}</Text>) : null}
                  <TextInput
                    label="Passward"
                    type="password"
                    secureTextEntry={true}
                    value={fbpassword}
                    onChangeText={text => setFbpassword(text)}
                    onChange={props.handleChange("password")}
                    placeholder="Please enter your password"
                    underlineColor="lightgrey"
                    activeUnderlineColor="grey"
                    style={{ backgroundColor: "transparent", marginBottom: 10 }}
                  />
                  {props.touched.password && props.errors.password ? (<Text style={{ color: "red", fontSize: 10, marginBottom: 20 }}>{props.errors.password}</Text>) : null}
                  <Text style={style.boldText}>Forgot your password?</Text>

                  <Pressable
                    style={[style.button, style.buttonClose]}
                    onPress={handleSignIn}
                  >
                    <Text style={style.textStyle}>Sign In</Text>
                  </Pressable>
                </View>
              )}
            </Formik>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: 'grey', marginLeft: 15 }}>Don't have an account?</Text>
              <Text style={style.boldText} onPress={() => navigation.navigate("Signup")}>Sign Up</Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>

  )
}

export default Signinform;

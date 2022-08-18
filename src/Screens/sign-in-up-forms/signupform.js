import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { Text, View, Image, ScrollView, Pressable, Alert, Modal, Button } from "react-native";
import { TextInput } from 'react-native-paper';
import style from "./signupformstyle";
import Logo from "../../../assets/svg/noon-logo-en.svg";
import Closeicon from "../../../assets/svg/close.svg";
import * as Yup from "yup";
import {auth} from '../../../database/firebase'
import { onAuthStateChanged,createUserWithEmailAndPassword } from "firebase/auth";


function Signupform({ navigation }) {

  
  const [fbemail, setFbemail] = useState('')
  const [fbpassword, setFbpassword] = useState('')
  const [fbfirstname, setFbFisrtname] = useState('')
  const [fblastname, setFbLastname] = useState('')

 

  const handleSignUp = () => {
  createUserWithEmailAndPassword(auth, fbemail, fbpassword)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('signed up with : ', user.email);
      }).catch(error => alert(error.message));
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
       if(user){
         navigation.navigate("Home")
       }
     })
     return unsubscribe
   },[])

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

            <Text style={style.headerText}>Create a noon account</Text>
            <Formik
              initialValues={{ firstName: '',
              lastName: '',email: '', password: '' }}
              validationSchema={Yup.object({
                firstName: Yup.string().required("Hold up, this field is required."),
                lastName: Yup.string().required("Hold up, this field is required."),
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
                    label="First Name"
                    onChangeText={(text) => setFbFisrtname(text)}
                    onChange={props.handleChange("firstName")}
                    placeholder="Please enter your first name"
                    underlineColor="lightgrey"
                    activeUnderlineColor="grey"
                    style={{ backgroundColor: "transparent", marginBottom: 20 }}
                  />
                  {props.touched.firstName && props.errors.firstName ? (<Text style={{ color: "red", fontSize: 10 }}>{props.errors.firstName}</Text>) : null}
                  <TextInput
                    label="Last Name"
                    onChangeText={(text) => setFbLastname(text)}
                    onChange={props.handleChange("lastName")}
                    placeholder="Please enter your last name"
                    underlineColor="lightgrey"
                    activeUnderlineColor="grey"
                    style={{ backgroundColor: "transparent", marginBottom: 20 }}
                  />
                  {props.touched.lastName && props.errors.lastName ? (<Text style={{ color: "red", fontSize: 10 }}>{props.errors.lastName}</Text>) : null}
                  <TextInput
                    label="Email"
                    onChangeText={(text) => setFbemail(text)}
                    onChange={props.handleChange("email")}
                    placeholder="Please enter your email address"
                    underlineColor="lightgrey"
                    activeUnderlineColor="grey"
                    style={{ backgroundColor: "transparent", marginBottom: 20 }}
                  />
                  {props.touched.email && props.errors.email ? (<Text style={{ color: "red", fontSize: 10 }}>{props.errors.email}</Text>) : null}
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
                  {props.touched.password && props.errors.password ? (<Text style={{ color: "red", fontSize: 10, marginBottom: 20 }}>{props.errors.password}</Text>) : null}

                  <Pressable
                    style={style.button}
                    onPress={handleSignUp}
                  >
                    <Text style={style.textStyle}>Sign Up</Text>
                  </Pressable>
                </View>
              )}
            </Formik>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: 'grey', marginLeft: 15 }}>Don't have an account?</Text>
              <Text style={style.boldText} onPress={() => navigation.navigate("Signin")}>Sign In</Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>

  )
}

export default Signupform;

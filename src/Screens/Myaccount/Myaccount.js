import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, Pressable } from "react-native";
import style from "./Myaacountstyle";
import { Divider } from "react-native-paper";
import Logo from "../../../assets/svg/noon-logo-en.svg";
import Signinicon from "../../../assets/svg/account-profile.svg";
import Signupicon from "../../../assets/svg/account-signup.svg";
import Country from "../../../assets/svg/account-region.svg";
import Egypticon from "../../../assets/svg/egypt-flag.svg";
import Arrowicon from "../../../assets/svg/right-chevron.svg";
import Languageicon from "../../../assets/svg/account-language.svg";
import Notificationicon from "../../../assets/svg/notification.svg";
import Helpicon from "../../../assets/svg/account-help.svg";
import Contactusicon from "../../../assets/svg/account-contact.svg";
import Facebookicon from "../../../assets/svg/facebook.svg";
import Twittericon from "../../../assets/svg/twitter.svg";
import Instagramicon from "../../../assets/svg/instagram.svg";
import Linkedinicon from "../../../assets/svg/linkedin.svg";
import Signouticon from "../../../assets/svg/sign-out.svg";
import Ordericon from "../../../assets/svg/account-orders.svg";
import Returnicon from "../../../assets/svg/account-returns.svg";
import Crediticon from "../../../assets/svg/account-credits.svg";
import Storesicon from "../../../assets/svg/account-stores.svg";
import Addressicon from "../../../assets/svg/account-addresses.svg";
import Paymenticon from "../../../assets/svg/account-payment.svg";
import Claimsicon from "../../../assets/svg/account-claims.svg";
import Profileicon from "../../../assets/svg/account-profile-blank.svg";
import { auth } from "../../../database/firebase";
import { onAuthStateChanged } from "firebase/auth";

function Myaccount({ navigation }) {
  const [signState, setSignState] = useState();
  const [myAccountList, setMyAccountList] = useState();
  const [signoutButton, setSignoutButton] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setSignState(signin());
        setMyAccountList(myAccount());
        setSignoutButton(signouticon());
        console.log(user)
      } else {
        setSignState(signout());
        setMyAccountList();
        setSignoutButton();
      }
    });
    return unsubscribe;
  }, []);

  const signin = () => {
    return (
      <>
        <View style={style.signcontainer}>
          <View style={{ alignItems: "center" }}>
            <Ordericon onPress={() => navigation.navigate("Signin")} />
            <Text style={{ fontWeight: "600", marginVertical: 10 }}>
              Orders
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Returnicon onPress={() => navigation.navigate("Signup")} />
            <Text style={{ fontWeight: "600", marginVertical: 10 }}>
              Returns
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Crediticon onPress={() => navigation.navigate("Signup")} />
            <Text style={{ fontWeight: "600", marginVertical: 10 }}>
              noon Credits
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Storesicon onPress={() => navigation.navigate("Signup")} />
            <Text style={{ fontWeight: "600", marginVertical: 10 }}>
              Stores
            </Text>
          </View>
        </View>
      </>
    );
  };

  const signout = () => {
    return (
      <>
        <View style={style.signcontainer}>
          <View style={{ alignItems: "center" }}>
            <Signinicon onPress={() => navigation.navigate("Signin")} />
            <Text style={{ fontWeight: "600", marginVertical: 10 }}>
              Sign In
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Signupicon onPress={() => navigation.navigate("Signup")} />
            <Text style={{ fontWeight: "600", marginVertical: 10 }}>
              Sign Up
            </Text>
          </View>
        </View>
      </>
    );
  };

  const signouticon = () => {
    return (
      <>
        <View style={style.sublistcontainer}>
          <Signouticon width={20} height={20} style={{ marginRight: 10 }} />
          <Text
            onPress={handleSignOut}
            style={{ margin: 10, fontSize: 18, color: "grey" }}
          >
            Sign Out
          </Text>
        </View>
      </>
    );
  };
  const myAccount = () => {
    return (
      <>
        <View>
          <Text style={style.header}>MY ACCOUNT</Text>
        </View>
        <View style={style.mainlistcontainer}>
          <View style={style.sublistcontainer}>
            <Addressicon style={style.listicon} />
            <Text style={{ fontWeight: "bold", marginVertical: 10 }}>
              Addresses
            </Text>
          </View>
          <View style={style.sublistcontainer}>
            <Arrowicon width={15} height={15} style={{ marginLeft: 10 }} />
          </View>
        </View>
        <Divider />
        <View style={style.mainlistcontainer}>
          <View style={style.sublistcontainer}>
            <Paymenticon style={style.listicon} />
            <Text style={{ fontWeight: "bold", marginVertical: 10 }}>
              Payments
            </Text>
          </View>
          <View style={style.sublistcontainer}>
            <Arrowicon width={15} height={15} style={{ marginLeft: 10 }} />
          </View>
        </View>
        <Divider />
        <View style={style.mainlistcontainer}>
          <View style={style.sublistcontainer}>
            <Claimsicon style={{ marginRight: 10 }} />
            <Text style={{ fontWeight: "bold", marginVertical: 10 }}>
              Warranty Claims
            </Text>
          </View>
          <View style={style.sublistcontainer}>
            <Arrowicon width={15} height={15} style={{ marginLeft: 10 }} />
          </View>
        </View>
        <Divider />
        <Pressable onPress={() => {
          navigation.navigate("Profile");
          
        }}>
          <View style={style.mainlistcontainer}>
            <View style={style.sublistcontainer}>
              <Profileicon style={{ marginRight: 10 }} />
              <Text style={{ fontWeight: "bold", marginVertical: 10 }}>
                Profile
              </Text>
            </View>
            <View style={style.sublistcontainer}>
              <Arrowicon width={15} height={15} style={{ marginLeft: 10 }} />
            </View>
          </View>
        </Pressable>
        <Divider />
      </>
    );
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Signin");
        console.log("Sign out");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <>
      <View style={style.body}>
        <Logo width={72} height={20} fill={"black"} style={style.noonLogo} />
        <Divider />
        <Text style={style.text}>Ahlan! Nice to meet you</Text>
        <Text style={style.subText}>
          The region's favorite online marketplace
        </Text>
        {signState}
        <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
          {myAccountList}
          <View>
            <Text style={style.header}>SETTINGS</Text>
          </View>
          <View style={style.mainlistcontainer}>
            <View style={style.sublistcontainer}>
              <Country style={style.listicon} />
              <Text style={{ fontWeight: "bold", marginVertical: 10 }}>
                Country
              </Text>
            </View>
            <View style={style.sublistcontainer}>
              <Egypticon />
              <Arrowicon width={15} height={15} style={{ marginLeft: 10 }} />
            </View>
          </View>
          <Divider />
          <View style={style.mainlistcontainer}>
            <View style={style.sublistcontainer}>
              <Languageicon style={style.listicon} />
              <Text style={{ fontWeight: "bold", marginVertical: 10 }}>
                Language
              </Text>
            </View>
            <View style={style.sublistcontainer}>
              <Text style={{ fontWeight: "bold", marginVertical: 10 }}>
                العربية
              </Text>
              <Arrowicon width={15} height={15} style={{ marginLeft: 10 }} />
            </View>
          </View>
          <Divider />
          <View style={style.mainlistcontainer}>
            <View style={style.sublistcontainer}>
              <Notificationicon
                width={35}
                height={35}
                fill={"black"}
                style={{ marginLeft: -6, marginRight: 10 }}
              />
              <Text style={{ fontWeight: "bold", marginVertical: 10 }}>
                Notifications
              </Text>
            </View>
            <View style={style.sublistcontainer}>
              <Arrowicon width={15} height={15} style={{ marginLeft: 10 }} />
            </View>
          </View>
          <Divider />

          <View>
            <Text style={style.header}>REACH OUT TO US</Text>
          </View>
          <View style={style.mainlistcontainer}>
            <View style={style.sublistcontainer}>
              <Helpicon style={style.listicon} />
              <Text style={{ fontWeight: "bold", marginVertical: 10 }}>
                Help
              </Text>
            </View>
            <View style={style.sublistcontainer}>
              <Arrowicon width={15} height={15} style={{ marginLeft: 10 }} />
            </View>
          </View>
          <Divider />
          <View style={style.mainlistcontainer}>
            <View style={style.sublistcontainer}>
              <Contactusicon style={style.listicon} />
              <Text style={{ fontWeight: "bold", marginVertical: 10 }}>
                Contact us
              </Text>
            </View>
            <View style={style.sublistcontainer}>
              <Arrowicon width={15} height={15} style={{ marginLeft: 10 }} />
            </View>
          </View>
          {signoutButton}
          <View style={style.footercontainer}>
            <View style={style.socialcontainer}>
              <Facebookicon
                width={32}
                height={32}
                style={{ marginRight: 25 }}
              />
              <Twittericon width={32} height={32} />
              <Instagramicon
                width={32}
                height={32}
                style={{ marginHorizontal: 25 }}
              />
              <Linkedinicon width={32} height={32} />
            </View>
            <Text style={style.footerText}>
              Terms Of Use . Terms Of Sale . Privacy Policy
            </Text>
            <Text style={style.footerText}>
              Warranyy Policy . Return Policy . Sell with us
            </Text>
            <Text
              style={{ fontSize: 10, marginVertical: 10, color: "lightgrey" }}
            >
              Version 3.57 (1214)
            </Text>
            <Text style={style.footerText}>
              {"\u00A9"} 2022 noon.com All rights reserved.
            </Text>
          </View>
          {/* </View> */}
        </ScrollView>
      </View>
    </>
  );
}

export default Myaccount;

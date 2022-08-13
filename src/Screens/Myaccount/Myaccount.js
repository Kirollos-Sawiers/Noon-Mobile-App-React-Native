import React from "react";
import { Text, View, Image, ScrollView } from "react-native";
import { Divider } from 'react-native-paper';
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
import style from "./Myaacountstyle";


function Myaccount() {

    return (
        <View style={style.body}>
            <Logo width={72} height={20} fill={"black"} style={style.noonLogo} />
            <Divider />
            <Text style={style.text}>Ahlan! Nice to meet you</Text>
            <Text style={style.subText}>The region's favorite online marketplace</Text>
            <View style={style.signcontainer}>
                <View>
                    <Signinicon />
                    <Text style={{ fontWeight: 'bold', marginVertical: 10 }}>Sign In</Text>
                </View>
                <View>
                    <Signupicon />
                    <Text style={{ fontWeight: 'bold', marginVertical: 10 }}>Sign Up</Text>
                </View>
            </View>
            <View>
                <Text style={style.header}>SETTINGS</Text>
            </View>
            <View style={style.mainlistcontainer}>
                <View style={style.sublistcontainer}>
                    <Country style={style.listicon} />
                    <Text style={{ fontWeight: 'bold', marginVertical: 10 }}>Country</Text>
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
                    <Text style={{ fontWeight: 'bold', marginVertical: 10 }}>Language</Text>
                </View>
                <View style={style.sublistcontainer}>
                    <Text style={{ fontWeight: 'bold', marginVertical: 10 }}>العربية</Text>
                    <Arrowicon width={15} height={15} style={{ marginLeft: 10 }} />
                </View>
            </View>
            <Divider />
            <View style={style.mainlistcontainer}>
                <View style={style.sublistcontainer}>
                    <Notificationicon width={35} height={35} fill={"black"} style={{ marginLeft: -6, marginRight: 10 }} />
                    <Text style={{ fontWeight: 'bold', marginVertical: 10 }}>Notifications</Text>
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
                    <Text style={{ fontWeight: 'bold', marginVertical: 10 }}>Help</Text>
                </View>
                <View style={style.sublistcontainer}>
                    <Arrowicon width={15} height={15} style={{ marginLeft: 10 }} />
                </View>
            </View>
            <Divider />
            <View style={style.mainlistcontainer}>
                <View style={style.sublistcontainer}>
                    <Contactusicon style={style.listicon} />
                    <Text style={{ fontWeight: 'bold', marginVertical: 10 }}>Contact us</Text>
                </View>
                <View style={style.sublistcontainer}>
                    <Arrowicon width={15} height={15} style={{ marginLeft: 10 }} />
                </View>
            </View>
            <View style={style.footercontainer}>
                <View style={style.socialcontainer}>
                <Facebookicon width={32} height={32} style={{ marginRight: 25 }}/>
                <Twittericon width={32} height={32}/>
                <Instagramicon width={32} height={32} style={{ marginHorizontal: 25 }}/>
                <Linkedinicon width={32} height={32}/>
                </View>
                <Text style={style.footerText}>Terms Of Use   .   Terms Of Sale   .   Privacy Policy</Text>
                <Text style={style.footerText}>Warranyy Policy   .   Return Policy   .   Sell with us</Text>
                <Text style={{ fontSize:10, marginVertical: 10,color:"lightgrey" }}>Version 3.57 (1214)</Text>
                <Text style={style.footerText}>{'\u00A9'} 2022 noon.com All rights reserved.</Text>
            </View>

        </View>

    )
}

export default Myaccount;
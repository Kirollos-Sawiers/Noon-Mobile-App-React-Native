import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home/Home'
import Category from './../Screens/Categories/Category';
import Summerstore from './../Screens/Summerstore/Summerstore';
import Myaccount from './../Screens/Myaccount/Myaccount';
import Cart from './../Screens/Cart/Cart';
import Signinform from './../Screens/sign-in-up-forms/signinform';
import Homeicon from "../../assets/Navigationicons/home-inactive.svg"
import Categoryicon from "../../assets/Navigationicons/categories-inactive.svg"
import Smileicon from "../../assets/Navigationicons/smile-inactive.svg"
import Accounticon from "../../assets/Navigationicons/account-inactive.svg"
import Carticon from "../../assets/Navigationicons/cart-inactive.svg"
import { View, Text} from 'react-native';
import style from "./tabsStyle";
const Tab = createBottomTabNavigator();

const Tabs = () => {

    return (
        <Tab.Navigator style={{display: 'flex', flexDirection: 'column'}}>
            <Tab.Screen name="Home" component={Home}
                options={{
                headerShown: false,
                    tabBarLabel: '',
                    tabBarIcon: ({ focused, vertical }) => (
                        <View style={style.Container}>
                            <Homeicon width={20} height={20} fill={focused ? '#ffe600':''} />
                            <Text style={style.text}>Home</Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen name="Category" component={Category}
             options={{
                headerShown: false,
                tabBarLabel: '',
                tabBarIcon: ({ focused }) => (
                    <View style={style.Container}>
                        <Categoryicon width={20} height={20} fill={focused ? '#ffe600':''} />
                        <Text style={style.text}>Categories</Text>
                    </View>
                ),
            }}
            />
            <Tab.Screen name="Summerstore" component={Summerstore}
            options={{
                headerShown: false,
                tabBarLabel: '',
                tabBarIcon: ({ focused }) => (
                    <View style={style.Container}>
                        <Smileicon width={20} height={20} fill={focused ? '#ffe600':'#ff930d'} />
                        <Text style={style.text}>Summer Store</Text>
                    </View>
                ),
            }}
            />
            <Tab.Screen name="Myaccount" component={Myaccount}
            options={{
                headerShown: false,
                tabBarLabel: '',
                tabBarIcon: ({ focused }) => (
                    <View style={style.Container}>
                        <Accounticon width={20} height={20} fill={focused ? '#ffe600':''} />
                        <Text style={style.text}>My Account</Text>
                    </View>
                ),
            }}
            />
            <Tab.Screen name="Cart" component={Cart}
             options={{
                headerShown: false,
                tabBarLabel: '',
                tabBarIcon: ({ focused }) => (
                    <View style={style.Container}>
                        <Carticon width={20} height={20} fill={focused ? '#ffe600':''} />
                        <Text style={style.text}>Cart</Text>
                    </View>
                ),
            }}
            />
        </Tab.Navigator>

    )

};

export default Tabs;
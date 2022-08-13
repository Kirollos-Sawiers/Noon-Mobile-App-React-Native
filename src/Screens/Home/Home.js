import React, { useState } from "react";
import { Text, View, Image, ScrollView } from "react-native";
import { Searchbar } from 'react-native-paper';
import style from "./Homestyle";
import Logo from "../../../assets/svg/noon-logo-en.svg";
// import {Carousel} from 'react-native-snap-carousel'


function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = query => setSearchQuery(query);

    return (
        <View>
            <View style={style.container}>

            <Logo width={72} height={20} fill={"black"} style={style.noonLogo}/>
                <Searchbar
                    placeholder="What are you looking for?"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    style={style.searchBar}
                />


            </View>
            <Image
                source={{
                    uri: 'https://k.nooncdn.com/cms/pages/20220711/c0fcf46593a74ab27356e1580aba5195/en_mb_eg-toggle-01.png',
                }}
                style={style.sahelBanner}
            />
            
            {/* <ScrollView */}
            {/* // scrollEventThrottle={16} */}
            {/* > */}
            <View style={{ width: '100%', height: '100%' }}>
                <Image
                    source={{
                        uri: 'https://k.nooncdn.com/cms/pages/20220629/95b15e24d16b1b2ca22d1c64ce39d88d/en_mb_eg-CB-15.png',
                    }}
                    style={style.avatarLogo}
                />
            </View>

            {/* </ScrollView> */}

        </View>
    )
}

export default Home;
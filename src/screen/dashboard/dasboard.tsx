//@ts-nocheck
import React, { createRef, useEffect, useState, useRef } from 'react'
import {
  View, Text, FlatList, StyleSheet, Image, ScrollView,
  Dimensions, TouchableOpacity, SafeAreaView,
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native'
import { capitalizeFirstLetter, getUUIDV4, scaledSize, searchPlace } from '../../helper/util/Utilities';
import { Theme } from '../../utilits/GlobalColors';
import { Searchbar } from "react-native-paper"
import { styles } from './dashboardStyle'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductsInitiate } from './DashboardActions';
import {
  filterIcon, locationPin, mainMenu, profile, searchPin,
  bgImage,
  house1, house2, heart1, heart2, drawer, mapIcon, downArrow, bell,
  car, apartment, mcycle, suitcase, smartp, locationView, sliderImage, house, drawerMenu, starIcon
} from '../../utilits/GlobalImages';
import { useIsFocused } from "@react-navigation/core";
import Carousel from 'react-native-reanimated-carousel';
import { CONSTANT } from '../../utilits/Constants';
import axios from 'axios';
import Debounce from '../../utilits/Debounce';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Fonts } from '../../utilits/GlobalAssets';
const width = Dimensions.get('window').width;



const DashboardScreen = ({ navigation, route }) => {
  const [search, setSearch] = useState('')
  const [modalData, setModalData] = useState([
    { type: 'home', address: 'vijay nagar', id: 1, image: house, rating: 4, price: 4000000, room: 2, floor: 2 },
    { type: 'office', address: 'plasiya', id: 2, image: house, rating: 4, price: 4000000, room: 2, floor: 2 },

  ])
  const [isLoading, setIsLoading] = useState(false)
  const [cartItems, setItems] = useState(false)
  const [COLORS, setCOLORS] = useState('Blue')
  const [scrollLoad, setScrollLoad] = useState(false)
  const [colorLoad, setColorLoad] = useState(false)
  const [pageNumber, setPage] = useState(1)
  const dispatch = useDispatch();
  const productsResponce = useSelector((state: any) => state.DashboardReducer)
  const LoadProductsResponce = useSelector((state: any) => state.DashboardReducer)
  const isFocused = useIsFocused();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const value = async () => {
    let values = await Theme()
    setCOLORS(values)
    setTimeout(() => {
      setColorLoad(false)
    }, 1500);
  }

  useEffect(() => {
    setColorLoad(true)
    value()
    setIsLoading(false)
    setIsLoading(false)
    setScrollLoad(false)

  }, [productsResponce, isFocused])

  useEffect(() => {
    //Debounce(searchPlace(search),200)
    // const data = searchPlace('indore')
    // console.log('data================================', data);

  })


  const renderItem3 = (item: any, index: number) => {
    return (
      <View style={{
        backgroundColor: 'white', elevation: 5,
        height: scaledSize(220), paddingTop: scaledSize(6),
        borderRadius: 20, marginRight: scaledSize(5), width: scaledSize(200),
        marginBottom: scaledSize(8), borderWidth: 1,
        borderColor: COLORS.borderBottomColor,
      }} key={index}>
        {/* <TouchableOpacity onPress={() => { navigation.navigate('searchProductDetails', { data: item }) }} style={styles.productView}> */}
        {/* <TouchableOpacity onPress={() => { navigation.navigate('ProductDetails', { data: item }) }} style={styles.productView}> */}
        <TouchableOpacity onPress={() => { navigation.navigate('ProductList', { data: item }) }} style={{ backgroundColor: 'white' }}>

          <Image source={house}
            style={{
              width: scaledSize(190), height: scaledSize(140),
              borderRadius: scaledSize(20), alignSelf: 'center',
            }} ></Image>
          <TouchableOpacity onPress={() => { }} style={{ position: 'absolute', right: scaledSize(15), top: scaledSize(10) }}>
            <Image source={mapIcon} style={{ width: scaledSize(20), height: scaledSize(20) }} />
          </TouchableOpacity>



        </TouchableOpacity>
        
        <View style={{ width: '96%', height: '30%',backgroundColor: 'white',alignSelf:'center' }}>
          <View style={{ height: scaledSize(50), flexDirection: 'row' }}>
            <View style={{flex: 1, justifyContent: "flex-start", alignItems: 'flex-start',}}>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ width: scaledSize(20), height: scaledSize(20),left:scaledSize(10) }} source={mapIcon} resizeMode='contain' />
                <Text style={{ marginLeft: scaledSize(10), color: 'black', fontFamily: Fonts.PTSerifBold, letterSpacing: 1,left:scaledSize(4) }}>{capitalizeFirstLetter(item.address)}</Text>
              </View>
            </View>
           

          </View>
          <View style={{ height: 20 ,flexDirection:'row',}}>
            <Text style={{ fontFamily: Fonts.bold,left:scaledSize(12),width:scaledSize(132) }}>{`Price/₹${item.price}`}</Text>
            <View style={{
             width:50, justifyContent: 'flex-end', alignItems: 'flex-end',
              flexDirection: 'row', right: scaledSize(0),backgroundColor:'white'
            }}>
              <Image style={{ width: scaledSize(16), height: scaledSize(16), right: scaledSize(4), bottom: scaledSize(2) }} source={starIcon} resizeMode='contain' />
              <Text style={{ fontFamily: Fonts.PTSerifBold, color: 'black' }}>4.8</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  const onEndData = async (index: any) => {
    //if(pageNumber > 2) return
    setPage(pageNumber + 1)
    setScrollLoad(true)
    dispatch(getAllProductsInitiate(pageNumber))
    console.log(index, "true")
  }

  const footerLoader = () => {
    if (!scrollLoad) return null
    return (
      <View style={{ paddingVertical: scaledSize(50) }}>
        <ActivityIndicator color='red' style={{ bottom: scaledSize(40) }} animating size={'large'} />
      </View>
    )
  }
  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };


  return (
    <ScrollView style={{ flex: 1, }} showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, backgroundColor: 'white', }}>
        {/* ******************************Header Start******************************** */}
        <View style={{
          height: scaledSize(70), marginTop: scaledSize(30),
          flexDirection: 'row',
          justifyContent: 'flex-start', alignItems: 'flex-start'
        }}>

          <View style={{
            flex: 1, justifyContent: 'center',
            alignItems: 'flex-start', flexDirection: 'row',
          }}>

            <TouchableOpacity style={{ flex: .7, justifyContent: 'center', alignItems: 'center', }}
              onPress={async () => { navigation.navigate('Account') }}>
              <Image source={drawerMenu}
                resizeMode='contain'
                style={{
                  height: scaledSize(30), width: scaledSize(30),
                  borderRadius: scaledSize(40), right: scaledSize(10), top: scaledSize(10)
                }}
              />
            </TouchableOpacity>
            <View>
              <Text style={[styles.dashboardAddressText, { marginLeft: scaledSize(30), fontFamily: Fonts.PTSerifBold }]}>Current Location</Text>
              <View style={[{ flex: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }]}>
                <Image style={{ height: scaledSize(16), width: scaledSize(16), top: scaledSize(3), right: scaledSize(4) }}
                  resizeMode='contain' source={mapIcon} />
                <Text style={[styles.dashboardAddressText, { fontFamily: Fonts.regular }]}>WashingTon, New York</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={{ flex: .3, alignItems: 'center', justifyContent: 'flex-start', height: scaledSize(100) }}
            onPress={async () => { navigation.navigate('Account') }}>
            <Image source={profile}
              resizeMode='contain'
              style={{ height: scaledSize(50), width: scaledSize(50), borderRadius: scaledSize(50) }}
            />
          </TouchableOpacity>
        </View>
        {/* ******************************Header End******************************** */}

        {/* ******************************Search Start******************************** */}
        <View style={{
          height: scaledSize(70), flexDirection: 'row',
          justifyContent: "center", alignItems: 'center',
        }}>
          <ScrollView onScroll={() => setDropdownOpen(false)}>

            <AutocompleteDropdown
              flatListProps={{
                showsVerticalScrollIndicator: false,
                showsHorizontalScrollIndicator: false,
              }}
              onFocus={toggleDropdown}
              onBlur={toggleDropdown}
              isOpen={isDropdownOpen}
              onChangeText={(v) => {
                console.log('v', v)
                // const data = searchPlace(v)
                // console.log('data====',data);

              }}
              closeOnSubmit={true}
              // inputHeight={42}
              inputContainerStyle={{
                height: scaledSize(50), backgroundColor: 'white',
                borderWidth: 1, borderColor: '#E0DFE4',
                borderRadius: scaledSize(40),
              }}
              showChevron={false}
              textInputProps={{
                placeholder: 'Type 3+ letters (dolo...)',
                autoCorrect: false,
                autoCapitalize: 'none',

                style: {
                  borderRadius: scaledSize(25),
                  color: 'red',
                  paddingLeft: scaledSize(18),
                },
              }}
              suggestionsListTextStyle={{ fontSize: scaledSize(20) }}
              containerStyle={{ paddingLeft: scaledSize(10), paddingRight: scaledSize(10), height: scaledSize(50), }}
              textInputProps={{ placeholder: 'search', fontSize: scaledSize(20), top: scaledSize(4), }}
              sty
              //   RightIconComponent={<Image source={profile}
              //   resizeMode='contain'
              //   style={{ height: 50, width: 50, borderRadius: 50 }}
              // />}
              // rightButtonsContainerStyle={{top:4}}
              // initialValue={{ id: '2' }} // or just '2'
              onSelectItem={setSelectedItem}
              dataSet={[
                { id: '1', title: 'Alpha' },
                { id: '2', title: 'Beta' },
                { id: '3', title: 'Gamma' },
                { id: '93', title: 'Gamma' },
                { id: '03', title: 'Gamma' },
                { id: '39', title: 'Gamma' },
              ]}
            />
            {/* <Searchbar/> */}
          </ScrollView>
          <View style={{ flex: .3, justifyContent: 'center', alignItems: 'center' }}>
            <Image style={{ height: scaledSize(30), width: scaledSize(30), }}
              resizeMode='contain' source={mapIcon} />
          </View>
        </View>
        {/* ******************************search End******************************** */}

        {/* ****************************** Carousal  Start******************************** */}

        {/* <View style={{ flex: .43, width: '90%',
          alignSelf:'center',top:10,borderWidth:0, 
          elevation:4,borderRadius:10,backgroundColor:'white'
          }}> */}
        {/* <View style={{height:100,backgroundColor:'red'}}>

</View> */}
        <Carousel

          loop
          width={width}
          height={scaledSize(300)}
          autoPlay={false}
          data={modalData}
          scrollAnimationDuration={1000}
          onSnapToItem={(index) => console.log('current index:', index)}
          renderItem={({ item }) => (

            <TouchableOpacity style={{
              height: scaledSize(264), width: '90%',
              alignSelf: 'center', borderWidth: 0, top: scaledSize(10),
              elevation: 4, borderRadius: scaledSize(10),
              backgroundColor: 'white', justifyContent: 'center', alignContent: 'center'
            }} onPress={() => alert(item.id)}>
              <Image style={{ width: scaledSize(310), height: scaledSize(200), top: scaledSize(20), alignSelf: 'center' }} source={item.image} resizeMode='contain' />

              <View style={{ width: '100%', height: '38%', top: scaledSize(10), left: scaledSize(6) }}>
                <View style={{ height: scaledSize(50), flexDirection: 'row' }}>
                  <View style={{
                    flex: 1, justifyContent: "flex-start", alignItems: 'flex-start',

                  }}>
                    {/* <Text style={{ color: 'black', fontFamily: Fonts.bold, left: scaledSize(28), }}>{capitalizeFirstLetter(item.type)}</Text> */}
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Image style={{ width: scaledSize(20), height: scaledSize(20), }} source={mapIcon} resizeMode='contain' />
                      <Text style={{ marginLeft: scaledSize(10), color: 'black', fontFamily: Fonts.PTSerifBold, letterSpacing: 1 }}>{capitalizeFirstLetter(item.address)}</Text>
                    </View>
                  </View>
                  <View style={{
                    flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end',
                    flexDirection: 'row', right: scaledSize(10)
                  }}>
                    <Image style={{ width: scaledSize(16), height: scaledSize(16), right: scaledSize(4), bottom: scaledSize(2) }} source={starIcon} resizeMode='contain' />
                    <Text style={{ fontFamily: Fonts.PTSerifBold, color: 'black' }}>4.8</Text>
                  </View>

                </View>
                <View style={{ height: 20, width: '100%' }}>
                  <Text style={{ fontFamily: Fonts.bold }}>{`Price/₹${item.price}`}</Text>
                </View>
              </View>
            </TouchableOpacity>

          )}
        />

        {/* </View> */}
        {/* ****************************** Carousal  End******************************** */}

        {/* ****************************** Property type  start******************************** */}

        {/* <View style={{ marginTop: scaledSize(-10), 
           width: width, backgroundColor: COLORS.white,marginLeft:14,}} > */}

        <Text style={{ left: scaledSize(10), color: COLORS.themeBlue, fontSize: scaledSize(19), top: scaledSize(10), marginBottom: scaledSize(30) }}>Fresh recommendations</Text>
        <ScrollView style={{ backgroundColor: 'white', }} horizontal>
          <View style={{ flexDirection: 'row', left: scaledSize(15), paddingRight: scaledSize(15) }}>

            {modalData.map((item, index) => renderItem3(item, index))}
          </View>
          {/* <FlatList
                data={modalData}
                //extraData={modalData}
                numColumns={2}
                //nestedScrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => 'key' + index}
                renderItem={({ item, index }) => renderItem3(item, index)}
                onEndReachedThreshold={0.5}
                //onEndReached={(index)=>onEndData(index)}
                ListFooterComponent={() => footerLoader()}
              /> */}
        </ScrollView>
        {/* </View> */}

        {/* ****************************** Property type  End******************************** */}






      </View>


<View style={{height:100}}>

</View>
    </ScrollView>


  )

}

export default DashboardScreen

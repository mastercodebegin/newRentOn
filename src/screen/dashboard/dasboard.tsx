//@ts-nocheck
import React, { createRef, useEffect, useState, useRef } from 'react'
import {
  View, Text, FlatList, StyleSheet, Image, ScrollView,
  Dimensions, TouchableOpacity, SafeAreaView,
  ActivityIndicator,
  ImageBackground
} from 'react-native'
import { scaledSize } from '../../helper/util/Utilities';
import { Theme } from '../../utilits/GlobalColors';
import { Searchbar } from "react-native-paper"
import { styles } from './dashboardStyle'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductsInitiate } from './DashboardActions';
import {
  filterIcon, locationPin, mainMenu, profile, searchPin,
  bgImage,
  house1, house2, heart1, heart2, drawer, mapIcon, downArrow, bell,
  car, apartment, mcycle, suitcase, smartp, locationView, sliderImage, house
} from '../../utilits/GlobalImages';
import { useIsFocused } from "@react-navigation/core";
import Carousel from 'react-native-reanimated-carousel';

const width = Dimensions.get('window').width;



const DashboardScreen = ({ navigation, route }) => {
  const [search, setSearch] = useState('')
  const [modalData, setModalData] = useState([{ first_name: 'Dashboard', last_name: 'Dashboard', id: 2, image: house }, { first_name: 'Dashboard', last_name: 'Dashboard', id: 2, image: house }])
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




  const renderItem3 = (item: any, index: number) => {
    return (
      <View style={{ backgroundColor: COLORS.white, elevation: 5, height: scaledSize(260), paddingTop: scaledSize(6), borderRadius: 4, marginRight: scaledSize(5), marginBottom: scaledSize(8), borderWidth: 1, borderColor: COLORS.borderBottomColor }}>
        <TouchableOpacity onPress={() => { navigation.navigate('ProductDetails', { data: item }) }} style={styles.productView}>

          <Image source={index % 2 == 0 ? house : house} resizeMethod='resize'
            resizeMode='cover' style={{ width: '100%', height: scaledSize(140), borderRadius: scaledSize(2) }} />
          <TouchableOpacity onPress={() => {
            cartItems ? setItems(false) : setItems(true)

          }} style={{ position: 'absolute', right: scaledSize(15), top: scaledSize(10) }}>
            <Image source={cartItems ? heart2 : heart1} style={{ width: scaledSize(20), height: scaledSize(20) }} />
          </TouchableOpacity>

          <View style={{ marginLeft: scaledSize(20) }}>

            <Text style={[styles.card1Text, { fontSize: scaledSize(17), color: COLORS.themeBlue }]}>&#x20B9; {`${parseFloat(5436500 * item.id).toFixed(0)}`}</Text>
            <Text style={[styles.card1Text, { fontSize: scaledSize(14), top: scaledSize(13), color: COLORS.themeBlue }]}>{`2 - BHK FLAT, ${item.first_name.slice(0, 6) + '...'}`}</Text>
            <Text style={[styles.card1Text, { fontSize: scaledSize(14), top: scaledSize(16), color: COLORS.themeBlue }]}>{`2 Bds - 2 Ba - ${123 * item.id} ft2`}</Text>
            <Image source={mapIcon} resizeMode='contain' style={[styles.card1LocationPin]} />
            <Text style={{ position: 'absolute', fontSize: scaledSize(12), color: COLORS.grey, bottom: scaledSize(-42), left: scaledSize(7), letterSpacing: .5 }}>{`${(item.last_name + ' Nagar Society').slice(0, 14) + '....'}`}</Text>
          </View>

        </TouchableOpacity>
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

  return (
    <SafeAreaView style={styles.mainView}>

      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: COLORS.lightGreen, borderBottomWidth: 2, borderBottomColor: '#eff2f3' }}>
            <View style={styles.dashboardView2}>


              <Image style={{ height: scaledSize(22), width: scaledSize(22), position: 'absolute', left: scaledSize(0), top: scaledSize(27) }} resizeMode='contain' source={mapIcon} />
              <Text style={[styles.dashboardAddressText, {
                left: scaledSize(30),
                top: scaledSize(29), color: COLORS.themeBlue
              }]}>WashingTon, New York</Text>

            </View>
            <TouchableOpacity style={{ position: 'absolute', right: scaledSize(20), top: scaledSize(25) }} onPress={async () => { navigation.navigate('Account') }}>
              <Image source={profile}
                resizeMode='contain'
                style={styles.dashboardProfileImage}
              />
            </TouchableOpacity>

          <View style={styles.searchBarView}>
            <Searchbar
              placeholder="Find Cars, Mobile Phones.."
              placeholderTextColor={COLORS.placeHolderTextColor}
              style={{
                width: width - scaledSize(60), marginTop: scaledSize(75),
                marginBottom: scaledSize(-10), borderRadius: scaledSize(6), marginLeft: scaledSize(30)
              }}
              inputStyle={{ fontSize: scaledSize(14), left: scaledSize(-10) }}
              onChangeText={(value: any) => setSearch(value)}
              value={search}
            />

          </View>

          <Text>{''}</Text>
          <Text>{''}</Text>
        </View>






        {/* <View style={[ {  backgroundColor: '#fff', padding: scaledSize(5) }]}>
            <TouchableOpacity onPress={() => navigation.navigate('AllList')} 
            style={{ right: 10, position: 'absolute', margin: scaledSize(8), top: scaledSize(-2), zIndex: 1 }}>
              <Text style={{ color: COLORS.themeBlue }}>View All</Text>
            </TouchableOpacity>
          </View> */}




        {/* <View style={{ marginTop: scaledSize(-10), alignItems: 'center', width: width, backgroundColor: COLORS.white }}>

            <View style={{ backgroundColor: COLORS.white }}>
              <Text style={{ left: scaledSize(10), color: COLORS.themeBlue, fontSize: scaledSize(19), top: scaledSize(10), marginBottom: scaledSize(30) }}>Fresh recommendations</Text>
              <FlatList
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
              />
            </View>

          </View> */}
        <View style={{ flex: 1, backgroundColor:'FAF9F6', width:'96%' }}>

          <Carousel
            loop
            width={width}
            height={300}
            autoPlay={false}
            data={modalData}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => console.log('current index:', index)}
            renderItem={({ item }) => (
              <View
                style={{
                  flex: 1, 
                  // justifyContent: 'center',
                  //backgroundColor: 'purple',
                   alignItems: 'center',
                   top:6
                }}
              >
                <View style={{ flex:1, width: '96%' }}>
                  <ImageBackground style={{
                    width: '96%', flex: 1, alignSelf: 'center',
                    marginLeft: scaledSize(16),
                  }} source={item.image} imageStyle={{ borderRadius: 10, }}>

                  </ImageBackground>
                  <View style={{backgroundColor:'white',flex:.4}}>
                <Text>{item.first_name}</Text>
                <Text>{item.first_name}</Text>
              <Text>{item.first_name}</Text>

                </View>
                </View>
              </View>
            )}
          />

        </View>
      </View>



    </SafeAreaView>
  )

}

export default DashboardScreen

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
import { getUUIDV4, scaledSize, searchPlace } from '../../helper/util/Utilities';
import { Theme } from '../../utilits/GlobalColors';
import { Searchbar } from "react-native-paper"
import { styles } from './dashboardStyle'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductsInitiate } from './DashboardActions';
import {
  filterIcon, locationPin, mainMenu, profile, searchPin,
  bgImage,
  house1, house2, heart1, heart2, drawer, mapIcon, downArrow, bell,
  car, apartment, mcycle, suitcase, smartp, locationView, sliderImage, house, drawerMenu
} from '../../utilits/GlobalImages';
import { useIsFocused } from "@react-navigation/core";
import Carousel from 'react-native-reanimated-carousel';
import { CONSTANT } from '../../utilits/Constants';
import axios from 'axios';
import Debounce from '../../utilits/Debounce';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const width = Dimensions.get('window').width;



const DashboardScreen = ({ navigation, route }) => {
  const [search, setSearch] = useState('')
  const [modalData, setModalData] = useState([
    { first_name: 'Sherman Oaks', address: 'Dashboard', id: 2, image: house,rating:4,price:400,room:2,floor:2 }, 
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
  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };


  return (
      <View style={{ flex: 1,  }}>
        <View style={{ flex: 1,backgroundColor:'white', }}>
          {/* ******************************Header Start******************************** */}
          <View style={{
            flex: .11, marginTop: scaledSize(30),
            flexDirection: 'row',
             justifyContent: 'center', alignItems: 'center'
          }}>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

              <TouchableOpacity style={{ flex: .7, justifyContent: 'center', alignItems: 'center', }}
                onPress={async () => { navigation.navigate('Account') }}>
                <Image source={drawerMenu}
                  resizeMode='contain'
                  style={{
                    height: scaledSize(30), width: scaledSize(30),
                    borderRadius: scaledSize(40), right: scaledSize(10)
                  }}
                />
              </TouchableOpacity>
              <View>
                <Text style={[styles.dashboardAddressText, { marginLeft: 30 }]}>Current Location</Text>
                <View style={[{ flex: 1, flexDirection: 'row' }]}>
                  <Image style={{ height: scaledSize(16), width: scaledSize(16), top: scaledSize(3), right: scaledSize(4) }}
                    resizeMode='contain' source={mapIcon} />
                  <Text style={[styles.dashboardAddressText]}>WashingTon, New York</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity style={{ flex: .3, justifyContent: 'center', alignItems: 'center' }}
              onPress={async () => { navigation.navigate('Account') }}>
              <Image source={profile}
                resizeMode='contain'
                style={{ height: 50, width: 50, borderRadius: 50 }}
              />
            </TouchableOpacity>
          </View>
          {/* ******************************Header End******************************** */}

          {/* ******************************Search Start******************************** */}
          <View style={{ flex: .1, flexDirection: 'row',
           marginTop: 10,}}>
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
                  height: 50, backgroundColor: 'white',
                  borderWidth: 1, borderColor: '#E0DFE4', borderRadius: 40,
                }}
                showChevron={false}
                textInputProps={{
                  placeholder: 'Type 3+ letters (dolo...)',
                  autoCorrect: false,
                  autoCapitalize: 'none',

                  style: {
                    borderRadius: 25,
                    color: 'red',
                    paddingLeft: 18,
                  },
                }}
                suggestionsListTextStyle={{ fontSize: 20 }}
                containerStyle={{ paddingLeft: 10, paddingRight: 10, height: 50, }}
                textInputProps={{ placeholder: 'search', fontSize: 20, top: 4, }}
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
            </ScrollView>
            <View style={{ flex: .3, justifyContent: 'center', alignItems: 'center' }}>
              <Image style={{ height: scaledSize(30), width: scaledSize(30), }}
                resizeMode='contain' source={mapIcon} />
            </View>
          </View>
          {/* ******************************search End******************************** */}

          {/* ****************************** Carousal  Start******************************** */}
      
          <View style={{ flex: .43, width: '90%',
          alignSelf:'center',top:10,borderWidth:0, 
          elevation:4,borderRadius:10,backgroundColor:'white'
          }}>

          <Carousel
              loop
              width={width}
              height={300}
              autoPlay={false}
              data={modalData}
              scrollAnimationDuration={1000}
              onSnapToItem={(index) => console.log('current index:', index)}
              renderItem={({ item }) => (
                
                  <View style={{  
                    width: '90%', 
                    
                    height:'100%',
                     justifyContent:'center',
                    alignItems:'center',
                    // borderColor:'#000'
                   
                    
                   }}>
                    <Image style={{width: '96%',height:200,bottom:0}} source={item.image} resizeMode='contain'/>
                   
                    <View style={{ width:'100%',height:'30%', }}>
                      <View style={{height:50,flexDirection:'row'}}>
                      <View style={{flex:1,justifyContent:"flex-start",alignItems:'flex-start',marginLeft:8}}>
                      <Text style={{color:'black'}}>{item.first_name}</Text>
                      <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                      <Image style={{width: 20,height:20,}} source={mapIcon} resizeMode='contain'/>
                      <Text style={{marginLeft:10,color:'black'}}>{item.first_name}</Text>
                      </View>
                      </View>
                      <View style={{flex:1,justifyContent:'flex-end',alignItems:'flex-end',flexDirection:'row',right:4}}>
                      <Image style={{width: 20,height:20,}} source={mapIcon} resizeMode='contain'/>
                      <Text style={{color:'black'}}>4.9</Text>
                      </View>
                      </View>

                    </View>
                  </View>
               
              )}
            />

          </View>
          {/* ****************************** Carousal  End******************************** */}





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

        </View>

     

      </View>
    

  )

}

export default DashboardScreen

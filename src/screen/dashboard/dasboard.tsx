//@ts-nocheck
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createRef, useEffect, useState, useRef } from 'react'
import {
  View, Text, FlatList, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, TouchableNativeFeedback,
  StatusBar, ActivityIndicator, Animated, SafeAreaView, Modal
} from 'react-native'
import { scaledSize } from '../../helper/util/Utilities';
import { COLORS, Fonts } from '../../utilits/GlobalAssets';
import { Searchbar } from "react-native-paper"
import { styles } from './dashboardStyle'
import Icon from "react-native-vector-icons/FontAwesome";
import {
  black, bulb, cal, cement, drawerMenu, dresses, flash, girl, green, king, locationPin,
  mobile, slide1, slide2, suite, superGirl, swipe4, top, watch, watch2, searchIcon, arrowLeftIcon
} from '../../utilits/GlobalImages';
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductsInitiate, getTopSoldProductsInitiate } from './DashboardActions';
import { FlatListSlider } from 'react-native-flatlist-slider';
import LinearGradient from 'react-native-linear-gradient';
import { useRoute } from '@react-navigation/native';
import { getData, getTopSoldProducts, searchProduct, } from './DashBoardSlice';
import { clearOrderState } from '../orderDetails/OrderSlice';
import { getProductById, makeProductFlagFalse } from '../productList/ProductsSlice';


const width = Dimensions.get('window').width;


const images = [
  {
    image: slide1,
    desc: 'Silent Waters in the mountains in midst of Himilayas',
  },
  {
    image: slide2,
    desc:
      'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
]





interface MyProps {
  search: any;
  //filterTabs:any;
  modalData: any;
  screenPosition: any;
  productsData: any;
  scrollLoad: boolean;


};

interface MyState {
  search: any;
  filterTabs: any;
  modalData: any
  navigation: any

};

const utilities = [
  { id: "1", isSelected: '3 minutes', name: 'Top Categories', image: top },
  { id: "2", isSelected: '15 minutes', name: 'Brands', image: bulb },
  { id: "3", isSelected: '4 minutes', name: 'Top Sellers', image: king },
  { id: "4", isSelected: '20 minutes', name: 'Todays Deal', image: cal },
  { id: "5", isSelected: '18 minutes', name: 'Flash Deal', image: flash }
]

const categories = [
  { id: "1", isSelected: '3 minutes', name: 'Clothing & Fashion', image: superGirl, price: '$25.00', },
  { id: "2", isSelected: '15 minutes', name: 'Mobile Phones', image: mobile, price: '$25.00', },
  { id: "3", isSelected: '4 minutes', name: 'Women Watch', image: watch, price: '$25.00', },
  { id: "4", isSelected: '20 minutes', name: 'Women Dress', image: girl, price: '$25.00', },
]



const products = [
  { id: "1", price: '25.00', name: 'Apple Watch', qty: 1, image: watch2 },
  { id: "2", price: '150.00', name: 'black Suite', qty: 1, image: suite },
  {
    id: "3", price: '1200.00', name: 'Iphone X', qty: 1, image: mobile, ram: 4, varient: [
      {
        ram: 4,
        colors: ['red'],
        isSelected: true,
        price: '1200.00'
      },
      {
        ram: 6,
        colors: ['purple'],
        isSelected: false,
        price: '1500.00'
      },
      {
        ram: 8,
        colors: ['green'],
        isSelected: false,
        price: '1800.00'
      }
    ]
  },
  { id: "4", price: '90.00', name: 'Black Dress', qty: 1, image: dresses },
  { id: "5", price: '200.00', name: 'Olive Suite', qty: 1, image: green },
  { id: "6", price: '180.00', name: 'Casual Suite', qty: 1, image: cement },
]



const extraProducts = [
  { id: "4", price: '90.00', name: 'Black Dress', image: dresses },
  { id: "1", price: '25.00', name: 'Apple Watch', image: watch2 },
  { id: "5", price: '200.00', name: 'Olive Suite', image: green },
  { id: "2", price: '150.00', name: 'black Suite', image: suite },
  { id: "6", price: '180.00', name: 'Casual Suite', image: cement },
  { id: "3", price: '120.00', name: 'Blazzer Men', image: black },
]



export default Dashboard = ({ navigation }) => {
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])

  const [modalData, setModalData] = useState({})
  const [productsData, setProductsData] = useState(products)
  const [screenPosition, setPosition] = useState(0)
  const [scrollLoad, setLoad] = useState(false)
  const dispatch = useDispatch();
  const route = useRoute();
  const DashboardReducer = useSelector((state: any) => state.DashBoardSlice)
  const productDetails = useSelector((state: any) => state.ProductsSlice)


  useEffect(() => {
    console.log('productDetails-------', DashboardReducer);

    if(productDetails.isSingleProduct)
    {
      navigation.navigate('searchProductDetails',{data:productDetails.singleProductDetails})
      dispatch(makeProductFlagFalse())

    }

  })

  const renderItem = (item: any, index: number) => {
    return (<TouchableOpacity onPress={() => { navigation.navigate('ProductDetails', { data: item }) }}>
      <View style={[styles.productView, { alignItems: 'center', width: width - scaledSize(230), alignSelf: 'center' }]}>
        <Image resizeMethod='resize' resizeMode='contain' source={item.image} style={styles.productImage} />
        <Text style={styles.productName}>
          {item.name}</Text>
        <Text style={styles.productPrice}>
          $ {item.price}</Text>
      </View>

    </TouchableOpacity>
    )
  }

  const getProductDetailsHandler=(id)=>{
    dispatch(getProductById({'productId':id}))
  }

  const renderSearchedProduct=(item)=>{
    return <TouchableOpacity style={styles.searchStyle}
    onPress={()=> getProductDetailsHandler(item.id)}>
   <View style={styles.searchBarView}>
  <Text style={styles.searchResulText}>{item.name}</Text>
  </View>
  </TouchableOpacity>
  }

  searchProductHandler = value => {
    setSearch(value)
    dispatch(searchProduct(
      { 'keyword': value }
    ))
  }

  return (
    <SafeAreaView style={[styles.mainView]}>
      <StatusBar backgroundColor={'#88dbe3'} />
      <View style={[styles.searchBarView,
      {
        height: scaledSize(80), width: '100%',
        justifyContent: 'center',
      }]}>
        {/************************ Search modal window start *********** */}

        {/************************ Search modal window End *********** */}
        <LinearGradient colors={['#88dbe3', '#88dbe3', '#74d5bb']} style={[styles.linearGradient, {
          flexDirection: 'row',
          justifyContent: 'flex-start', alignItems: 'center', height: scaledSize(120),
          width: '100%'
        }]} >
          {route.name == 'Home' ? <TouchableOpacity
            onPress={() => alert('working on')}
            // onPress={() => navigation.openDrawer()}
            style={{ right: scaledSize(10) }}

          >
            <Image source={drawerMenu} style={[,
              {
                tintColor: 'white',
                height: scaledSize(30),
                width: scaledSize(30)
              }]} resizeMode='contain' />
          </TouchableOpacity> :
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ bottom: scaledSize(6), right: 10 }}
            >
              <Image source={arrowLeftIcon} style={[, { tintColor: 'white', height: 30, width: 30 }]} resizeMode='contain' />
            </TouchableOpacity>}
          <Searchbar
            //lightTheme
            //searchIcon={{ size: 20, color: COLORS.borderBottomColor }}
            //disableFullscreenUI
            placeholder="Search.."
            placeholderTextColor={COLORS.placeHolderTextColor}
            style={{
              width: scaledSize(280),
              height: scaledSize(44),
              borderRadius: scaledSize(6),

            }}
            inputStyle={{ fontSize: scaledSize(18) }}
            //containerStyle={styles.searchContainerStyle}
            //inputContainerStyle={styles.searchInputStyle}
            // onIconPress={()=>navigation.navigate('ProductList')}
            // onKeyPress={()=>navigation.navigate('ProductList')}
            onChangeText={value => searchProductHandler(value)}
            value={search}
            icon={()=><Image source={searchIcon} style={{height:20,width:20}} resizeMode='contain' />}


          />

        </LinearGradient>
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      >
        {/* --------------------------------------------- Top categories view start---------------------------------------------- */}
        <View style={styles.scrollViewOptions}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {utilities.map((value: any, index: any) => {
              return <View style={{ flex: 1 }} key={index}>
                <TouchableOpacity onPress={() => {
                  navigation.navigate('CategoryDetails', { data: value })
                }}>
                  <View style={[styles.screen1Border9, { alignItems: 'center' }]}>
                    <Image resizeMethod='resize' resizeMode='contain' source={value.image} style={styles.scrollViewImageSize} />
                  </View>
                  <Text style={styles.screen1Border8}>
                    {value.name}</Text>
                </TouchableOpacity>

              </View>

            })}
          </ScrollView>
        </View>

        {/* --------------------------------------------- Top categories view End----------------------------------------- */}

        {/* --------------------------------------------- Slider  View Start---------------------------------------------- */}

        <View style={{ marginBottom: scaledSize(10), marginTop: scaledSize(22), }}>
          <FlatListSlider
            data={images}
            local
            width={width - scaledSize(30)}
            height={scaledSize(130)}
            timer={4500}
            separatorWidth={30}
            loop
            onPress={(item: any) => console.log(item)}
            contentContainerStyle={{ paddingHorizontal: 16, resideMode: 'cover' }}
            indicatorContainerStyle={{ position: 'absolute', bottom: scaledSize(10) }}
            indicatorActiveColor={'#8e44ad'}
            indicatorInActiveColor={'#ffffff'}
            indicatorActiveWidth={10}
            animation
          />
        </View>
        {/* --------------------------------------------- Slider  View End------------------------------------------------ */}



        {/* ---------------------------------------------  Featured Categories  View Start------------------------------------------------ */}

        <View style={styles.heading1View}>
          <View style={styles.heading1RowView1}>

            {/* <TouchableOpacity onPress={() => dispatch(clearOrderState())}> */}
            <TouchableOpacity onPress={() => dispatch(getTopSoldProducts({ 'pageSize': 10, 'pageNumber': 0 }))}>
              <Text style={[styles.heading1Text1, { color: '#6a6a6a' }]}>
                Featured Categories API</Text>
            </TouchableOpacity>
          </View>

        </View>

        <View style={styles.scrollViewOptions2}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {categories.map((value: any, index: any) => {
              return <View style={{ flex: 1 }} key={index}>
                <TouchableOpacity onPress={() => {
                  navigation.navigate('ProductList',)
                }}>
                  <View style={[styles.screen1Border11, { alignItems: 'center' }]}>
                    <Image resizeMethod='resize' resizeMode='contain' source={value.image} style={styles.scrollViewImageSize1} />
                    <Text style={styles.screen1Border12}>
                      {value.name}</Text>
                  </View>

                </TouchableOpacity>

              </View>

            })}
          </ScrollView>
        </View>
        {/* ---------------------------------------------  Featured Categories  View End------------------------------------------------ */}


        <View style={styles.heading1View}>
          <View style={styles.heading1RowView}>
            <TouchableOpacity onPress={() => dispatch(getUser())}>
              <Text style={[styles.heading1Text, { color: '#6a6a6a' }]}>
                Featured Products</Text>
            </TouchableOpacity>
          </View>

        </View>
        {/* <FlatList data={productsData}
          //indicatorStyle='black'
          style={{ alignSelf: 'center' }}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => 'key' + index}
          renderItem={({ item, index }) => renderItem(item, index)}
          onEndReachedThreshold={0.5}
        // onEndReached={() => this.onEndData()}
        // ListFooterComponent={()=> this.footerLoader()}
        /> */}
      </ScrollView>

      {search.length>0?<View style={{ height: 300, backgroundColor: 'white', position: 'absolute', 
      left: 8, right: 0, top: 70, bottom: 0,borderWidth:1,width:'96%',alignSelf:'center',
      borderTopWidth:0,
      borderColor:"#d3d3d3",
      borderRadius:8,
      zIndex:999
      }}>
       {DashboardReducer.searchData.length>0?
<FlatList
data={DashboardReducer.searchData}
renderItem={({item})=>renderSearchedProduct(item)}
/>:<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
  <Text>
  No result found please try with different keyword
  </Text>
  </View>}
      </View>:null}





    </SafeAreaView>
  )
}

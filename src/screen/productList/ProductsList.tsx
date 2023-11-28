import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createRef, useEffect, useState, useRef, useReducer } from 'react'
import { View, Text, FlatList, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity, TextInput, TouchableNativeFeedback, StatusBar, ActivityIndicator, Modal, PermissionsAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import Gps from 'react-native-vector-icons/MaterialIcons'
import { Modalize } from 'react-native-modalize';
import { Searchbar } from 'react-native-paper';
import Swiper from 'react-native-swiper';
import HeaderComponent from '../../component/HeaderComponent';
import CustomeButton from '../../helper/util/CustomeButton';
import { capitalizeFirstLetter, scaledSize } from '../../helper/util/Utilities';
import { COLORS, Fonts } from '../../utilits/GlobalAssets';
import { arrowLeftIcon, black, cement, close, dresses, filter, girl, green, house, mapIcon, mobile, searchIcon, starIcon, suite, watch2 } from '../../utilits/GlobalImages';
import { UrlConstants } from '../../context/service/UrlConstants';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, getReqresUser } from './ProductsSlice';
import CustomSpinner from '../../component/CustomSpinner';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import Slider from 'rn-range-slider';
import PriceRangeSlider from '../../component/PriceRangeSlider';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Geolocation from '@react-native-community/geolocation';
// import { isLocationEnabled,promptForEnableLocationIfNeeded } from 'react-native-android-location-enabler';
import { Platform } from 'react-native';


const width = Dimensions.get('window').width;

interface S {
  search: any;
  //filterTabs:any;
  modalData: any;
  screenPosition: any;
  productsData: any;
  scrollLoad: boolean;
  searchProductsData: any
}
export interface Props {
  navigation: any;
  id: string;
  route: any;

}
interface SS {
  // Customizable Area Start
  id: any;
  swiper: any



  // Customizable Area End


}






const ProductList = (props: any) => {

  const [permissionGranted, setPermissionGranted] = useState<Boolean>(false)
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState([])
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedIdL, setSelectedIdL] = useState(null);
  const [selectedIdP, setSelectedIdP] = useState(null);
  const [ cityName, setCityName] = useState("")
  const [selectedPriceId, setSelectedPriceId] = useState(0)
  

  const [modalData, setModalData] = useState([
    { type: 'home', address: 'vijay nagar', id: 1, image: house, rating: 4, price: 4000000, room: 2, floor: 2 },
    { type: 'office', address: 'plasiya', id: 2, image: house, rating: 4, price: 4000000, room: 2, floor: 2 },
    { type: 'office', address: 'plasiya', id: 2, image: house, rating: 4, price: 4000000, room: 2, floor: 2 },

  ])
  const [priceRange, setPriceRange] = useState([{ id: 1, min: 10, max: 20 }, { id: 2, min: 10, max: 40 }, { id: 3, min: 20, max: 50 }, { id: 4, min: 20, max: 30 },])
  const dispatch = useDispatch()
  const reducer = useSelector((state: any) => state.ProductsSlice)
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const modalizeRef = useRef<Modalize>(null);

  const LookingTodata = [{id:'1',title:'Buy'},{id:'2',title:'Rent/Lease'},{id:'3',title:'PG/Co-living'},{id:'4',title:'Other'}]
  const PurposeofBuyingdata = [{id:'1',title:'Residential use'},{id:'2',title:'Commercial use'},{id:'3',title:'Other'}]


  // Loaction Permission area Start

  // async function getPermissionLocation() {
    
  //   const res = await PermissionsAndroid.requestMultiple([
  //   PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //   PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
  // ]);
  //  console.log('permission check--',res);
  // if (res)
  // {
  //   if (Platform.OS === 'android') {
  //   try {
  //         const checkEnabled: boolean = await isLocationEnabled();
  //         console.log('checkEnabled', checkEnabled)
  //         const enableResult = await promptForEnableLocationIfNeeded();
  //         console.log('enableResult', enableResult);
  //         if(enableResult==="enabled" || enableResult==="already-enabled")
  //         {
  //         // setPermissionGranted(true)
  //         if(res["android.permission.ACCESS_FINE_LOCATION"] === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN || res["android.permission.ACCESS_COARSE_LOCATION"] === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN)
  //         {
  //         setPermissionGranted(false)
  //         console.log("Permission not  given--",permissionGranted);
  //         getPermissionLocation()
  //         }else{
  //           getCurrentCity()
  //           setPermissionGranted(true)
  //         }
          
  //         }else{
  //           getPermissionLocation()
  //           setPermissionGranted(false)
  //         console.log("permission not given--",permissionGranted)
        
  //         }
  //     console.log('In getPermission Location--', permissionGranted)
  //       }
  //     catch (error) {
  //       setPermissionGranted(false)
  //       getPermissionLocation()
  //       console.error('Error getting location', error);
  //     }
  //   }
  
  // }
  // }

  // location permission area ends

  // get Current loaction area starts

  const getCurrentCity = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Accessing Permission",
          message: "App needs access to your location",
          buttonPositive: "OK", // Add the required properties
          buttonNegative: "Cancel",
          buttonNeutral: "Ask Me Later",
        }
      );
  
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Location permission granted");
        Geolocation.setRNConfiguration(
          {
           skipPermissionRequests: false,
           authorizationLevel: 'auto',
           enableBackgroundLocationUpdates:true,
           locationProvider: 'auto',
         }
       ) 
  
      Geolocation.getCurrentPosition(
       
         location =>{
             console.log("coordinates--", location.coords.longitude, location.coords.latitude)
         }
         ,
  
         err => console.log("error in getcurrentposiyion", err),
         { enableHighAccuracy: true,maximumAge: 60000 }
  
     );
    } else {
      console.log("Location Permission denied")
      
    }}catch (err) {
      console.log("error",err);
    }
  };

  // get current location area ends


  useEffect(() => {
    console.log('useeffects--------------------------------', reducer);

    //@ts-ignore
    dispatch(getProducts({ pageSize: 10, pageNumber: 0 }))
    // dispatch(getReqresUser())
  }, [])

  const renderItem = (item: any, index: number) => {
    return (
      <TouchableOpacity style={{
        height: scaledSize(264), width: '90%', marginBottom: scaledSize(4),
        alignSelf: 'center', borderWidth: 0, elevation: 4,
        borderRadius: scaledSize(10), marginTop: scaledSize(10),
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
    )
  }

  const renderItemLooking=(item:any , index: number)=>{
    const backgroundColor = item.id === selectedIdL ? '#f1f8ff' : '#ffffff';
    // item.id === selectedIdL ? setBackgroundColorL("#f1f8ff"):setBackgroundColorL('#ffffff')
    return(
        <View style={{flexDirection:'row'}}>
         <TouchableOpacity onPress={() => setSelectedIdL(item.id)} style={{marginTop:scaledSize(5),marginLeft:scaledSize(5)}}>
          <View style={{borderRadius:scaledSize(18),
            borderWidth:1,
            borderColor:'lightgrey',
            // width:scaledSize(50),
            padding:scaledSize(6),
            paddingLeft:15,
            paddingRight:15,
            backgroundColor:backgroundColor,
            // height:scaledSize(30),
            justifyContent:'center',
            alignItems:'center'}}>
          <Text style={{fontFamily:Fonts.regular,color:'black',fontWeight:'600'}}>{item.title}</Text>
          </View>
          </TouchableOpacity>
          </View>
            
    )
  }

  const renderItemPurpose=(item:any , index: number)=>{
    const backgroundColor = item.id === selectedIdP ? '#f1f8ff' : '#ffffff';
    // item.id === selectedId ? setBackgroundColorP("#f1f8ff"):setBackgroundColorL('#ffffff')
    return(
        <View style={{flexDirection:'row'}}>
         <TouchableOpacity onPress={() => setSelectedIdP(item.id)} style={{marginTop:scaledSize(5),marginLeft:scaledSize(5)}}>
          <View style={{borderRadius:scaledSize(18),
            borderWidth:1,
            borderColor:'lightgrey',
            // width:scaledSize(50),
            padding:scaledSize(6),
            paddingLeft:15,
            paddingRight:15,
            backgroundColor:backgroundColor,
            // height:scaledSize(30),
            justifyContent:'center',
            alignItems:'center'}}>
          <Text style={{fontFamily:Fonts.regular,color:'black',fontWeight:'600'}}>{item.title}</Text>
          </View>
          </TouchableOpacity>
          </View>
            
    )
  }
  

  const footerLoader = () => {
    // if (this.state.scrollLoad) return null
    return (
      <View style={{ paddingVertical: scaledSize(50) }}>
        {/* <ActivityIndicator color='red' style={{ bottom: scaledSize(40) }} animating size={'large'} /> */}
      </View>
    )
  }


  // handleSearch = (value: any) => {
  //   if (this.state.productsData && value) {
  //     let products: any;
  //     products = this.state.productsData?.filter((item: any) => {
  //       if (item && item?.name) {
  //         return item?.name.toLowerCase().indexOf(value.toLowerCase()) >= 0
  //       }
  //     })
  //     this.setState({ searchProductsData: products })
  //   }
  // }
  const onSelect = (item: any) => {
    console.log('================================', item);

  }


  return (
      <KeyboardAwareScrollView>
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* <TextInput placeholder='Search products . . .' style={{ width: '80%', backgroundColor: COLORS.white, left: scaledSize(50), top: scaledSize(10) }} 
        value={search} onChangeText={(value: any) => { setSearch( value )}} />
        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ position: 'absolute', left: 0, top: scaledSize(26), marginLeft: scaledSize(15) }}>
          <Image source={arrowLeftIcon} resizeMode='contain' style={{ width: scaledSize(20), height: scaledSize(25),tintColor:'gray',bottom:scaledSize(4) }} />
        </TouchableOpacity>
        <TouchableOpacity style={{ position: 'absolute', right: 0, top: scaledSize(26), marginRight: scaledSize(25) }}>
          <Image source={searchIcon} resizeMode='contain' style={{ width: scaledSize(20), height: scaledSize(25) }} />
        </TouchableOpacity> */}
      <View style={{
        height: scaledSize(70), backgroundColor: 'white', width: '100%',
        justifyContent: 'center', alignItems: 'center', flexDirection: 'row'
      }}>
        <View style={{ height: scaledSize(50), backgroundColor: 'white', width: '80%', marginLeft: scaledSize(20) }}>
          <AutocompleteDropdown
            clearOnFocus={false}
            closeOnBlur={true}
            closeOnSubmit={false}
            // initialValue={{ id: '2' }} // or just '2'
            onSelectItem={(item) => console.log('item===', item)}
            dataSet={[

            ]}
            inputContainerStyle={{
              height: scaledSize(50), backgroundColor: 'white',
              borderWidth: 1, borderColor: '#E0DFE4',
              borderRadius: scaledSize(40),
            }}
            showChevron={false}
            textInputProps={{
              placeholder: 'Search',
              autoCorrect: false,
              autoCapitalize: 'none',


              style: {
                borderRadius: scaledSize(25),
                color: 'red',
                paddingLeft: scaledSize(18),
                fontSize: scaledSize(16),
                alignSelf: 'center',
                left: scaledSize(12),
                fontFamily: Fonts.regular
              },
            }}

          />
        </View>
        <TouchableOpacity style={{
          height: scaledSize(50), width: '20%',
          justifyContent: 'center', alignItems: 'flex-start',
        }} onPress={() => modalizeRef.current?.open()}>
          <Image source={filter}
            resizeMode='contain'
            style={{
              height: scaledSize(34),
              width: scaledSize(34), borderRadius: scaledSize(34),
              left: scaledSize(8), top: scaledSize(4)
            }}
          />
        </TouchableOpacity>
      </View>
      {/* <View style={{ flex:1,bottom:20 }}> */}
      <FlatList
        data={modalData}

        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => 'key' + index}
        renderItem={({ item, index }) => renderItem(item, index)}
        onEndReachedThreshold={0.5}

      // ListFooterComponent={() =>footerLoader()}
      />
      {/* </View> */}
      {/* <CustomSpinner isLoading={reducer?.isLoading} /> */}
      {/* <View style={{height:2,backgroundColor:'white'}}></View> */}
      {/* <Modal visible={isModalOpen} transparent>
        <View style={{
          height: scaledSize(500), width: scaledSize(400),
          backgroundColor: 'white', marginTop: scaledSize(100),
          borderRadius: 20, alignSelf: 'center', elevation: 4
        }}>
          <TouchableOpacity style={{
             right: scaledSize(20),height:scaledSize(50),backgroundColor:'red',
            justifyContent: 'center', alignItems: 'flex-end',
          }} onPress={() => setIsModalOpen(false)}>
            <Image source={close}
              resizeMode='contain'
              style={{
                height: scaledSize(34),
                width: scaledSize(34), borderRadius: scaledSize(34),
                left: scaledSize(8), top: scaledSize(4)
              }} />
          </TouchableOpacity>
          <View style={{ flex: .3, backgroundColor: 'white', 
          justifyContent: 'flex-start', alignItems: 'center',flexDirection:'row',marginLeft:10 }}>
            <TouchableOpacity style={{ height: 50, width: 50, backgroundColor: 'white', 
            elevation: 4, justifyContent: 'center', alignItems: 'center',borderRadius:30 }}>
              <Text style={{ fontSize: 16, fontFamily: Fonts.regular, color: '#537cf0' }}>Buy</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ height: 50, width: 50, backgroundColor: 'white',
             elevation: 4, marginLeft: scaledSize(10),
              justifyContent: 'center', alignItems: 'center',borderRadius:30 }}>
              <Text style={{ fontSize: 16, fontFamily: Fonts.regular, color: '#537cf0' }}>Rent</Text>
            </TouchableOpacity>
          </View>
        </View>

      </Modal> */}
      <Modalize ref={modalizeRef} snapPoint={750}>
        
      <View style={{
          height:scaledSize(600),
          borderRadius: 12,
          padding:scaledSize(10)
        }}>
         <View style={{flex:.4,paddingTop:scaledSize(10)}}>
          <Text style={{fontWeight:'bold',color:'black',fontSize:scaledSize(15)}}>You were exploring</Text>
          <TouchableOpacity style={{marginTop:scaledSize(12),marginLeft:scaledSize(5)}}>
            <View style={{width:scaledSize(110),height:scaledSize(30),borderRadius:scaledSize(6),
            borderWidth:1,borderColor:'lightgrey',flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
              <Icon name="home"/>
              <Text style={{fontWeight:'400',color:'black',}}>Buy in Indore</Text>
            </View>
          </TouchableOpacity>
         </View>
         <View style={{flex:.4}}>
         <Text style={{fontWeight:'bold',color:'black',fontSize:scaledSize(15)}}>Looking to</Text>
         {/* <View style={{flexDirection:'row'}}>
         <TouchableOpacity style={{marginTop:scaledSize(5),marginLeft:scaledSize(5)}}>
          <View style={{borderRadius:scaledSize(15),
            borderWidth:1,
            borderColor:'lightgrey',
            // width:scaledSize(50),
            padding:scaledSize(8),
            // height:scaledSize(30),
            justifyContent:'center',
            alignItems:'center'}}>
          <Text style={{fontWeight:'bold',}}>Buy</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={{marginTop:scaledSize(5),marginLeft:scaledSize(10)}}>
          <View style={{borderRadius:scaledSize(15),
            borderWidth:1,
            borderColor:'lightgrey',
            padding:scaledSize(8),
            // width:scaledSize(90),
            // height:scaledSize(30),
            justifyContent:'center',
            alignItems:'center'}}>
          <Text style={{fontWeight:'bold'}}>Rent/Lease</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={{marginTop:scaledSize(5),marginLeft:scaledSize(10)}}>
          <View style={{borderRadius:scaledSize(15),
            borderWidth:1,
            borderColor:'lightgrey',
            padding:scaledSize(8),
            // width:scaledSize(90),
            // height:scaledSize(30),
            justifyContent:'center',
            alignItems:'center'}}>
          <Text style={{fontWeight:'bold'}}>PG/Co-living</Text>
          </View>
          </TouchableOpacity>
         </View> */}
         
         <FlatList 
         data={LookingTodata}
         renderItem={({ item, index }) => renderItemLooking(item, index)}
         keyExtractor={(item, index) => 'key' + index}
         horizontal={true}
         />
         
         </View>
         <View style={{flex:.4}}>
           <Text style={{fontWeight:'bold',color:'black',fontSize:scaledSize(15)}}>Purpose of buying</Text>
         {/* <View style={{flexDirection:'row'}}>
         <TouchableOpacity style={{marginTop:scaledSize(5),marginLeft:scaledSize(10)}}>
          <View style={{borderRadius:scaledSize(15),
            borderWidth:1,
            borderColor:'lightgrey',
            width:scaledSize(120),
            height:scaledSize(35),
            justifyContent:'center',
            alignItems:'center'}}>
          <Text style={{fontWeight:'bold'}}>Residential use</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={{marginTop:scaledSize(5),marginLeft:scaledSize(10)}}>
          <View style={{borderRadius:scaledSize(15),
            borderWidth:1,
            borderColor:'lightgrey',
            width:scaledSize(120),
            height:scaledSize(35),
            justifyContent:'center',
            alignItems:'center'}}>
          <Text style={{fontWeight:'bold'}}>Commercial use</Text>
          </View>
          </TouchableOpacity>
         </View> */}
          <FlatList 
         data={PurposeofBuyingdata}
         renderItem={({ item, index }) => renderItemPurpose(item, index)}
         keyExtractor={(item, index) => 'key' + index}
         horizontal={true}
         />
         
         </View>
         <View style={{flex:1,paddingBottom:scaledSize(60)}}>
          <Text style={{fontWeight:'bold',fontSize:scaledSize(15),color:'black'}}>City Name</Text>
          <View>
            <View style={{flexDirection: 'row',
  borderBottomWidth: 1,
  borderColor: '#000',
  }}>
          
           <TextInput placeholder='Where?'
            style={{flex:1,fontSize:25}} 
            onChangeText={(text)=>setCityName(text)} />
           <Icon name="search1" color='#3074a6'
    size={25} style={{paddingTop:scaledSize(15)}}/>
    
          </View>
          <View>
            <TouchableOpacity onPress={()=>getCurrentCity()}>
              <View style={{flexDirection:'row',paddingTop:scaledSize(5)}}>
              <Gps name="gps-fixed" color='#006dde'
    size={20} />
    <Text style={{marginLeft:scaledSize(3),color:'#4779ca'}}>Detect my current city</Text>
              </View>
            </TouchableOpacity>
          </View>
          </View>
          <View style={{alignSelf:'center',marginTop:scaledSize(15)}}>
            <TouchableOpacity>
              <View style={{width:scaledSize(330),borderRadius:scaledSize(5),justifyContent:'center',alignItems:'center',backgroundColor:'#0075df',height:scaledSize(50)}}>
                <Text style={{fontWeight:'bold',color:'white',}}>Explore</Text>
              </View>
            </TouchableOpacity>
          </View>
         </View>
          
        </View>
        
         </Modalize>
    </View>
    </KeyboardAwareScrollView>
  )

}

const styles = StyleSheet.create({
  titleInput: {
    color: COLORS.orange,
    top: scaledSize(-10),
    marginTop: scaledSize(-10),
    // textAlign:'center',
    letterSpacing: 1,
    fontFamily: 'Quicksand-Bold',
    // marginTop:scaledSize(10),
    fontSize: scaledSize(19),
  },
  productView: {
    // backgroundColor: COLORS.white,
    borderWidth: 1,
    borderRadius: scaledSize(14),
    borderColor: "#dfdfdf",
    //top: scaledSize(10),
    // margin: scaledSize(10),
    // marginLeft: scaledSize(20),
    height: scaledSize(200),
    // width: scaledSize(160)
  },
  productName: {
    fontSize: scaledSize(11), textAlign: 'center', maxWidth: scaledSize(120), justifyContent: 'center', alignItems: 'center', color: COLORS.black, fontFamily: 'Cormorant-Bold', marginTop: scaledSize(20), top: scaledSize(-10), marginRight: scaledSize(20), left: scaledSize(8), padding: scaledSize(1)
  },
  productImage:
  {
    marginTop: scaledSize(20),
    width: scaledSize(135),
    height: scaledSize(120),
    marginLeft: scaledSize(5),
    marginRight: scaledSize(5),
    alignItems: 'center'
  },
});

export default ProductList
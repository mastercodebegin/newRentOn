
import React, { useEffect, useState } from "react"
import ForgotPassword from "../screen/forgot/ForgotPassword"
import { View, TouchableOpacity} from 'react-native'
import Login from "../screen/login/Login"
import SignUp from "../screen/signup/SignUp"
import { createDrawerNavigator }  from '@react-navigation/drawer'
// import ProductDetails from "../screen/productview/productDetails"
// import ProductList from "../screen/productview/Products"
import { TransitionPresets,createStackNavigator,CardStyleInterpolators } from "@react-navigation/stack"
import TopTabsNavigator from "./TopTabsNavigator"
import BottomTabNavigator from "./BottomTabNavigator"
import Otp from "../screen/testprogram/Otp"
// import Stepper from "../screen/splash/Stepper1"
// import WelcomeScreen from "../screen/welcomeScreen/WelcomeScreen"
// import DetailsScreen from "../screen/details/details"
// import CategoryDetails from "../screen/categorydetails/category-details"
// import Splashscreen from '../screen/splashscreen/src/Splashscreen';
// import AsyncStorage from '@react-native-async-storage/async-storage';
 import UserInformation from "../screen/profile/UserInformation"
// import SecurityScreen from "../screen/security/security"
// import AddressScreen from "../screen/recent/Address/address"
// import PaymentScreen from "../screen/recent/Upi/upi"
// import CardPayment from "../screen/recent/cardPayment/cardPayment"
// import { DrawerNavigator  } from "./MainNavigation"
import Dashboard from "../screen/dashboard/Dasboard"
// import { CustomDrawer } from "../component/CustomDrawer"
import Icon from "react-native-vector-icons/FontAwesome";
import ProductdList from "../screen/productList/ProductsList"
import ProductDetailsScreen from "../screen/productview/productDetails"
import Profile from "../screen/security/security"
import AddressScreen from "../screen/cart/Address/Address"
// import ConfirmScreen from "../screen/recent/PlaceOrder/confirmOrder"
const Stack = createStackNavigator();


const  StackNavigator = (props) => {
let data ;
const [isLoading, setIsLoading] = useState(true);
const [keyWord, setKeyWord] = useState(null)
const [swiper, setSwiper] = useState(null)
  useEffect(()=>{
    data='hi'
  console.log('hi');
})

useEffect(() => {
  value()
  setTimeout(() => {
    setIsLoading(false);
  }, 3000);
}, []);

const value = async ()=>{
  // const value = await AsyncStorage.getItem('login')
  // const values = await AsyncStorage.getItem('keys')
  // setKeyWord(value)
  // setSwiper(values)
}
// const BottomTab =  
  
    return (
      <Stack.Navigator 
      screenOptions={{ headerShown: true}}
      // screenOptions={{ headerShown: false, gestureEnabled: false, 
      //  ...(Platform.OS === "android" && TransitionPresets.SlideFromRightIOS), }}>
      //    {isLoading ? 
			// 		<Stack.Screen
			// 			name="splash"
			// 			options={{ headerShown: false }}
			// 			component={Splashscreen}
					>
           {/* : <> */}
          {/* <Stack.Screen name="AuthNavigator" 
          component={keyWord ? MainNavigator: swiper ? LoginNavigator : AuthNavigator}/> */}
          <Stack.Screen name="AuthNavigator" 
          component={ AuthNavigator}/>
       {/* </> */}
           {/* } */}
      </Stack.Navigator>
  
    )
  }



  const AuthNavigator = ()=>{
    return( <Stack.Navigator initialRouteName={'Stepper'} screenOptions={{ headerShown: false}}>
   {/* <Stack.Screen name="Stepper" options={{title:''}} component={Stepper} />
          <Stack.Screen name="Welcome" options={{title:''}}  component={WelcomeScreen} /> */}
          {/* <Stack.Screen name="Dashboard" options={{title:''}}
           component={DrawerNavigator} /> */}
          <Stack.Screen name="Address" component={AddressScreen} />
           <Stack.Screen name="Profile" component={Profile}/>
           <Stack.Screen name="Account" component={UserInformation}/>
          <Stack.Screen name="ProductdList" component={ProductdList} />
          <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
          <Stack.Screen name="Login" component={Login} />

          {/* 
          <Stack.Screen name="security" component={SecurityScreen}/>
          <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="Card" component={CardPayment} />
        <Stack.Screen name="Proceed" component={ConfirmScreen} />
          <Stack.Screen name="ProductList" component={ProductList} />
          <Stack.Screen name="ProductView" component={TopTabsNavigator} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="CategoryDetails" component={CategoryDetails} /> */}
          {/* <Stack.Screen name="Otp" component={Otp} /> */}
     </Stack.Navigator>
    )
   }
 const LoginNavigator = ()=>{
  return( <Stack.Navigator initialRouteName={"Login"} screenOptions={{ headerShown: false}}>
 {/* <Stack.Screen name="Stepper" options={{title:''}} component={Stepper} />
        <Stack.Screen name="Welcome" options={{title:''}}  component={WelcomeScreen} /> */}
        {/* <Stack.Screen name="Dashboard" options={{title:''}} component={DrawerNavigator} /> */}
        <Stack.Screen name="Login" component={Login}/>
        {/* <Stack.Screen name="Account" component={AccountScreen}/>
        <Stack.Screen name="security" component={SecurityScreen}/>
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Address" component={AddressScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="Card" component={CardPayment} />
        <Stack.Screen name="Proceed" component={ConfirmScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="ProductList" component={ProductList} /> */}
        <Stack.Screen name="ProductView" component={TopTabsNavigator} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        {/* <Stack.Screen name="CategoryDetails" component={CategoryDetails} /> */}
        {/* <Stack.Screen name="Otp" component={Otp} /> */}
   </Stack.Navigator>
  )
 }

 const MainNavigator = ()=>{
  return( <Stack.Navigator initialRouteName={''} screenOptions={{ headerShown: false}}>
 {/* <Stack.Screen name="Stepper" options={{title:''}} component={Stepper} />
        <Stack.Screen name="Welcome" options={{title:''}}  component={WelcomeScreen} /> */}
        {/* <Stack.Screen name="Dashboard" options={{title:''}} component={DrawerNavigator} /> */}
        <Stack.Screen name="Login" component={Login} />
        {/* <Stack.Screen name="Account" component={AccountScreen}/>
        <Stack.Screen name="security" component={SecurityScreen}/>
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Address" component={AddressScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="Card" component={CardPayment} />
        <Stack.Screen name="Proceed" component={ConfirmScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="ProductList" component={ProductList} /> */}
        <Stack.Screen name="ProductView" component={TopTabsNavigator} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        {/* <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="CategoryDetails" component={CategoryDetails} /> */}
        {/* <Stack.Screen name="Otp" component={Otp} /> */}
   </Stack.Navigator>
  )
 }

 export default StackNavigator
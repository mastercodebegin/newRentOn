
import React, { useEffect, useState } from "react"
import ForgotPassword from "../screen/forgot/ForgotPassword"
import { View, TouchableOpacity } from 'react-native'
import Login from "../screen/login/Login"
import SignUp from "../screen/signup/SignUp"
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from "@react-navigation/stack"
import TopTabsNavigator from "./TopTabsNavigator"
import BottomTabNavigator from "./BottomTabNavigator"
import Otp from "../screen/testprogram/Otp"
import UserInformation from "../screen/profile/UserInformation"
import Address from "../screen/cart/Address/Address"
import Dashboard from "../screen/dashboard/dasboard"
import Icon from "react-native-vector-icons/FontAwesome";
import ProductdList from "../screen/productList/ProductsList"
import ProductDetails from "../screen/productview/productDetails"
import Security from "../screen/profile/Security"
import Profile from "../screen/profile/Profile"
import Stepper from "../screen/splash/Stepper"
// import { CustomDrawer } from "../component/CustomDrawer"
// import Stepper from "../screen/splash/Stepper1"
// import WelcomeScreen from "../screen/welcomeScreen/WelcomeScreen"
// import CategoryDetails from "../screen/categorydetails/category-details"
// import Splashscreen from '../screen/splashscreen/src/Splashscreen';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import ProductDetails from "../screen/productview/productDetails"
// import ProductList from "../screen/productview/Products"
// import SecurityScreen from "../screen/security/security"
// import AddressScreen from "../screen/recent/Address/address"
// import PaymentScreen from "../screen/recent/Upi/upi"
// import CardPayment from "../screen/recent/cardPayment/cardPayment"
// import { DrawerNavigator  } from "./MainNavigation"

 import ConfirmScreen from "../screen/cart/PlaceOrder/confirmOrder"
import PreviewOrderDetails from "../screen/orderDetails/PreviewOrderDetails"
import AddressList from "../screen/address/AddressList"
import OrderSuccess from "../screen/orderDetails/OrderSuccess"
import OrderDetails from "../screen/orderDetails/OrderDetails"
import OrderUpdates from "../screen/orderDetails/OrderUpdates"
import searchProductDetails from "../screen/productview/searchProductDetails"
const Stack = createStackNavigator();


const StackNavigator = (props) => {
  let data;
  const [isLoading, setIsLoading] = useState(true);
  const [keyWord, setKeyWord] = useState(null)
  const [swiper, setSwiper] = useState(null)
  useEffect(() => {
    data = 'hi'
    console.log('hi');
  })

  useEffect(() => {
    value()
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const value = async () => {
    // const value = await AsyncStorage.getItem('login')
    // const values = await AsyncStorage.getItem('keys')
    // setKeyWord(value)
    // setSwiper(values)
  }
  // const BottomTab =  

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    // screenOptions={{ headerShown: false, gestureEnabled: false, 
    //  ...(Platform.OS === "android" && TransitionPresets.SlideFromRightIOS), }}>
    //    {isLoading ? 
    // 		<Stack.Screen
    // 			name="splash"
    // 			options={{ headerShown: false }}
    // 			component={Splashscreen}
    >
      {/* : <> */}
      {/* <Stack.Screen name="AuthNavigator" component={keyWord ? MainNavigator : swiper ? LoginNavigator : AuthNavigator} */}
      <Stack.Screen name="AuthNavigator" component={AuthNavigator}

      />
      {/* </> */}
      {/* } */}
    </Stack.Navigator>

  )
}



const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={'bottomNavigation'} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="bottomNavigation" component={BottomTabNavigator} />
      <Stack.Screen name="PreviewOrderDetails" component={PreviewOrderDetails} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
      <Stack.Screen name="OrderSuccess" component={OrderSuccess} />
      <Stack.Screen name="OrderUpdates" component={OrderUpdates} />
      <Stack.Screen name="Address" component={AddressList} />
      <Stack.Screen name="Security" component={Security} />
      <Stack.Screen name="Account" component={UserInformation} />
      <Stack.Screen name="ProductList" component={ProductdList} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="searchProductDetails" component={searchProductDetails} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Stepper" options={{title:''}} component={Stepper} />
      {/* <Stack.Screen name="Welcome" options={{title:''}}  component={WelcomeScreen} />  */}
      {/* <Stack.Screen name="Dashboard" options={{title:''}}
           component={DrawerNavigator} /> */}
      {/* 
          <Stack.Screen name="security" component={SecurityScreen}/>
          <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="Proceed" component={ConfirmScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="CategoryDetails" component={CategoryDetails} /> */}
      {/* <Stack.Screen name="Otp" component={Otp} /> */}
    </Stack.Navigator>
  )
}
const LoginNavigator = () => {
  return (<Stack.Navigator initialRouteName={"Login"} screenOptions={{ headerShown: false }}>
    {/* <Stack.Screen name="Stepper" options={{title:''}} component={Stepper} />
        <Stack.Screen name="Welcome" options={{title:''}}  component={WelcomeScreen} /> */}
    {/* <Stack.Screen name="Dashboard" options={{title:''}} component={DrawerNavigator} /> */}
    <Stack.Screen name="Login" component={Login} />
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

const MainNavigator = () => {
  return (<Stack.Navigator initialRouteName={''} screenOptions={{ headerShown: false }}>
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
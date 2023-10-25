//@ts-nocheck
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createRef, useEffect, useState, useRef } from 'react'
// import { View, Text, FlatList, Image, ScrollView, Dimensions,StyleSheet, TouchableOpacity, TouchableNativeFeedback, StatusBar, ToastAndroid } from 'react-native'
// import LinearGradient from 'react-native-linear-gradient';
// import uuid from 'react-native-uuid';
// import CustomeButton from '../../../helper/util/CustomeButton';
// import { heightFromPercentage, scaledSize } from '../../../helper/util/Utilities';
// import { COLORS } from '../../../utilits/GlobalColors';
// import { active, activeLoc, inactive, inactiveLoc } from '../../../utilits/GlobalImages';
// import RNUpiPayment from 'react-native-upi-pay';
// const width = Dimensions.get('window').width;
// let sessionToken = uuid.v4();

// const info = [{
//     id: 1,
//     isSelected: true,
//     type:'Others UPI IDs/Net Banking'
// },

// {
//     id: 2,
//     isSelected: false,
//     type:'Add Debit/Credit/ATM Card'
// },
// {
//     id: 3,
//     isSelected: false,
//     type:'EMI'
// },
// {
//     id: 4,
//     isSelected: false,
//     type:'Pay On Delivery'
// }
// ]
// const PaymentScreen = ({ navigation, route }) => {
//     const [hotelData, setHotelData] = useState(info)   

//     const renderItem = (item: any, index: number) => {
//         const data = [...hotelData]
//         return <TouchableOpacity
//          style={{ justifyContent:'center', backgroundColor: COLORS.white, alignSelf: 'center', elevation: 5, height:scaledSize(85), width: width - scaledSize(30), paddingTop: scaledSize(6), borderRadius: 3, marginRight: scaledSize(5), marginBottom: scaledSize(30), borderWidth: .5, borderColor: COLORS.borderBottomColor,flex:1 }}
//          onPress={() => {
//             data.map((e: any) => {
//                 if (!e.isSelected && e.id == item.id) {
//                     return e.isSelected = true
//                 }
//                 else if (e.isSelected && e.id == item.id) {
//                     return e.isSelected = true
//                 }
//                 e.isSelected = false
//             })
//             setHotelData(data)
//             console.log(data)

//         }}
//          >
//             <View style={{ position: 'absolute', right: scaledSize(20), top: scaledSize(30), zIndex: 2 }}>
//                 <Image source={item.isSelected ? inactive : active} style={{ width: scaledSize(35), height: scaledSize(35) }} />
//             </View>
//             <View style={{ marginLeft: scaledSize(25), justifyContent:'center' }}>
//                 <Text style={{ color: COLORS.black, fontSize: scaledSize(15) }}>{item?.type}</Text>
//             </View>
//         </TouchableOpacity>
//     }

//     function failureCallback(data:any) {
//         //console.log(data,"fail")
//         if (data['status']=="FAILURE"){
//            // that.setState({Status:"FAILURE"})
//             //that.setState({message:data['message']});
//             ToastAndroid.show('Upi payment Failed',500);
//             //navigation.navigate('Home')
//         }
//         // in case of googlePay
//         else if (data['status']=="FAILURE"){
//            // that.setState({Status:"FAILURE"})
//             //that.setState({message:"app closed without doing payment"});;
//             ToastAndroid.show('App closed without doing payment',500);
//         }
//         // in case of phonepe
//         else if (data['status']=="Failed"){
//            // that.setState({Status:"FAILURE"});
//            // that.setState({message:"app closed without doing payment"});
//            ToastAndroid.show('App closed without doing payment',500);
//         }
//         // in case of phonepe
//         else if(data['status']=="Submitted"){
//            // that.setState({Status:"FAILURE"});
//            // that.setState({message:"transaction done but pending"});
//            ToastAndroid.show('Transaction done but pending',500);
//         }
//         // any other case than above mentioned
//         else{
//             //that.setState({Status:"FAILURE"});
//             //that.setState({message:data[Status]});
//             ToastAndroid.show('Upi Transaction failed',500);
//         }
//       }
    
//       function successCallback(data:any) {
//         ToastAndroid.show('UPI Payment success',500);
//         navigation.navigate('Home')
//         AsyncStorage.removeItem('cart')
//         console.log(data,"magic")
//         //updateOrder();
//       }

//     const continuePayment = () =>{
//         var RandomNumber = Math.floor(Math.random() * 100) + 1 ;
//       hotelData.map(item =>{
//           if(item.isSelected && item.id == 2 ){
//               return navigation.navigate('Card',{data:item})
//           }
//           else if(item.isSelected && item.id == 1) {
//             try {
//                 RNUpiPayment.initializePayment(
//                   {
//                     vpa: 'Q239122109@ybl',
//                     payeeName: 'Harshad',
//                     amount: 1,
//                     transactionNote: `Payment for Ecom Id: ${item?.id * RandomNumber}`,
//                     transactionRef: `${RandomNumber}${item?.id}`,
//                   },
//                   successCallback,
//                   failureCallback
//                 );
//               } catch (error) {
//                 console.log(error);
//                 ToastAndroid.show('No Upi apps to continue',1500);
//               }
//           }
//           else {
//              return 
//           }
//       })
//     }


//     return (
//         <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
//                <StatusBar backgroundColor='#81eed2' />
//                <View style={[{ marginTop: scaledSize(0) }]}>
//                 <LinearGradient colors={['#81eed2', '#74d5bb']} style={styles.linearGradient}>
//                     <TouchableOpacity onPress={() => navigation.goBack()}>
//                     <Image source={require('../../../assets/images/drawable/left-arrow.png')} resizeMode='contain' style={{ width: scaledSize(20), height: scaledSize(25) }} />
//                     </TouchableOpacity>
//                 </LinearGradient>
//                 <View style={{ margin: scaledSize(16), width: '60%' }}>
//                     <Text style={{ fontSize: scaledSize(18) }}>Select a payment method</Text>
//                 </View>
//             </View>

//             <FlatList data={hotelData}
//                 style={{ backgroundColor: COLORS.lightGreen, width: width - scaledSize(34), alignSelf: 'center', borderColor: COLORS.borderBottomColor, elevation: 0, marginBottom: scaledSize(5) }}
//                     showsVerticalScrollIndicator={false}
//                     keyExtractor={(item, index) => 'key' + index}
//                     numColumns={1}
//                     renderItem={({ item, index }) => renderItem(item, index)}
//                 />
//               <View style={styles.loginButton}>
//                         <CustomeButton text={{ color: COLORS.black, fontSize: scaledSize(15) }} style={styles.logButton} name={`Continue`} onPress={() => continuePayment()} />
// </View>
  
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     mainView: {
//         flex: 1,
//         backgroundColor: COLORS.white
//     },
//     Button: {
//         height: heightFromPercentage(7),
//         backgroundColor: COLORS.cartYellow,
//         marginTop: scaledSize(15),
//         marginLeft: scaledSize(-15),
//         borderRadius: scaledSize(8),
//         justifyContent: 'center',
//         borderWidth: scaledSize(0.5),
//         borderColor: COLORS.cartYellow,
//         marginBottom: scaledSize(20),
//         elevation:1,
//         alignItems: 'center',
//         width: '83%',
//         alignSelf: 'center'
//       },
//       modalPasswordButton:{
//         color: COLORS.black, fontSize: scaledSize(15), letterSpacing: 1,
//         //fontWeight: 'bold',
//         textAlign: 'center',
//       },
//     backIconStyle: {
//         width: scaledSize(28),
//         height: scaledSize(28),
//         top: scaledSize(-5)

//     },
//     inputFieldChildView1: {
//         height: scaledSize(60),
//         marginTop: scaledSize(-15),
//         marginBottom: scaledSize(30),
//         width: '80%',
//         marginLeft: scaledSize(30)
//       },
//       textInput: {
//         textAlign: 'left',
//         color: COLORS.black,
//         marginBottom: scaledSize(-25),
//         // marginTop: scaledSize(8),
//         fontSize: scaledSize(15),
//         marginLeft: scaledSize(10),
//         flex: 1
//       },
//     marginTopView:{ marginTop: scaledSize(40) },

//     modalChangePasswordText:{ color: COLORS.black, top: scaledSize(20), letterSpacing: 1, textAlign: 'center', fontWeight: 'bold', fontSize: scaledSize(16) },
  
//     backButtonStyle: { position: 'absolute', left: 0, top: scaledSize(22), marginLeft: scaledSize(15) },
//     logButton: {
//         height: heightFromPercentage(8),
//         backgroundColor: COLORS.cartYellow,
//         marginTop: scaledSize(26),
//         borderRadius: scaledSize(8),
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: '90%',
//         alignSelf: 'center'
//     },
//     logButton2: {
//         height: heightFromPercentage(5),
//         backgroundColor: COLORS.white,
//         marginTop: scaledSize(16),
//         elevation: 1,
//         borderWidth: .5,
//         borderColor: COLORS.borderBottomColor,
//         borderRadius: scaledSize(8),
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: '90%',
//         alignSelf: 'center'
//     },
//     logButton3: {
//         height: heightFromPercentage(5),
//         backgroundColor: COLORS.cartYellow,
//         marginTop: scaledSize(6),
//         borderRadius: scaledSize(8),
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: '90%',
//         alignSelf: 'center'
//     },
//     loginButton: { width: '95%', alignSelf: 'center', marginTop: scaledSize(-10), marginBottom: scaledSize(10) },
//     linearGradient: {
//         //flex: 1,
//         top: scaledSize(0),
//         padding: scaledSize(12),
//         paddingBottom: scaledSize(12),
//         borderRadius: 1,
//         elevation: 0,
//     }
// })

// export default PaymentScreen;

import { View, Text } from 'react-native'
import React from 'react'

export default function upi() {
  return (
    <View>
      <Text>upi</Text>
    </View>
  )
}

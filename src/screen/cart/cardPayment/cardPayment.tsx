//@ts-nocheck
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createRef, useEffect, useState, useRef } from 'react'
import { View, Text, FlatList, Image, ScrollView,StyleSheet, Dimensions, TouchableOpacity, TouchableNativeFeedback, StatusBar, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import HeaderAccountComponent from '../../../component/HeaderAccountComponent';
import { heightFromPercentage, scaledSize } from '../../../helper/util/Utilities';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import { COLORS, FONTS } from '../../../utilits/GlobalColors';
import { backIcon } from '../../../utilits/GlobalImages';
import { useStore } from 'react-redux';
import CustomeButton from '../../../helper/util/CustomeButton';
const width = Dimensions.get('window').width;


const CardPayment = ({ navigation, route }) => {
    const [paymentType, cardPayment] = useState('')
    const [cardNumber,setCardNumber] = useState('')
    const [cardExpiry,setCardExpiry]  = useState('')
    const [cvv,setCvv] = useState('')
    const [cardNumberValid,setCardNumberValid] = useState(false)
    const [cardExpiryValid,setCardExpiryValid]  = useState(false)
    const [cvvValid,setCvvValid] = useState(false)
    useEffect(() => {
        cardPayment(route?.params?.data?.id)
    }, [])

   const onChange = (form:any) => {
       console.log(form?.status)
       setCardNumberValid(form?.status?.number == 'valid' ? true : false)
       setCardExpiryValid(form?.status?.expiry == 'valid' ? true : false)
       setCvvValid(form?.status?.cvc == 'valid' ? true : false)
       setCvv(form?.values?.cvc)
       setCardExpiry(form?.values?.expiry)
       setCardNumber(form?.values?.number)
   }

   const continuePayment = () =>{
       if(!cardNumberValid)
       {
        //console.log(cardNumberValid,"valid")
return ToastAndroid.show('Please Enter valid card details',500)
       }
       else{
navigation.navigate('Home')
AsyncStorage.removeItem('cart')
        ToastAndroid.show('Payment Successfull',500)
       }
   }

    const renderCardDetails = () =>{
      return(
          <KeyboardAvoidingView style={{justifyContent:'center',flex:1,marginTop:scaledSize(-200)}}>
           <CreditCardInput onChange={onChange} />
          </KeyboardAvoidingView>
      )  
    }
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.lightGreen}}>
            <StatusBar hidden backgroundColor='#ccc' />
            <HeaderAccountComponent title1={'Payment Details'} />
      <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backButtonStyle,{zIndex:1}]}>
       <Image source={backIcon} resizeMode='contain' style={styles.backIconStyle}/>
      </TouchableOpacity>
{paymentType == '2' && renderCardDetails()}
        {cardNumber.length > 1 &&  
        <View style={styles.loginButton}>
        <CustomeButton text={{ color: COLORS.white, fontSize: scaledSize(15) }} style={styles.logButton} name={`Continue`} onPress={() => continuePayment()} />
</View>   
        }
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    logButton: {
        height: heightFromPercentage(8),
        backgroundColor: COLORS.purple,
        marginTop: scaledSize(26),
        borderRadius: scaledSize(8),
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center'
    },
    loginButton: { width: '95%', alignSelf: 'center', marginTop: scaledSize(-10), marginBottom: scaledSize(10) },
    backButtonStyle:{ position: 'absolute', left: 0, top: scaledSize(22), marginLeft: scaledSize(15) },
    backIconStyle:{
        width:scaledSize(28),
        height:scaledSize(28),
        top:scaledSize(-5)
      
           },

})

export default CardPayment;

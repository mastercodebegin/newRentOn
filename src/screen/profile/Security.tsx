//@ts-nocheck
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createRef, useEffect, useState, useRef } from 'react'
import { View, Text, FlatList, Image, ScrollView, Switch, Dimensions, StyleSheet, TouchableOpacity, TouchableNativeFeedback, StatusBar, TextInput as AccountTextInput, ToastAndroid, Platform } from 'react-native'
import CodeInput from 'react-native-confirmation-code-input';
import { Icon } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Modalize } from 'react-native-modalize';
import Swipeout from 'react-native-swipeout';
import { launchImageLibrary } from 'react-native-image-picker';
import AccountInputField from '../../component/AccountInput';
import CustomModalDropdown from '../../component/CountryCodeDropDown';
import HeaderAccountComponent from '../../component/HeaderAccountComponent';
import InputField from '../../component/InputField';
import PasswordField from '../../component/passwordInput';
import CustomeButton from '../../helper/util/CustomeButton';
import { heightFromPercentage, scaledSize } from '../../helper/util/Utilities';
import { COLORS } from '../../utilits/GlobalAssets';
import { styles } from './securityStyle'
import { activeLoc, AddAddress, backIcon, Delete, editIcon, heart1, heart2, inactiveLoc, indiaFlag, passwordInVisible, passwordVisible, Pen, profile, right, smartp } from '../../utilits/GlobalImages';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const CountryCode = [
  {
    "id": "1",
    "type": "countryCode",
    "attributes": {
      "number": "India",
      "name": '+91',
      "image": require('../../assets/icons/india.png')
    }
  },

  {
    "id": "2",
    "type": "countryCode",
    "attributes": {
      "number": "USA",
      "name": '+1',
      "image": require('../../assets/icons/usa.png')
    }
  },
  {
    "id": "3",
    "type": "countryCode",
    "attributes": {
      "number": "SAUDI",
      "name": '+11',
      "image": require('../../assets/icons/canada.png')
    }
  }
];

const info = [{
  id: 1,
  first_name: 'Orchid Hotel',
  last_name: 'Orchid, Los Angeles',
  isSelected:true,
  //image: house2,
  type:'BUSINESS',
  adress:'334 madina nagar nizamuddin gali',
  landmark:'azad ncc',
  city:'indoree',
  pincode:'GA - 45202',
  mobile: 5555556666,
  cost:450
},

{
  id: 2,
  first_name: 'Waldorf Hotel',
  isSelected:false,
  last_name: 'Wilshire, Los Angeles',
  //image: house1,
  type:'PERSONAL1',
  adress:'334 madina nagar nizamuddin gali',
  landmark:'azad ncc',
  city:'indoree',
  pincode:'GA - 45202',
  mobile: 5555556666,
  cost:550
},
{
  id: 3,
  first_name: 'Trident Hotel',
  isSelected:false,
  last_name: 'Porchid, Los Angeles',
  //image: house2,
  type:'PERSONAL2',
  adress:'334 madina nagar nizamuddin gali',
  landmark:'azad ncc',
  city:'indoree',
  pincode:'GA - 45202',
  mobile: 5555556666,
  cost:650
},
{
  id: 4,
  first_name: 'Trident Hotel2',
  isSelected:false,
  last_name: 'Porchid, Los Angeles',
  //image: house2,
  type:'COMMERCIAL1',
  adress:'334 madina nagar nizamuddin gali',
  landmark:'azad ncc',
  city:'indoree',
  pincode:'GA - 45202',
  mobile: 5555556666,
  cost:650
},
{
  id: 5,
  first_name: 'Trident Hotel3',
  isSelected:false,
  last_name: 'Porchid, Los Angeles',
  //image: house2,
  type:'COMMERCIAL2',
  adress:'334 madina nagar nizamuddin gali',
  landmark:'azad ncc',
  city:'indoree',
  pincode:'GA - 45202',
  mobile: 5555556666,
  cost:650
}





]

const SecurityScreen = ({ navigation, route }) => {
  const [minutes, setMinutes] = useState(2);
  const [otp, setOtp] = useState('');
  const [countryCode, setCode] = useState('+91')
  const [hotelData, setHotelData] = useState(info)
  const [seconds, setSeconds] = useState(0);
  const [forgotEmail, setForgotEmail] = useState('')
  const [mobile, setNumber] = useState('')
  const [values, setValue] = useState('');
  const [flag, setFlag] = useState(require('../../assets/icons/india.png'))
  const [verified, setVerified] = useState('');
  const [details, setDetails] = useState<any>({})
  const [picImage, setPicImage] = useState('')
  const [isOtpApiCalled, setIsOtpApiCalled] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);
  navigation.addListener(
    'focus',
    () => { value() }
  );
  useEffect(() => {
    if (values.length === 4) {
      if (!isOtpApiCalled) {
        //setValue('')
        setIsOtpApiCalled(true);
        onVerify()
      }
    } else {
      setIsOtpApiCalled(false);
    }

    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [mobile, seconds, minutes, values]);


  const imagePickerFun = async () => {
    var date = new Date(Date.now());
    const options:any = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        allowsEditing: true,
        path: 'images',
        mediaType: 'photo',
        maxHeight: 200,
        minHeight: 200,
        inculdeBase64: false
      },
    };
    launchImageLibrary(options, (response:any) => {
      console.log('Response = ', response.assets);
      if (response.didCancel) {

        console.log('User cancelled image picker');
      } else if (response.error) {

        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {

        console.log(
          'User tapped custom button: ',
          response.customButton
        );
      } else {
        setPicImage(response.assets[0].uri)
        //isUpdateProfilePicture:response.uri,

      }
      // let value = () => this.setState({isUploading:false})
      // setTimeout( value ,1000)
      //console.log(picImage)
    })

  }

  const onVerify = () => {
    if (otp !== values) {
      setValue('')
      return ToastAndroid.show('Entered OTP is In-Correct', 1000)
    }
    ToastAndroid.show('OTP Verified', 1000)
    setVerified('Verified'),
      myRefMobile.current.close()
      setNumber('')
    return myRefOtp.current.close()
  }
  const value = async () => {
    const value = await AsyncStorage.getItem('signUp')
    console.log(value)
    setDetails(JSON.parse(value))
  }

  let swipeBtns = (item:any) => [
    {
      //text: 'Delete',
      backgroundColor: COLORS.TRANSPARENT,
      //underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      component: (
        <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
        >
          <Image resizeMode='contain' style={{width:scaledSize(28),height:scaledSize(28)}} source={Pen} />
        </View>
      ),
      onPress: () => { console.log('hit') }
   },
    {
      //text: 'Edit',
      backgroundColor: COLORS.TRANSPARENT,
      component: (
        <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
        >
          <Image resizeMode='contain' style={{width:scaledSize(28),height:scaledSize(28)}} source={Delete} />
        </View>
      ),
      //underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => deleteItem(item) 
   }
  ];

  const deleteItem = (item:any) =>{
     let data = [...hotelData]
    data.map((e,index)=>{
      if(e.id == item.id){
        return data.splice(index,1)
      }
      
    })
    setHotelData(data)
  }
  let myRef = useRef<any>({})
  let myRefMobile = useRef<any>({})
  let myRefOtp = useRef<any>({})
  let myRefEmail = useRef<any>({})

  const mobileNumberFormat = (text: any) => {
    setVerified('')
    var cleaned = ('' + text).replace(/\D/g, '')
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
    console.log(match)
    if (match && countryCode == '+1') {
      var intlCode = (match[1] ? '1' : ''),
        number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');

      setNumber(number)
      return;
    }
    else if (match && countryCode == '+11') {
      var intlCode = (match[1] ? '1' : ''),
        number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');

      setNumber(number)
      return;
    }

    setNumber(text)
  }

  const renderItem = (item:any,index:number) =>{
    const data  = [...hotelData]
    return <Swipeout autoClose right={swipeBtns(item)}
    backgroundColor= 'transparent'>
    <View style={{backgroundColor:COLORS.lightGreen,alignSelf:'center', elevation:3, height:scaledSize(115),width:width-scaledSize(30), paddingTop:scaledSize(6),borderRadius:20,marginRight:scaledSize(5),marginBottom:scaledSize(15),borderWidth:1,borderColor:COLORS.borderBottomColor}}>
<TouchableOpacity onPress={()=>{
    data.map((e:any)=>{
              if(!e.isSelected && e.id == item.id){
           return e.isSelected = true
              }
              else if(e.isSelected && e.id == item.id){
                return e.isSelected = false
              }
              e.isSelected = false
            })
            setHotelData(data)
            console.log(data)
        
}} style={{position:'absolute',right:scaledSize(20),top:scaledSize(30),zIndex:2}}>
      <Image source={ item.isSelected ? activeLoc : inactiveLoc} style={{width:scaledSize(35),height:scaledSize(35)}}/>
      </TouchableOpacity>
      <View style={{marginLeft:scaledSize(25),marginTop:scaledSize(8)}}>
<Text style={{color:COLORS.black,fontSize:scaledSize(15)}}>{item?.type}</Text>
<Text style={{color:COLORS.profileBgColor,fontSize:scaledSize(13),top:scaledSize(5)}}>{item?.adress}</Text>
<Text style={{color:COLORS.profileBgColor,fontSize:scaledSize(13),top:scaledSize(8)}}>{item?.landmark}</Text>
<Text style={{color:COLORS.profileBgColor,fontSize:scaledSize(13),top:scaledSize(10)}}>
  <Text>{item?.city}, </Text>
  {item?.pincode}</Text>
        </View>

      </View>
      </Swipeout>
  }



  return (
    <View style={styles.mainView}>
      <StatusBar hidden backgroundColor={COLORS.themeBlue} />
      <View style={{top:scaledSize(25)}}>
      <HeaderAccountComponent title1={'Security'} />
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonStyle}>
       <Image source={backIcon} resizeMode='contain' style={styles.backIconStyle}/>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => alert('Clicked')} style={styles.saveButtonStyle}>
        <Text style={styles.saveText}>SAVE</Text>
      </TouchableOpacity> */}
      {/* -----------------------------Change password Modal---------------------------------------- */}
      <Modalize panGestureEnabled={false} modalHeight={height} modalStyle={{backgroundColor:COLORS.lightGreen}} panGestureComponentEnabled={true} ref={myRef}>
      <TouchableOpacity onPress={() => myRef.current.close()} style={[styles.backButtonStyle,{top:scaledSize(40),left:scaledSize(10)}]}>
       <Image source={backIcon} resizeMode='contain' style={[styles.backIconStyle]}/>
      </TouchableOpacity>
        <View style={{marginTop:scaledSize(45)}}>
          <Text style={[styles.modalChangePasswordText,{marginBottom:scaledSize(30)}]}>CHANGE PASSWORD</Text>
          <View style={[styles.marginTopView]} />
          <View style={styles.inputFieldChildView1}>
            <PasswordField icon={'1'} style={styles.textInput}
              Placeholder='Current Password' />
          </View>
          <View style={styles.inputFieldChildView1}>
            <PasswordField icon={'1'}  style={styles.textInput}
              Placeholder='New Password' />
          </View>
          <View style={styles.inputFieldChildView1}>
            <PasswordField icon={'1'}  style={styles.textInput}
              Placeholder='Confirm New Password' />
          </View>

          <CustomeButton style={[styles.Button,{top:scaledSize(20)}]}
            text={styles.modalPasswordButton}
            name='Update' onPress={() => {
              alert('clicked')
            }} />

        </View>
      </Modalize>



      <View style={[{backgroundColor:COLORS.white,marginTop:height - scaledSize(590)}]}>
        <KeyboardAwareScrollView> 
         <TouchableOpacity onPress={()=> myRef.current.open()} style={{flex:1,justifyContent:'space-between',flexDirection:'row',marginTop:scaledSize(10),marginBottom:scaledSize(15),borderBottomColor:COLORS.borderBottomColor,borderBottomWidth:1,paddingBottom:scaledSize(15),width:'90%',alignSelf:'center'}}>
           <Text style={{fontSize:scaledSize(16),left:scaledSize(15)}}>Change password</Text>
           <TouchableOpacity onPress={()=> myRef.current.open()}>
           <Text style={{fontSize:scaledSize(16),right:scaledSize(30),color:COLORS.profileTextColor}}></Text>     
           <Image source={right} resizeMode='contain' style={{width:scaledSize(15),height:scaledSize(15),position:'absolute',right:scaledSize(5),top:scaledSize(3)}}/>
         </TouchableOpacity>
         </TouchableOpacity>
         <TouchableOpacity style={{flex:1,justifyContent:'space-between',flexDirection:'row',marginTop:scaledSize(10),marginBottom:scaledSize(15),borderBottomColor:COLORS.borderBottomColor,borderBottomWidth:1,paddingBottom:scaledSize(15),width:'90%',alignSelf:'center'}}>
           <Text style={{fontSize:scaledSize(16),left:scaledSize(15)}}>Change security PIN</Text>
           <TouchableOpacity onPress={()=> {}}>
           <Text style={{fontSize:scaledSize(16),right:scaledSize(30),color:COLORS.profileTextColor}}></Text>     
           <Image source={right} resizeMode='contain' style={{width:scaledSize(15),height:scaledSize(15),position:'absolute',right:scaledSize(5),top:scaledSize(3)}}/>
         </TouchableOpacity>
         </TouchableOpacity>
         <TouchableOpacity style={{flex:1,justifyContent:'space-between',flexDirection:'row',marginTop:scaledSize(10),marginBottom:scaledSize(15),borderBottomColor:COLORS.borderBottomColor,borderBottomWidth:1,paddingBottom:scaledSize(15),width:'90%',alignSelf:'center'}}>
           <Text style={{fontSize:scaledSize(16),left:scaledSize(15)}}>Forgot security PIN</Text>
           <TouchableOpacity onPress={()=> {}}>
           <Text style={{fontSize:scaledSize(16),right:scaledSize(30),color:COLORS.profileTextColor}}></Text>     
           <Image source={right} resizeMode='contain' style={{width:scaledSize(15),height:scaledSize(15),position:'absolute',right:scaledSize(5),top:scaledSize(3)}}/>
         </TouchableOpacity>
         </TouchableOpacity>
         <View style={{flex:1,justifyContent:'space-between',flexDirection:'row',marginTop:scaledSize(10),marginBottom:scaledSize(0),borderBottomColor:COLORS.borderBottomColor,borderBottomWidth:1,paddingBottom:scaledSize(15),width:'90%',alignSelf:'center'}}>
           <Text style={{fontSize:scaledSize(16),left:scaledSize(15)}}>Device authentication</Text>
           <TouchableOpacity onPress={()=> {}}>  
         <Switch
         trackColor={{false:COLORS.borderBottomColor,true:COLORS.activeBorderColor}}
         thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
         ios_backgroundColor='#3e3e3e'
         onValueChange={()=> setIsEnabled(e => !e)}
         value={isEnabled}
         />
         </TouchableOpacity>
         </View>
       
        </KeyboardAwareScrollView>

      </View>
    </View>
  )
}

export default SecurityScreen;
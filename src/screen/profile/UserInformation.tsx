//@ts-nocheck
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createRef, useEffect, useState, useRef } from 'react'
import { View, Text, FlatList, Image, ScrollView, Dimensions, StyleSheet, TouchableOpacity, TouchableNativeFeedback, StatusBar, TextInput as AccountTextInput, ToastAndroid, Platform, ActivityIndicator } from 'react-native'
import CodeInput from 'react-native-confirmation-code-input';
import { Icon } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Modalize } from 'react-native-modalize';
import Swipeout from 'react-native-swipeout';
import { updateProfileInitiate } from './ProfileUpdateActions';
import { launchImageLibrary } from 'react-native-image-picker';
import AccountInputField from '../../component/AccountInput';
import CustomModalDropdown from '../../component/CountryCodeDropDown';
import HeaderAccountComponent from '../../component/HeaderAccountComponent';
import InputField from '../../component/InputField';
import PasswordField from '../../component/passwordInput';
import { useDispatch, useSelector } from 'react-redux'
import CustomeButton from '../../helper/util/CustomeButton';
import { heightFromPercentage, scaledSize } from '../../helper/util/Utilities';
import { COLORS } from '../../utilits/GlobalAssets';
import { ActionsTypes } from '../../context/actions/ActionsTypes';
import { styles } from './profileStyle'
import { activeLoc, AddAddress, backIcon, Delete, editIcon, heart1, heart2, inactiveLoc, indiaFlag, passwordInVisible, passwordVisible, Pen, profile, right, smartp } from '../../utilits/GlobalImages';
import AlertModal from '../../component/ConfirmationModal';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const CountryCode = [
  {
    "id": "1",
    "type": "countryCode",
    "attributes": {
      "number": "",
      "name": '+91',
      "image": require('../../assets/icons/india.png')
    }
  },

  {
    "id": "2",
    "type": "countryCode",
    "attributes": {
      "number": "",
      "name": '+1',
      "image": require('../../assets/icons/usa.png')
    }
  },
  {
    "id": "3",
    "type": "countryCode",
    "attributes": {
      "number": "",
      "name": '+11',
      "image": require('../../assets/icons/canada.png')
    }
  }
];

const info = [{
  id: 1,
  first_name: 'Orchid Hotel',
  last_name: 'Orchid, Los Angeles',
  isSelected: true,
  //image: house2,
  type: 'BUSINESS',
  adress: '334 madina nagar nizamuddin gali',
  landmark: 'azad ncc',
  city: 'indoree',
  state: 'GA',
  pincode: '45202',
  mobile: 5555556666,
  cost: 450
},

{
  id: 2,
  first_name: 'Waldorf Hotel',
  isSelected: false,
  last_name: 'Wilshire, Los Angeles',
  //image: house1,
  type: 'PERSONAL1',
  adress: '440 madina nagar nizamuddin gali',
  landmark: 'azad ncc',
  city: 'Hyderabad',
  state: 'GA',
  pincode: '45202',
  mobile: 5555556666,
  cost: 550
},
{
  id: 3,
  first_name: 'Trident Hotel',
  isSelected: false,
  last_name: 'Porchid, Los Angeles',
  //image: house2,
  type: 'PERSONAL2',
  adress: '600 madina nagar nizamuddin gali',
  landmark: 'azad ncc',
  city: 'Mumbai',
  state: 'GA',
  pincode: '45202',
  mobile: 5555556666,
  cost: 650
},
{
  id: 4,
  first_name: 'Trident Hotel2',
  isSelected: false,
  last_name: 'Porchid, Los Angeles',
  //image: house2,
  type: 'COMMERCIAL1',
  adress: '999 madina nagar nizamuddin gali',
  landmark: 'azad ncc',
  city: 'Delhi',
  state: 'GA',
  pincode: '45202',
  mobile: 5555556666,
  cost: 650
},
{
  id: 5,
  first_name: 'Trident Hotel3',
  isSelected: false,
  last_name: 'Porchid, Los Angeles',
  //image: house2,
  type: 'COMMERCIAL2',
  adress: '9853 madina nagar nizamuddin gali',
  landmark: 'azad ncc',
  city: 'Agra',
  state: 'GA',
  pincode: '45202',
  mobile: 5555556666,
  cost: 650
}
]

const AccountScreen = ({ navigation, route }) => {
  const [minutes, setMinutes] = useState(2);
  const [otp, setOtp] = useState('');
  const [countryCode, setCode] = useState('+91')
  const [hotelData, setHotelData] = useState(info)
  const [seconds, setSeconds] = useState(0);
  const [forgotEmail, setForgotEmail] = useState('')
  const [mobile, setNumber] = useState('')
  const [profiles ,setProfile] = useState({})
  const [addressObj ,setAddressObj] = useState({})
  const [values, setValue] = useState('');
  const [flag, setFlag] = useState(require('../../assets/icons/india.png'))
  const [verified, setVerified] = useState('');
  const [details, setDetails] = useState<any>({})
  const [picImage, setPicImage] = useState('')
  const [addressType1, setAddressType1] = useState(true)
    const [addressType2, setAddressType2] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [isOtpApiCalled, setIsOtpApiCalled] = useState(true);
  const productsResponce = useSelector((state: any) => state.DashboardReducer)
const [updateProfile,setUpdateProfile] = useState({job: "+1",name: "657-567-5656"})
  const dispatch = useDispatch();
   const [isLoading, setIsLoading] = useState(false)
   const [isDispatchGetAllProductsAction, setIsDispatchGetAllProductsAction] = useState(false);
   const updateProfileResponce = useSelector((state: any) => state.UpdateProfileReducer)

  navigation.addListener(
    'focus',
    () => { value() }
  );
  useEffect(() => {
    if(productsResponce && productsResponce.data && productsResponce.data?.data?.data){
      setProfile(productsResponce.data?.data?.data)
    }
    setTimeout(() => {
      if (isDispatchGetAllProductsAction && updateProfileResponce?.status == 200 &&
        updateProfileResponce?.type == ActionsTypes.UPDATE_PROFILE_SUCCESS)  {  
              setIsLoading(false)
              setIsDispatchGetAllProductsAction(false)
          setNumber('')
          setUpdateProfile(updateProfileResponce?.data?.data)
          setCode('+91')
        //setModalData(productsResponce?.data?.data?.data)
        myRefMobile.current.close()
        //console.log(' >>>>>>>>>>>>>>>>>', updateProfileResponce?.data?.data);
        ToastAndroid.show('Mobile Number Updated Successfully',500)
        // setAddModalNumberModal(false)
      }
      else if(isDispatchGetAllProductsAction && updateProfileResponce?.status){
        setIsLoading(false)
        setIsDispatchGetAllProductsAction(false)
        console.log(' >>>>>>>>>>>>>>>>>', updateProfileResponce?.type,updateProfileResponce?.status);
        ToastAndroid.show('Mobile Number Failed To Update',500)
      }
    }, 1500);
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

  const onVerify = async () => {
    if (otp !== values) {
      setValue('')
      return ToastAndroid.show('Entered OTP is In-Correct', 1000)
    }
    ToastAndroid.show('OTP Verified', 1000)
    setVerified('Verified'),
    setIsLoading(true)
    setIsDispatchGetAllProductsAction(true)
    dispatch(updateProfileInitiate({mobile,countryCode}))
    
    
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
      onPress: () => { myRefUpdate?.current?.open(), setAddressObj(item),console.log(item) }
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
      onPress: () => {setModalVisible(true),setAddressObj(item)}
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
    setModalVisible(false)
  }
  let myRef = useRef<any>({})
  let myRefMobile = useRef<any>({})
  let myRefOtp = useRef<any>({})
  let myRefEmail = useRef<any>({})
  let myRefUpdate = useRef<any>({})
  let myRefAdd = useRef<any>({})
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
                return e.isSelected = true
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
  {item?.state}, {item?.pincode}</Text>
        </View>

      </View>
      </Swipeout>
  }



  return (
    <View style={styles.mainView}>
      <StatusBar hidden backgroundColor={COLORS.themeBlue} />
      <HeaderAccountComponent title1={'Personal Information'} />
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonStyle}>
       <Image source={backIcon} resizeMode='contain' style={styles.backIconStyle}/>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => alert('Clicked')} style={styles.saveButtonStyle}>
        <Text style={styles.saveText}>SAVE</Text>
      </TouchableOpacity> */}

      <View style={styles.profilePicView}>
        {picImage ?
          <Image source={{ uri: picImage }} resizeMode='cover' style={styles.dynamicImage} />

          :

          <Image source={profile} resizeMode='contain' resizeMethod='resize' style={styles.profilePicImage} />
        }

        <TouchableOpacity style={styles.editView} onPress={imagePickerFun}>
          <Image source={editIcon} resizeMode='contain' style={styles.editImageSize} />
        </TouchableOpacity>
      </View>

  {/* -----------------------------Change Email Modal---------------------------------------- */}

      <Modalize panGestureEnabled={false} modalHeight={height} panGestureComponentEnabled={true} ref={myRefEmail}>
        <View style={{flex:1}}>
        <AlertModal isVisible ={modalVisible} onClick={()=> deleteItem(addressObj)} onDelete={()=> setModalVisible(false)} />
        <TouchableOpacity onPress={() => { myRefEmail.current.close(),setHotelData(info) }} style={[styles.backButtonStyle,{top:scaledSize(40),left:scaledSize(10)}]}>
       <Image source={backIcon} resizeMode='contain' style={[styles.backIconStyle]}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {myRefAdd?.current?.open()}} style={[{top:scaledSize(40),position:'absolute',right:scaledSize(20)}]}>
       <Image source={AddAddress} resizeMode='contain' style={[styles.backIconStyle]}/>
      </TouchableOpacity>
          <Text style={[styles.forgotpasswordHeading,{marginTop:scaledSize(40),fontWeight:'100',fontSize:scaledSize(18)}]}>Registered address</Text>
          <View style={styles.forwordHeight} />
          <View style={{flex:1,height:height-scaledSize(110)}}>
              <FlatList data={hotelData}
                keyExtractor={(item, index) => 'key' + index}
                numColumns={1}
                renderItem={({ item, index }) => renderItem(item,index)}
              />

</View>



        </View>
      </Modalize>

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


  {/* -----------------------------Change Mobile Number Modal---------------------------------------- */}

      <Modalize panGestureEnabled={false} modalStyle={{backgroundColor:COLORS.lightGreen}} tapGestureEnabled={false} modalHeight={height} panGestureComponentEnabled={true} ref={myRefMobile}>
        {/* <Text style={[styles.inputFieldLabel3]}>CHANGE MOBILE NUMBER</Text> */}
        <KeyboardAwareScrollView>
        <TouchableOpacity onPress={() => myRefMobile.current.close()} style={[styles.backButtonStyle,{top:scaledSize(40),left:scaledSize(10)}]}>
       <Image source={backIcon} resizeMode='contain' style={[styles.backIconStyle]}/>
      </TouchableOpacity>
        <Text style={[styles.inputFieldLabel4,{marginTop:scaledSize(60),color:COLORS.black,textAlign:'center',marginBottom:scaledSize(40)}]}>Edit phone number</Text>
<Image source={smartp} resizeMode='contain' style={{width:scaledSize(88),height:scaledSize(88),alignSelf:'center'}}/>
       
{/* <Text style={[styles.inputFieldLabel4,{marginTop:scaledSize(15),color:COLORS.grey,textAlign:'center',marginBottom:scaledSize(30),fontSize:scaledSize(14)}]}>Input your phone number</Text>
        */}
        <View style={[styles.dropdownView,{marginTop:scaledSize(35)}]}>

          <Text style={[styles.inputFieldLabel3, { color: COLORS.lightGreen, marginTop: scaledSize(0) }]}>Mobile Number</Text>
          <CustomModalDropdown
            style={styles.pickerbox}
            options={CountryCode}
            onImage={'1'}
            selectedValue={countryCode}
            defaultValue={" "}
            onSelect={(value: any) => { setCode(CountryCode[value]?.attributes.name), setNumber(''), setVerified(''), setFlag(CountryCode[value]?.attributes.image) }}

          />
          <View style={[styles.inputFieldMobileView4, { flexDirection: 'row',left:scaledSize(30) }]}>
            <InputField style={styles.textInput10} value={mobile} maxLength={countryCode == '+1' || countryCode == '+11' ? 14 : 10} textContentType='telephoneNumber' dataDetectorTypes='phoneNumber' keyboardType='phone-pad' onchangeValue={(value: any) => mobileNumberFormat(value)}
              Placeholder='Enter Mobile Number' />


          </View>

        </View>
{isLoading ? <ActivityIndicator color={'red'} size='small'/> :
        <CustomeButton style={styles.button1} text={{color:COLORS.white,fontSize:scaledSize(14)}} name={'Update'} onPress={() => {
          if (!mobile) {
            return ToastAndroid.show('Enter Mobile Number', 1000)
          }
          else if (countryCode == '+1' || countryCode == '+11' ? mobile.length < 14 : mobile.length < 10) {
            return ToastAndroid.show('Enter 10 digit Mobile Number', 1000)
          }
          setMinutes(1),
            setSeconds(0),
            setOtp('1234'),
            setValue(''),
            ToastAndroid.show('OTP sent Successfully', 1000)
          myRefOtp.current.open()
          //myRefMobile.current.close()
        }} />
      }
</KeyboardAwareScrollView>
      </Modalize>

{/* ------------------------------------------Edit Address Modal --------------------------------- */}
<Modalize panGestureEnabled={true} adjustToContentHeight={true} modalStyle={{backgroundColor:COLORS.lightGreen}} panGestureComponentEnabled={true} ref={myRefUpdate}>
      <TouchableOpacity onPress={() => myRefUpdate.current.close()} style={[styles.backButtonStyle,{top:scaledSize(40),left:scaledSize(10)}]}>
       <Image source={backIcon} resizeMode='contain' style={[styles.backIconStyle]}/>
      </TouchableOpacity>
        <View style={{marginTop:scaledSize(25)}}>
          <Text style={[styles.modalChangePasswordText,{marginBottom:scaledSize(30)}]}>Edit Address</Text>
          <View style={[styles.marginTopView]} />


          <View style={{flexDirection:'row',alignSelf:'center',borderWidth:1,marginBottom:scaledSize(15),borderColor:COLORS.borderBottomColor,padding:18,borderRadius:33,paddingTop:0,paddingBottom:0,flex:1,paddingLeft:25,paddingRight:25}}>

<TouchableOpacity onPress={()=>{
setAddressType1(true)
setAddressType2(false)
}} style={{marginLeft:scaledSize(-28),borderColor: addressType1 ? '#bc0923' : COLORS.TRANSPARENT,borderWidth:1,padding:8,borderRadius:33,paddingRight:19,paddingLeft:12,backgroundColor:addressType1 ? COLORS.tabColor : '#fff'}}>
<Text style={{textAlign:'center',color:'#bc0923'}}>Personal</Text>
</TouchableOpacity>

<TouchableOpacity onPress={()=>{
    setAddressType1(false)
    setAddressType2(true)
}} style={{borderColor:addressType2 ? '#bc0923' : COLORS.TRANSPARENT,borderWidth:1,padding:8,marginRight:scaledSize(-28),borderRadius:33,paddingLeft:19,paddingRight:12,backgroundColor:addressType2 ? COLORS.tabColor : '#fff'}}>
<Text style={{textAlign:'center',color:'#bc0923',left:scaledSize(-3)}}>Business</Text>
</TouchableOpacity>
</View>

          <View style={styles.inputFieldChildView1}>
            <InputField style={styles.textInput}
              Placeholder='Street Address (Street no & Street name)' value={addressObj?.adress} />
          </View>
          <View style={styles.inputFieldChildView1}>
            <InputField   style={styles.textInput}
              Placeholder='Apt/Suite/Bldg (Optional)' value={addressObj?.landmark} />
          </View>
          <View style={styles.inputFieldChildView1}>
            <InputField  style={styles.textInput}
              Placeholder='City'value={addressObj?.city} />
          </View>

          <View style={styles.inputFieldChildView1}>
                        <InputField style={styles.textInput}
                            Placeholder='State' value={addressObj?.state} />
                    </View>

          <View style={styles.inputFieldChildView1}>
            <InputField  style={styles.textInput}
              Placeholder='Zip code' value={addressObj?.pincode} />
          </View>


          <CustomeButton style={[styles.Button]}
            text={styles.modalPasswordButton}
            name='Update' onPress={() => {
              alert('clicked')
            }} />

        </View>
      </Modalize>


      <Modalize panGestureEnabled={true} adjustToContentHeight={true} modalStyle={{backgroundColor:COLORS.lightGreen}} panGestureComponentEnabled={true} ref={myRefAdd}>
      <TouchableOpacity onPress={() => myRefAdd.current.close()} style={[styles.backButtonStyle,{top:scaledSize(40),left:scaledSize(10)}]}>
       <Image source={backIcon} resizeMode='contain' style={[styles.backIconStyle]}/>
      </TouchableOpacity>
        <View style={{marginTop:scaledSize(25)}}>
          <Text style={[styles.modalChangePasswordText,{marginBottom:scaledSize(30),fontSize:scaledSize(17)}]}>Add New Address</Text>
          <View style={[styles.marginTopView]} />


          <View style={{flexDirection:'row',alignSelf:'center',borderWidth:1,marginBottom:scaledSize(15),borderColor:COLORS.borderBottomColor,padding:18,borderRadius:33,paddingTop:0,paddingBottom:0,flex:1,paddingLeft:25,paddingRight:25}}>

    <TouchableOpacity onPress={()=>{
setAddressType1(true)
setAddressType2(false)
    }} style={{marginLeft:scaledSize(-28),borderColor: addressType1 ? '#bc0923' : COLORS.TRANSPARENT,borderWidth:1,padding:8,borderRadius:33,paddingRight:19,paddingLeft:12,backgroundColor:addressType1 ? COLORS.tabColor : '#fff'}}>
<Text style={{textAlign:'center',color:'#bc0923'}}>Personal</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>{
        setAddressType1(false)
        setAddressType2(true)
    }} style={{borderColor:addressType2 ? '#bc0923' : COLORS.TRANSPARENT,borderWidth:1,padding:8,marginRight:scaledSize(-28),borderRadius:33,paddingLeft:19,paddingRight:12,backgroundColor:addressType2 ? COLORS.tabColor : '#fff'}}>
<Text style={{textAlign:'center',color:'#bc0923',left:scaledSize(-3)}}>Business</Text>
    </TouchableOpacity>
</View>

          <View style={styles.inputFieldChildView1}>
            <InputField style={styles.textInput}
              Placeholder='Street Address (Street no & Street name)' value={''} />
          </View>
          <View style={styles.inputFieldChildView1}>
            <InputField   style={styles.textInput}
              Placeholder='Apt/Suite/Bldg (Optional)' value={''} />
          </View>
          <View style={styles.inputFieldChildView1}>
            <InputField  style={styles.textInput}
              Placeholder='City'value={''} />
          </View>

          <View style={styles.inputFieldChildView1}>
                        <InputField style={styles.textInput}
                            Placeholder='State' value={''} />
                    </View>

          <View style={styles.inputFieldChildView1}>
            <InputField  style={styles.textInput}
              Placeholder='Zip code' value={''} />
          </View>


          <CustomeButton style={[styles.Button]}
            text={styles.modalPasswordButton}
            name='Add' onPress={() => {
              alert('clicked')
            }} />

        </View>
      </Modalize>
 {/* -----------------------------OTP Modal---------------------------------------- */}

      <Modalize adjustToContentHeight={true} closeOnOverlayTap={false} panGestureComponentEnabled={true} ref={myRefOtp}>
        <TouchableOpacity onPress={() => {
          return myRefOtp.current.close()
        }}>
          <View style={{ backgroundColor: COLORS.white }}>
            <View style={[styles.otpView]}>
              <Text style={styles.otpText} >
                {'Enter OTP'}
              </Text>
              <Text style={[styles.otpText,{color:COLORS.white}]} >
                {'Enter OTP'}
              </Text>
              <View style={{ marginTop: scaledSize(19) }}>
                <Text
                  style={styles.otpText2}
                >
                  {'Enter the OTP that was sent to your phone number'}
                </Text>
              </View>
              <View style={{ marginTop: scaledSize(9) }}>
                <View style={styles.codeInputView}>
                  {/* <Text style={styles.inputFieldLabel1}>VERIFY OTP</Text> */}
                  <CodeInput
                    //ref={this.codeInputRef1}
                    activeColor={COLORS.themeBlue}
                    inactiveColor={COLORS.grey}
                    secureTextEntry
                    placeholder=''
                    placeholderTextColor={COLORS.grey}
                    keyboardType='numeric'
                    className={'border-b'}
                    space={scaledSize(15)}
                    size={scaledSize(50)}
                    codeLength={4}
                    cellBorderWidth={1}
                    value={values}
                    inputPosition='left'
                    codeInputStyle={styles.text}
                    onFulfill={setValue}
                  />
                </View>
                {minutes === 0 && seconds === 0 ? null : (
                  <Text
                    style={styles.resendOtpView}
                  >
                    {'RESEND OTP IN'} {minutes}:{seconds}
                  </Text>
                )}
                {minutes === 0 && seconds === 0 ? (
                  <TouchableOpacity onPress={() => {
                    setValue(''),
                      setMinutes(1),
                      setSeconds(0),
                      ToastAndroid.show('OTP sent Successfully', 1000)

                  }}>
                    <Text
                      style={styles.resendOtpText}
                    >
                      {'RESEND OTP'}
                    </Text>
                  </TouchableOpacity>
                ) : null}

                <View style={{ height: scaledSize(19) }} />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modalize>



      <View style={{backgroundColor:COLORS.white }}>

        <KeyboardAwareScrollView>


         <View style={{flex:1,justifyContent:'space-between',flexDirection:'row',marginTop:scaledSize(15),marginBottom:scaledSize(15),borderBottomColor:COLORS.borderBottomColor,borderBottomWidth:1,paddingBottom:scaledSize(15),width:'90%',alignSelf:'center'}}>
           <Text style={{fontSize:scaledSize(16),left:scaledSize(15)}}>Full Name</Text>
           <Text style={{fontSize:scaledSize(16),right:scaledSize(15),color:COLORS.profileBgColor}}>{profiles?.first_name}</Text>
         </View>
         

         <View style={{flex:1,justifyContent:'space-between',flexDirection:'row',marginTop:scaledSize(10),marginBottom:scaledSize(15),borderBottomColor:COLORS.borderBottomColor,borderBottomWidth:1,paddingBottom:scaledSize(15),width:'90%',alignSelf:'center'}}>
           <Text style={{fontSize:scaledSize(16),left:scaledSize(15)}}>E - Mail</Text>
           <Text style={{fontSize:scaledSize(16),right:scaledSize(15),color:COLORS.profileBgColor}}>{profiles?.email}</Text>
         </View>

         
         <View style={{flex:1,justifyContent:'space-between',flexDirection:'row',marginTop:scaledSize(10),marginBottom:scaledSize(15),borderBottomColor:COLORS.borderBottomColor,borderBottomWidth:1,paddingBottom:scaledSize(15),width:'90%',alignSelf:'center'}}>
           <Text style={{fontSize:scaledSize(16),left:scaledSize(15)}}>Phone</Text>
           <TouchableOpacity onPress={()=> myRefMobile.current.open()}>
           <Text style={{fontSize:scaledSize(16),right:scaledSize(30),color:COLORS.profileTextColor}}> {updateProfile?.job} {updateProfile?.name}</Text>     
           <Image source={right} resizeMode='contain' style={{width:scaledSize(15),height:scaledSize(15),position:'absolute',right:scaledSize(5),top:scaledSize(3)}}/>
         </TouchableOpacity>
         </View>

         <View style={{flex:1,justifyContent:'space-between',flexDirection:'row',marginTop:scaledSize(10),marginBottom:scaledSize(0),borderBottomColor:COLORS.borderBottomColor,borderBottomWidth:1,paddingBottom:scaledSize(5),width:'90%',alignSelf:'center'}}>
        
          <Text style={{fontSize:scaledSize(16),left:scaledSize(15)}}>Address</Text>
          <TouchableOpacity onPress={()=> myRefEmail.current.open()} style={{width:'40%'}}>
           <Text style={{fontSize:scaledSize(14),right:scaledSize(19),color:COLORS.profileTextColor,top:scaledSize(-10)}}>{"334 madina nagar nizamuddin gali azad n, cc indoreee (GA) - 45202"}</Text>
          
           <Image source={right} resizeMode='contain' style={{width:scaledSize(15),height:scaledSize(15),position:'absolute',right:scaledSize(2),top:scaledSize(10)}}/>
         </TouchableOpacity>
         </View>

         {/* <View style={{flex:1,justifyContent:'space-between',flexDirection:'row',marginTop:scaledSize(10),marginBottom:scaledSize(0),borderBottomColor:COLORS.borderBottomColor,borderBottomWidth:1,paddingBottom:scaledSize(15),width:'90%',alignSelf:'center'}}>
           <Text style={{fontSize:scaledSize(16),left:scaledSize(15)}}>Password</Text>
           <TouchableOpacity onPress={()=> myRef.current.open()}>
           <Text style={{fontSize:scaledSize(16),right:scaledSize(50),color:COLORS.profileTextColor}}> *******</Text>     
           <Image source={right} resizeMode='contain' style={{width:scaledSize(15),height:scaledSize(15),position:'absolute',right:scaledSize(5),top:scaledSize(3)}}/>
         </TouchableOpacity>
         </View> */}
        </KeyboardAwareScrollView>

      </View>
    </View>
  )
}

export default AccountScreen;
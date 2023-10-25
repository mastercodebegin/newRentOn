//@ts-nocheck
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
//import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { scaledSize } from "../helper/util/Utilities";
import { SafeAreaView } from "react-native-safe-area-context";
import deviceBasedDynamicDimension from "./deviceBasedDynamicDimension";
import { useFocusEffect } from "@react-navigation/core";
import { contact, rightArrow, profiles, settings, shedule, shop, Info } from "../utilits/GlobalImages";
import {profile} from '../utilits/GlobalImages'

// import {
//   profileDrawer,
// } from "../../blocks/DashboardBlock/src/assets";
//local imports

interface myProps {
  props: any;
  navigation: any;
  name: any;
  //Name: any;
}

export const CustomDrawer: React.FC<myProps> = (props) => {
  useFocusEffect(() => {
    getData();
  });

  useEffect(() => {
    //getData();
  }, [])


  const [name, setName] = useState("Harshad");
  const [profilePic, setProfilePic] = useState("");


  const getData = async () => {
   //let receivedName = await getStorageData("userDetails");
   // let receivedImg: any = await getStorageData("img");
    //let fname: any = receivedName;
    //console.log("name====>",fname)
    //setName(fname);
   // setProfilePic(imgR)
  };

  const drawerItems = [
    {
      label: "My Profiles",
      icon:profiles,
      onPress: () => {
        alert('clicked')
      },
    },
    {
      label: "Shedules",
      icon:shedule,
      onPress: () =>  alert('clicked'),
    },
    {
      label: "Services",
      icon:settings,
      onPress: () => {
        //  alert('alert pressed')

        alert('clicked')
      },
    },
    {
      label: "Shops",
      icon:shop,
      onPress: () => {
        //  alert('alert pressed')
        console.log("first");
        alert('clicked')
      },
    },
    {
      label: "Contact us",
      icon:contact,
      onPress: () => {
        alert('clicked')
      },
    },
    {
      label: "Sign Out",
      icon:Info,
      onPress: async () => {
        props.navigation.navigate('Login')
      },
    },
  ];
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor:'#74d5bb'
        }}
      >
 <View style={{backgroundColor:"#74d5bb",paddingBottom:scaledSize(0),flexDirection:'row'}}>
        <View style={{marginTop:scaledSize(30),alignSelf:'flex-start',left:scaledSize(20),marginBottom:scaledSize(30),top:scaledSize(10)}}>
          <Image resizeMode='contain' source={profile} style={{width:scaledSize(100),height:scaledSize(100),borderRadius:50}}/>
        </View>
        <View style={{justifyContent:'flex-start',alignSelf:'center'}}>
        <Text style={{top:scaledSize(15),textAlign:'center',color:'#fff',left:scaledSize(30),width:'75%'}}>{name}</Text>
        <Text style={{top:scaledSize(20),textAlign:'center',color:'#fff',left:scaledSize(30),width:'100%',fontSize:14}}>{"abc@gmail.com"}</Text>
        </View>
        </View>
        <DrawerContentScrollView
          contentContainerStyle={{ flexGrow: 1, paddingTop: 0 }}
          {...props}
        >
          <View style={{ flex: 1,marginTop:scaledSize(0),backgroundColor: "#fff",borderTopRightRadius:scaledSize(55) }}>
            {drawerItems.map((item, index) => {
              return (
                <View
                  style={{
                     //backgroundColor: "grey",
                    //margin: 15,
                    justifyContent: 'flex-start',
                    //alignItems: "center",
                  }}
                  key={index}
                >
                  <View style={[styles.view_Stroke1004,{marginTop:scaledSize(15)}]} />
                  <TouchableOpacity

                    onPress={item.onPress}
                    style={{
                      flex: 2,
                      paddingHorizontal: 20,
                      flexDirection:'row'
                    }}
                  >
                   
                    <Image resizeMode='contain' source={item?.icon} style={{width:scaledSize(20),height:scaledSize(20),top:scaledSize(17)}}/>
                  
                    <Text
                      style={
                        item.label === "Sign Out"
                          ? [styles.TEXTCOLORSTYLEText3,{alignSelf:'center',letterSpacing:.5}]
                          : item.label === "Invite Friends"
                            ? styles.TEXTCOLORSTYLEText4
                            : [styles.labelStyle,{ width:'83%', borderBottomWidth: item.label === "Shop by Categories" || item.label === "Orders"  ? 0 : 0,borderBottomColor:'grey'}]
                      }
                    >
                      { item.label === "Sign Out"? "SIGN OUT" :item.label}
                    </Text>
                    {item.label !== "Sign Out" &&
                    <Image resizeMode='contain' source={rightArrow} style={{width:scaledSize(10),height:scaledSize(10),top:scaledSize(22)}}/>
                    }
                    </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </DrawerContentScrollView>
        {/* <TouchableOpacity onPress={()=>props.navigation.navigate('Login')}>
        <Text style={{textAlign:'center',marginBottom:scaledSize(20),fontSize:17,color:'red'}}>Sign Out</Text>
        </TouchableOpacity> */}
      </View>
      {/* </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img_header_shop: {
    width: deviceBasedDynamicDimension(225, true, 1),
    height: deviceBasedDynamicDimension(375, false, 1),
    marginLeft: deviceBasedDynamicDimension(0, true, 1),
    marginTop: deviceBasedDynamicDimension(0, false, 1),
    opacity: 1,
  },
  image_Image34Image: {
    //width: deviceBasedDynamicDimension(85, true, 1),
   // height: deviceBasedDynamicDimension(95, false, 1),
    // marginTop: deviceBasedDynamicDimension(24, false, 1),
    opacity: 1,
    // resizeMode: "contain",
    // marginTop: deviceBasedDynamicDimension(42, false, 1),
  },
  textlabel_IDText: {
    opacity: 1,
    backgroundColor: "transparent",
    includeFontPadding: false,
    //padding: deviceBasedDynamicDimension(0, true, 1),
    color: "rgba(35, 34, 39, 1)",
    textAlign: "center",
    textAlignVertical: "top",
    // fontFamily: FONTS.NunitoRegular,
   // fontSize: deviceBasedDynamicDimension(14, true, 1),
  },
  view_Container2: {
    // marginHorizontal: deviceBasedDynamicDimension(15, false, 1),
    opacity: 1,
    // backgroundColor: "rgba(220, 96, 104, 1)",
   // borderRadius: deviceBasedDynamicDimension(10, true, 1),
   // borderWidth: deviceBasedDynamicDimension(0, true, 1),
   // padding: deviceBasedDynamicDimension(10, true, 1),
  },
  profileImg: {
    //width: deviceBasedDynamicDimension(50, true, 1),
   // height: deviceBasedDynamicDimension(50, false, 1),
   // borderRadius: deviceBasedDynamicDimension(50, true, 1),
  },
  TEXTCOLORSTYLEText: {
   // padding: deviceBasedDynamicDimension(0, true, 1),
    //color: "rgba(31, 22, 70, 1)",
    textAlign: "center",
    textAlignVertical: "top",
    //fontFamily: FONTS.QuicksandSemiBold,
    //fontSize: deviceBasedDynamicDimension(16, true, 1),
  },
  textlabel_ZoneWorkerText: {
    opacity: 1,
    backgroundColor: "transparent",

    includeFontPadding: false,
   // paddingTop: deviceBasedDynamicDimension(5, true, 1),
    color: "rgba(255, 255, 255, 1)",
    textAlign: "left",
    textAlignVertical: "top",
    // fontFamily: "Nunito-Regular",
    //fontSize: deviceBasedDynamicDimension(10, true, 1),
  },
  button_SaveButton: {
    //padding: deviceBasedDynamicDimension(10, true, 1),
    opacity: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    //borderRadius: deviceBasedDynamicDimension(10, true, 1),
    justifyContent: "center",
   // marginTop: deviceBasedDynamicDimension(20, false, 1),
  },
  TEXTCOLORSTYLEText2: {
    color: "rgba(31, 22, 70, 1)",
    textAlign: "center",
    textAlignVertical: "top",
    //fontFamily: FONTS.QuicksandSemiBold,
   // fontSize: deviceBasedDynamicDimension(16, true, 1),
  },
  textlabel_SwitchZoneText: {
    opacity: 1,
    backgroundColor: "transparent",

    includeFontPadding: false,
   // paddingLeft: deviceBasedDynamicDimension(10, false, 1),
   // color: "rgba(255, 255, 255, 1)",
    textAlign: "left",
    textAlignVertical: "top",
    // fontFamily: "Nunito-Regular",
    //fontSize: deviceBasedDynamicDimension(14, true, 1),
  },
  image_SwitchZoneImage: {
    //width: deviceBasedDynamicDimension(16, true, 1),
   // height: deviceBasedDynamicDimension(12, false, 1),

    opacity: 1,
    // resizeMode: "contain",
  },

  menuContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  menuItemsCard: {
    borderRadius: 10,
  },
  circleContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    padding: 10,
  },
  labelStyle: {
   // paddingHorizontal: deviceBasedDynamicDimension(20, true, 1),
    color: 'grey',
    textAlignVertical: "top",
    padding:15,
    fontFamily: "JosefinSans-Regular",
  //  fontSize: deviceBasedDynamicDimension(18, true, 1),
  //  marginBottom: deviceBasedDynamicDimension(20, false, 1),
  },
  view_Line89: {
   // marginTop: deviceBasedDynamicDimension(20, false, 1),
    width: "90%",
   // height: deviceBasedDynamicDimension(2, false, 1),
   // marginHorizontal: deviceBasedDynamicDimension(20, false, 1),
    opacity: 1,
    borderColor: "rgba(233, 233, 233, 1)",
   // borderRadius: deviceBasedDynamicDimension(0, true, 1),
   // borderWidth: deviceBasedDynamicDimension(1, true, 1),
  },
  textlabel_JohnDoeText: {
   // marginTop: deviceBasedDynamicDimension(20, false, 1),
   // padding: deviceBasedDynamicDimension(0, true, 1),
    color: "rgba(84, 192, 232, 1)",
    textAlign: "left",
    textAlignVertical: "top",
  //  fontFamily: FONTS.QuicksandSemiBold,
    //fontSize: deviceBasedDynamicDimension(24, true, 1),
  },
  button_SignupCopyButton: {
    width: "100%",
    // width: deviceBasedDynamicDimension(216, true, 1),
   // height: deviceBasedDynamicDimension(39, false, 1),
    //marginTop: deviceBasedDynamicDimension(20, false, 1),
    opacity: 1,
    backgroundColor: "rgba(235, 233, 230, 1)",
   // borderRadius: deviceBasedDynamicDimension(0, true, 1),
    justifyContent: "center",
    alignItems: "center",
  },
  button_SignupButton: {
    width: "100%",
  //  height: deviceBasedDynamicDimension(39, false, 1),
   // marginTop: deviceBasedDynamicDimension(20, false, 1),
    opacity: 1,
    backgroundColor: "rgba(235, 233, 230, 1)",
    //borderRadius: deviceBasedDynamicDimension(0, true, 1),
    justifyContent: "center",
    alignItems: "center",
  },

  view_Stroke1004: {
    width: "100%",
    //height: deviceBasedDynamicDimension(1, false, 1),
    // marginTop: deviceBasedDynamicDimension(336, false, 1),
    opacity: 1,
    borderBottomColor: 'grey',
    //borderBottomWidth:1
    //borderRadius: deviceBasedDynamicDimension(0, true, 1),
   // borderWidth: deviceBasedDynamicDimension(1, true, 1),
    //marginHorizontal: deviceBasedDynamicDimension(10, true, 1),
  // marginBottom: deviceBasedDynamicDimension(20, false, 1),
  },
  TEXTCOLORSTYLEText3: {
    color: "blue",
    textAlign: "center",
    padding:15,
    textAlignVertical: "top",
   // fontFamily: FONTS.OpenSansRegular,
  //  fontSize: deviceBasedDynamicDimension(18, true, 1),
    //marginBottom: deviceBasedDynamicDimension(20, false, 1),
  },
  TEXTCOLORSTYLEText4: {
    color: "rgba(242, 241, 246, 1)",
    textAlign: "center",
    padding:15,
    textAlignVertical: "top"
    //fontSize: deviceBasedDynamicDimension(18, true, 1),
    ///marginBottom: deviceBasedDynamicDimension(20, false, 1),
  },
});

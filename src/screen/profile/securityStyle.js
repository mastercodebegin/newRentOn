import React from 'react'
import {StyleSheet} from 'react-native'
import Color from '../../assets/colors/Color';
import {heightFromPercentage,scaledSize,widthFromPercentage} from '../../helper/util/Utilities'
import { COLORS } from '../../utilits/GlobalAssets';


export const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: COLORS.lightGreen
    },
    card1Image:{
      height: scaledSize(160),
      width: scaledSize(190),
      //elevation:scaledSize(10),
      marginTop:scaledSize(-20),
      borderRadius: scaledSize(3),
      //borderBottomRightRadius:scaledSize(20),
      //borderBottomLeftRadius:scaledSize(20),
      marginRight:scaledSize(10),
      marginLeft:scaledSize(-15)
    },
    forwordHeight:{ marginTop: scaledSize(40) },
    inputFieldChildView4: {
        height: scaledSize(45),
        marginTop: scaledSize(-5),
        marginBottom:scaledSize(30),
        width:'80%',
        marginLeft:scaledSize(30)
    },
forwardButton:{
    color: COLORS.white, fontSize: scaledSize(15), letterSpacing: 1,
    //fontWeight: 'bold',
    textAlign: 'center',
  },
    forgotpasswordHeading:{ color: COLORS.black, top: scaledSize(20), letterSpacing: 1, textAlign: 'center', fontWeight: 'bold', fontSize: scaledSize(16) },
    backButtonStyle:{ position: 'absolute', left: scaledSize(15), top: scaledSize(35), marginLeft: scaledSize(15) },
    saveButtonStyle:{ position: 'absolute', right: 0, top: scaledSize(24), marginRight: scaledSize(15) },
    saveText:{ color: COLORS.black, fontSize: scaledSize(14), letterSpacing: 1 },
    profilePicView:{ backgroundColor: COLORS.lightGreen, 
      marginTop: scaledSize(60), 
      justifyContent: 'center', 
      alignItems: 'center' },
    dynamicImage:{
        height: scaledSize(127),
        borderRadius: scaledSize(250),
        width: scaledSize(125),

        marginTop: scaledSize(-20),
      },
      profilePicImage:{ borderRadius: scaledSize(100), marginTop: scaledSize(-40), width: scaledSize(127) },

      editView:{ position: 'absolute', left: scaledSize(215), top: scaledSize(110) },

      editImageSize:{ width: scaledSize(30), height: scaledSize(30) },

      marginTopView:{ marginTop: scaledSize(40) },

      modalPasswordButton:{
        color: COLORS.white, fontSize: scaledSize(15), letterSpacing: 1,
        //fontWeight: 'bold',
        textAlign: 'center',
      },

      modalChangePasswordText:{ color: COLORS.black, top: scaledSize(20), letterSpacing: 1, textAlign: 'center', fontWeight: 'bold', fontSize: scaledSize(16) },
  
     otpView:{ marginBottom: 5, marginTop: scaledSize(15), width: '100%' },

     otpText:{ textAlign: 'center', color: COLORS.black, letterSpacing: 0.5,  fontSize: scaledSize(20),top:scaledSize(20) },

     otpText2:{ textAlign: 'center', color: COLORS.grey, padding: scaledSize(10),  fontSize: scaledSize(16), marginTop: scaledSize(-5) },

     codeInputView:{ marginLeft: scaledSize(20), marginTop: scaledSize(-10), marginBottom: scaledSize(20),justifyContent:'center',alignItems:'center' },

     resendOtpView:{ color: COLORS.themeBlue, textAlign: 'center', padding: scaledSize(4), letterSpacing: 2, fontSize: scaledSize(14) },
    
     resendOtpText:{ color: COLORS.themeBlue, textAlign: 'center', padding: scaledSize(4), letterSpacing: 2, fontSize: scaledSize(14) },

     changeButton:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},

     changeText:{top:scaledSize(-5),right:scaledSize(60)},

     changeText1:{ color: COLORS.grey, letterSpacing: 1, fontSize: scaledSize(12) },

     dynamicFlagSize:{ position: 'absolute', width: scaledSize(20), height: scaledSize(40), top: scaledSize(14), marginLeft: scaledSize(30) },
    
     backIconStyle:{
  width:scaledSize(28),
  height:scaledSize(28),
  top:scaledSize(-5)

     },

     view: {
        flexDirection: 'row',
        marginTop: scaledSize(20),
        marginLeft: scaledSize(25),
        borderBottomWidth: scaledSize(.5),
        borderBotoomRadius: scaledSize(8),
        borderBottomColor: COLORS.borderBottomColor,
        width: '80%',
        marginBottom: scaledSize(20)
        //  marginTop: scaledSize(14) 
      },
      text: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold'
      },
      button1: {
        height: heightFromPercentage(7),
        backgroundColor: 'red',
        marginTop: scaledSize(46),
        top: scaledSize(-40),
        borderRadius: scaledSize(28),
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center'
    
      },
      inputFieldMobileView4: {
        height: scaledSize(45),
        marginTop: scaledSize(40),
        marginBottom: scaledSize(30),
        width: '55%',
        position: 'absolute',
        marginLeft: scaledSize(110)
      },
      pickerbox: {
        //zIndex: 1,
        maxWidth: '39%',
        borderRadius: 13,
        //backgroundColor: "#00000000",
        marginTop: scaledSize(41),
        marginLeft: scaledSize(-140),
        marginBottom: scaledSize(15),
        borderWidth: Platform.OS === "web" ? 0 : 1,
        borderColor: COLORS.borderBottomColor,
        height: scaledSize(45),
      },
      inputFieldLabel3: {
        fontSize: scaledSize(17),
        fontWeight: 'bold',
        marginBottom: scaledSize(10),
        marginLeft: scaledSize(32),
        marginTop: scaledSize(-25),
        color: COLORS.black, marginBottom: scaledSize(-10), marginTop: scaledSize(20), textAlign: 'center', letterSpacing: 1
    
      },
      inputFieldLabel4: {
        fontSize: scaledSize(19),
        //fontWeight: 'bold',
        marginBottom: scaledSize(10),
        //marginLeft: scaledSize(32),
        marginTop: scaledSize(-25),
        color: COLORS.white, marginBottom: scaledSize(-10), marginTop: scaledSize(20), textAlign: 'center', letterSpacing: 1
    
      },

      dropdownView:{ flexDirection: 'row', top: scaledSize(-40) },
      textInput1: {
        textAlign: 'left',
        // marginTop: scaledSize(8),
        fontSize: scaledSize(16),
        fontWeight: '700',
        width: '27%',
        color: COLORS.black,
        marginBottom: scaledSize(-5),
        marginRight: scaledSize(20),
        marginLeft: scaledSize(30),
        flex: 1
    
    
      },
      inputFieldChildView1: {
        height: scaledSize(60),
        marginTop: scaledSize(-15),
        marginBottom: scaledSize(30),
        width: '80%',
        marginLeft: scaledSize(30)
      },
      textInput: {
        textAlign: 'left',
        color: COLORS.black,
        marginBottom: scaledSize(-10),
        // marginTop: scaledSize(8),
        fontSize: scaledSize(14),
        marginLeft: scaledSize(40),
        flex: 1
      },
      textInput10: {
        textAlign: 'left',
        color: COLORS.black,
        marginBottom: scaledSize(-10),
        // marginTop: scaledSize(8),
        fontSize: scaledSize(14),
        //marginLeft: scaledSize(40),
        flex: 1
      },
      Button: {
        height: heightFromPercentage(7),
        backgroundColor: COLORS.purple,
        marginTop: scaledSize(15),
        marginLeft: scaledSize(-15),
        borderRadius: scaledSize(8),
        justifyContent: 'center',
        borderWidth: scaledSize(0.5),
        borderColor: COLORS.purple,
        marginBottom: scaledSize(20),
        alignItems: 'center',
        width: '83%',
        alignSelf: 'center'
      },
      modalView: {
        flexDirection: 'row',
        marginTop: scaledSize(75),
        marginLeft: scaledSize(25),
        borderBottomWidth: scaledSize(.5),
        borderBotoomRadius: scaledSize(8),
        borderBottomColor: COLORS.borderBottomColor,
        width: '80%',
        marginBottom: scaledSize(20)
        //  marginTop: scaledSize(14) 
      },
      modalView1: {
        flexDirection: 'row',
        marginTop: scaledSize(20),
        marginLeft: scaledSize(25),
        borderBottomWidth: scaledSize(.5),
        borderBotoomRadius: scaledSize(8),
        borderBottomColor: COLORS.borderBottomColor,
        width: '80%',
        marginBottom: scaledSize(20)
        //  marginTop: scaledSize(14) 
      },
})
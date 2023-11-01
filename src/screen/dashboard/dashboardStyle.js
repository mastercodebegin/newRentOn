import React from 'react'
import {StyleSheet,Dimensions} from 'react-native'
import {heightFromPercentage,scaledSize,widthFromPercentage} from '../../helper/util/Utilities'
import { COLORS } from '../../utilits/GlobalColors';
const {height} = Dimensions.get('window');

export const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: COLORS.lightGreen,
       // borderWidth:2,borderColor:COLORS.orangeTheme
        //height: height - scaledSize(20)
    },
    felx:{
      flex: 1,
      backgroundColor: COLORS.black,
      maxHeight: height - scaledSize(-120)
    },
    dashboardView1:{flexDirection:'row',marginTop:scaledSize(55),marginBottom:scaledSize(-20)},
    dashboardView2:{flexDirection:'column',marginLeft:scaledSize(25)},
    dashboardSideMenu:{left:scaledSize(-20),top:scaledSize(-23),borderRadius:scaledSize(10),  shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: scaledSize(2)},
        sideMenuImage:{width:scaledSize(15), height:scaledSize(15)},
        dashboardLocationText:{fontSize:scaledSize(13),color:COLORS.themeBlue,marginLeft:scaledSize(-20),marginTop:scaledSize(3)},
  
  dashboardAddressText:{fontSize:scaledSize(15),color:COLORS.black,letterSpacing:.5},
        screen1Border:{
        height: scaledSize(40), width:scaledSize(90), 
        elevation:scaledSize(3),
        backgroundColor:COLORS.themeBlue,
         borderWidth:1,
         borderRadius:scaledSize(29),
         borderColor:COLORS.themeBlue, 
         margin: 10,
         marginLeft:scaledSize(5)
      },
      productView: {
        backgroundColor: COLORS.white,
        marginBottom:scaledSize(-10),
         //borderWidth: 1,
          borderRadius: scaledSize(20),
           //borderColor: COLORS.placeHolderTextColor, 
           top:scaledSize(-10),
           margin: scaledSize(10),
            marginLeft: scaledSize(10), 
            height: scaledSize(200),
             width: scaledSize(160)
      },
      dashboardProfileImage:{width:scaledSize(50),height:scaledSize(50),marginLeft:scaledSize(60),borderRadius:scaledSize(20),top:scaledSize(-8)},
    

      searchBarView:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},

      searchTextSize:{fontSize:scaledSize(14)},

      searchContainerStyle:{elevation:scaledSize(0), backgroundColor:COLORS.white,marginBottom:scaledSize(-25), marginTop:scaledSize(60),marginLeft:scaledSize(20),borderRadius:scaledSize(15), marginRight:scaledSize(30), borderLeftWidth:3, borderBottomWidth:1,borderTopWidth:1, borderColor:'#f4f3f6', borderRightWidth:3},
    
      searchInputStyle:{backgroundColor:COLORS.white, borderRadius:scaledSize(40), margin:scaledSize(-8)},

      filterView:{top:scaledSize(34),right:scaledSize(20)},

      filterImageSize:{
        width:scaledSize(29),
        height:scaledSize(29),
        right:scaledSize(-10),
      },

      scrollViewOptions:{flexDirection:'row',
      marginTop:scaledSize(5),
      marginBottom:scaledSize(10),
      marginLeft:scaledSize(20)
    },

      scrollViewImageSize:{marginTop:scaledSize(10),width:scaledSize(25),height:scaledSize(25),marginLeft:scaledSize(5),marginRight:scaledSize(5)},

     heading1View:{ height: scaledSize(79), width: '100%', justifyContent: 'center', alignItems: 'center' },

     heading1RowView:{marginLeft:scaledSize(-20), height: scaledSize(30), width: '80%', justifyContent: 'space-between', flexDirection: 'row' },
     
     heading1Text:{ fontSize: scaledSize(18),color:COLORS.black,fontWeight:'bold' },
   
     heading1Text2:{ fontSize: scaledSize(14),color:COLORS.themeBlue,marginTop:scaledSize(5),marginRight:scaledSize(-35) },
   
     card1TopView:{},

     heading2View:{ height: scaledSize(79), width: '100%', justifyContent: 'center', alignItems: 'center' },

     heading2RowView:{ height: scaledSize(39), width: '80%', justifyContent: 'space-between', flexDirection: 'row' },

     heading2Text:{ fontSize: scaledSize(19), color:COLORS.black,fontWeight:'bold' },

     heading2Text2:{ fontSize: scaledSize(14), color:COLORS.themeBlue,marginTop:scaledSize(5),marginRight:scaledSize(-20) },

     card2TopView:{marginTop:scaledSize(-30),marginBottom:scaledSize(0)},
    
     screen1Border9:{
        height: scaledSize(50),
         width:scaledSize(50),
          backgroundColor:'#f6f6f6',
          elevation:scaledSize(4),
          marginRight:scaledSize(50),
           //borderWidth:1,
           borderRadius:scaledSize(29),
           borderColor:"#dfdfdf", 
           margin: 10,
           marginLeft:scaledSize(5)
      },
      screen1Border1:{
        fontSize: scaledSize(12), textAlign:'center', color:COLORS.white,letterSpacing:.5, marginTop: scaledSize(10),marginRight:scaledSize(10),left:scaledSize(4)
      },
      screen1Border8:{
        fontSize: scaledSize(12),left:scaledSize(12), maxWidth: scaledSize(60), color: COLORS.black, fontFamily: 'Cormorant-bold', marginTop: scaledSize(10), top: scaledSize(-10),padding: scaledSize(1)
      },
      card2:{ 
      height: scaledSize(160), width: scaledSize(320),
      marginLeft: scaledSize(20),
      backgroundColor:COLORS.white,
      flexDirection:'row',
      borderRadius:scaledSize(20)
    }, 
    card2Image:
    {
        height: scaledSize(180),
        marginTop:scaledSize(10),
        //marginBottom:scaledSize(-50),
        //left:scaledSize(-8),
        width: scaledSize(220),
        borderRadius: scaledSize(20),
       
        marginRight:scaledSize(10)
      },
      card2View:
      {flexDirection:'column',marginTop:scaledSize(20)},

  card2Text:
  { color: COLORS.black, fontSize:scaledSize(16),marginLeft:scaledSize(10),marginTop:scaledSize(10),fontWeight:'bold' },

  card2LocationPin:
  {width:scaledSize(15),height:scaledSize(15),position:'absolute',bottom:0,marginBottom:scaledSize(55),marginLeft:scaledSize(3)},

  card2discription:{ color: COLORS.grey, marginTop: scaledSize(4),marginLeft:scaledSize(20)},

  card1:{
            
    height: scaledSize(295), width: scaledSize(280),
    marginLeft: 20,
    backgroundColor:COLORS.white,
    borderRadius:scaledSize(8),
    borderBottomRightRadius:scaledSize(30),
    borderBottomLeftRadius:scaledSize(30)

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
  card1Text:{ color: COLORS.themeBlue, fontSize:scaledSize(15),marginLeft:scaledSize(-10),top:scaledSize(10)},
  card1LocationPin:{width:scaledSize(14),height:scaledSize(14),position:'absolute',bottom:scaledSize(-40),marginLeft:scaledSize(-13)},

  card3Text:{ color: COLORS.white, fontSize:scaledSize(15),marginLeft:scaledSize(10),fontFamily:'Merriweather-Regular' },
  card3LocationPin:{width:scaledSize(14),height:scaledSize(14),position:'absolute',bottom:scaledSize(9),marginLeft:scaledSize(9)},


  card1discription:{ color: COLORS.grey, marginTop: scaledSize(4),marginLeft:scaledSize(20)},
  priceStyle:{ fontSize: scaledSize(14),marginTop:scaledSize(10), color: COLORS.themeBlue,marginLeft:scaledSize(10),fontWeight:'bold' },
})
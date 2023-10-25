import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import Color from '../../assets/colors/Color';
import { heightFromPercentage, scaledSize, widthFromPercentage } from '../../helper/util/Utilities'
import { COLORS, Fonts } from '../../utilits/GlobalAssets';
const { width: screenWidth } = Dimensions.get('window')

export const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  linearGradient: {
    flex: 1,
    top: scaledSize(-16),
    padding: scaledSize(18),
    paddingBottom: scaledSize(6),
    borderRadius: 1,
    elevation: 0,
  },
  image2: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  productPrice: {
    fontSize: scaledSize(11),
    textAlign: 'center',
    maxWidth: scaledSize(120),
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
    top: scaledSize(-10),
    marginRight: scaledSize(20),
    left: scaledSize(8),
    padding: scaledSize(1)
  },
  slide2: {
    //flex: 1,
    backgroundColor: COLORS.white
  },
  image: {
    height: scaledSize(150),
    //backgroundColor:'red',
    borderRadius: scaledSize(5),
    width: scaledSize(370),
    marginTop: scaledSize(10)
  },
  slideChildView: {
    flex: .2,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  dashboardView1: { flexDirection: 'row', marginTop: scaledSize(55), marginBottom: scaledSize(-20) },
  dashboardView2: { flexDirection: 'column', marginLeft: scaledSize(25) },
  dashboardSideMenu: {
    left: scaledSize(-20), top: scaledSize(-13), borderRadius: scaledSize(10), shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: scaledSize(2)
  },
  sideMenuImage: { width: scaledSize(15), height: scaledSize(15) },
  dashboardLocationText: { fontSize: scaledSize(13), color: COLORS.themeBlue, marginLeft: scaledSize(-20), marginTop: scaledSize(3), fontWeight: 'bold' },

  dashboardAddressText: { fontSize: scaledSize(15), marginLeft: scaledSize(50), color: COLORS.black, marginTop: scaledSize(-30), fontWeight: 'bold', letterSpacing: .5 },
  screen1Border: {
    height: scaledSize(40), maxWidth: scaledSize(100), backgroundColor: COLORS.themeBlue, borderWidth: 1, borderRadius: scaledSize(9), borderColor: COLORS.themeBlue, margin: 10, marginLeft: scaledSize(5)
  },

  dashboardProfileImage: {
    width: scaledSize(50),
    height: scaledSize(50),
    marginLeft: scaledSize(10),
    borderRadius: scaledSize(12),
    top: scaledSize(-5)
  },


  searchBarView: {
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor:'red'
  },

  searchTextSize: { fontSize: scaledSize(16) },

  searchContainerStyle: { width: scaledSize(310), backgroundColor: COLORS.white, marginBottom: scaledSize(20), marginTop: scaledSize(10), marginLeft: scaledSize(45), borderRadius: scaledSize(20), marginRight: scaledSize(30), borderLeftWidth: 3, borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#f4f3f6', borderRightWidth: 3 },

  searchInputStyle: { backgroundColor: COLORS.white, margin: scaledSize(-8) },

  filterView: { left: scaledSize(20) },

  filterImageSize: { width: scaledSize(25), height: scaledSize(25) },

  scrollViewOptions: { flexDirection: 'row', marginTop: scaledSize(4), marginLeft: scaledSize(20) },


  scrollViewOptions2: { flexDirection: 'row', marginTop: scaledSize(-10), marginLeft: scaledSize(20) },

  scrollViewImageSize: { marginTop: scaledSize(15), width: scaledSize(25), height: scaledSize(25), marginLeft: scaledSize(5), marginRight: scaledSize(5) },


  scrollViewImageSize1:
  {
    marginTop: scaledSize(20),
    width: scaledSize(55),
    height: scaledSize(85),
    marginLeft: scaledSize(5),
    marginRight: scaledSize(5),
    alignItems: 'center'
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


  heading1View: { height: scaledSize(79), width: '100%', justifyContent: 'center', alignItems: 'center' },

  heading1RowView: { marginLeft: scaledSize(-20), height: scaledSize(30), width: '80%', justifyContent: 'space-between', flexDirection: 'row' },

  heading1RowView1: { marginLeft: scaledSize(-20), height: scaledSize(30), width: '80%', justifyContent: 'space-between', flexDirection: 'row' },

  heading1Text: { fontSize: scaledSize(18), color: COLORS.black, fontWeight: 'bold' },

  heading1Text1: { fontSize: scaledSize(18), color: COLORS.black, fontWeight: 'bold' },

  heading1Text2: { fontSize: scaledSize(14), color: COLORS.themeBlue, marginTop: scaledSize(5), marginRight: scaledSize(-35) },

  card1TopView: { marginTop: scaledSize(-15) },

  heading2View: { height: scaledSize(79), width: '100%', justifyContent: 'center', alignItems: 'center' },

  heading2RowView: { height: scaledSize(39), width: '80%', justifyContent: 'space-between', flexDirection: 'row' },

  heading2Text: { fontSize: scaledSize(19), fontFamily: 'Cormorant-Bold', color: COLORS.black, fontWeight: 'bold' },

  heading2Text2: { fontSize: scaledSize(14), fontFamily: 'Cormorant-Bold', color: COLORS.themeBlue, marginTop: scaledSize(5), marginRight: scaledSize(-20) },

  card2TopView: { marginTop: scaledSize(-30) },

  screen1Border9: {
    backgroundColor: COLORS.white, borderWidth: .5, borderRadius: scaledSize(70), borderColor: COLORS.grey, margin: scaledSize(10), marginLeft: scaledSize(5), height: scaledSize(60), width: scaledSize(60)
  },

  screen1Border11: {
    backgroundColor: COLORS.white, borderWidth: 1, borderRadius: scaledSize(20), borderColor: COLORS.placeHolderTextColor, margin: scaledSize(10), marginLeft: scaledSize(5), height: scaledSize(160), width: scaledSize(110)
  },

  productView: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderRadius: scaledSize(20),
    borderColor: COLORS.placeHolderTextColor,
    top: scaledSize(-10),
    margin: scaledSize(10),
    marginLeft: scaledSize(10),
    height: scaledSize(200)
  },
  screen1Border1: {
    fontSize: scaledSize(12), textAlign: 'center', color: COLORS.white, fontFamily: 'Cormorant-Bold', marginTop: scaledSize(10), marginRight: scaledSize(10)
  },
  screen1Border8: {
    fontSize: scaledSize(12), textAlign: 'center', maxWidth: scaledSize(60), justifyContent: 'center', alignItems: 'center', color: COLORS.black, fontFamily: 'Cormorant-Bold', marginTop: scaledSize(10), top: scaledSize(-10), marginRight: scaledSize(20), left: scaledSize(8), padding: scaledSize(1)
  },

  screen1Border12: {
    fontSize: scaledSize(11), textAlign: 'center', maxWidth: scaledSize(120), justifyContent: 'center', alignItems: 'center', color: COLORS.black, fontFamily: 'Cormorant-Bold', marginTop: scaledSize(20), top: scaledSize(-10), marginRight: scaledSize(20), left: scaledSize(8), padding: scaledSize(1)
  },

  productName: {
    fontSize: scaledSize(11), textAlign: 'center',
    maxWidth: scaledSize(120), justifyContent: 'center',
    alignItems: 'center', color: COLORS.black,
    fontFamily: 'Cormorant-Bold', marginTop: scaledSize(20),
    top: scaledSize(-10), marginRight: scaledSize(20),
    left: scaledSize(8), padding: scaledSize(1)
  },

  card2: {
    height: scaledSize(160), width: scaledSize(320),
    marginLeft: scaledSize(20),
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    borderRadius: scaledSize(20)
  },
  card2Image:
  {
    height: scaledSize(120),
    marginTop: scaledSize(10),
    //marginLeft:scaledSize(15),
    width: scaledSize(120),
    borderRadius: scaledSize(20),

    marginRight: scaledSize(10)
  },
  card2View:
    { flexDirection: 'column', marginTop: scaledSize(20) },

  card2Text:
    { color: COLORS.black, fontSize: scaledSize(16), marginLeft: scaledSize(10), marginTop: scaledSize(10), fontWeight: 'bold' },

  card2LocationPin:
    { width: scaledSize(15), height: scaledSize(15), position: 'absolute', bottom: 0, marginBottom: scaledSize(55), marginLeft: scaledSize(3) },

  card2discription: { color: COLORS.grey, marginTop: scaledSize(4), marginLeft: scaledSize(20) },

  card1: {

    height: scaledSize(295), width: scaledSize(280),
    marginLeft: 20,
    backgroundColor: COLORS.white,
    borderRadius: scaledSize(8),
    borderBottomRightRadius: scaledSize(30),
    borderBottomLeftRadius: scaledSize(30)

  },
  card1Image: {
    height: scaledSize(200),
    width: scaledSize(280),
    marginTop: scaledSize(-20),
    borderRadius: scaledSize(15),
    borderBottomRightRadius: scaledSize(20),
    borderBottomLeftRadius: scaledSize(20),
    marginRight: scaledSize(10),
    marginLeft: scaledSize(-15)
  },
  card1Text: { color: COLORS.black, fontSize: scaledSize(16), marginLeft: scaledSize(10), marginTop: scaledSize(10), fontWeight: 'bold' },
  card1LocationPin: { width: scaledSize(15), height: scaledSize(15), position: 'absolute', bottom: 0, marginBottom: scaledSize(30), marginLeft: scaledSize(3) },
  card1discription: { color: COLORS.grey, marginTop: scaledSize(4), marginLeft: scaledSize(20) },
  priceStyle: { fontSize: scaledSize(14), marginTop: scaledSize(10), color: COLORS.themeBlue, marginLeft: scaledSize(10), fontWeight: 'bold' },
  searchStyle: {
    margin: 4, height: 40,
    justifyContent: 'center', alignItems: 'center',
    borderBottomWidth: .3, borderBottomColor: COLORS.white, elevation: 2, borderRadius: 16,
    backgroundColor: 'white', width: '90%', alignSelf: 'center'
  },
  searchView: {
    justifyContent: 'center', alignItems: 'center',
    margin: 4, height: 40, width: 200
  },
  searchResulText:{color:'black',fontFamily:Fonts.regular}
})
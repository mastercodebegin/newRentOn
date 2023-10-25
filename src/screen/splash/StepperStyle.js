import { StyleSheet } from 'react-native'
import { heightFromPercentage, scaledSize } from '../../helper/util/Utilities'
import { COLORS } from '../../utilits/GlobalAssets';



export const styles = StyleSheet.create({
  wrapper: {
    flex: 1, backgroundColor: COLORS.white, alignItems: 'center'
  },
  customButton: {
    color: COLORS.white, fontSize: scaledSize(16),
    textAlign: 'center'
  },
  view: {
    height: heightFromPercentage(8),
    backgroundColor: COLORS.purple,
    marginTop: scaledSize(26),
    borderRadius: scaledSize(18),
    bottom: scaledSize(50),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',

  },
  swipe1View: { backgroundColor: COLORS.white, marginTop: scaledSize(-30), alignItems: 'center', justifyContent: 'center' },
  swipe1Text1: { fontSize: scaledSize(17), fontFamily: 'Bold', fontWeight: 'bold', color: COLORS.purple, textAlign: 'center' },
  swipe1Text2: { fontSize: scaledSize(35), fontFamily: 'Bold', fontWeight: 'bold', color: 'black', marginLeft: scaledSize(40) },
  swipe1Text3: { fontSize: scaledSize(13), width: '70%', fontFamily: 'Bold', fontWeight: 'bold', color: '#c3c3c3', textAlign: 'center', top: scaledSize(-10) },

  swipe2View: { backgroundColor: COLORS.white, marginTop: scaledSize(10), alignItems: 'center', justifyContent: 'center' },
  swipe2Text1: { fontSize: scaledSize(35), fontFamily: 'Bold', fontWeight: 'bold', color: 'black', marginLeft: scaledSize(40) },
  swipe2Text2: { fontSize: scaledSize(35), fontFamily: 'Bold', fontWeight: 'bold', color: 'black', marginLeft: scaledSize(40) },
  swipe2Text3: { fontSize: scaledSize(13), width: '70%', fontFamily: 'Bold', fontWeight: 'bold', color: '#c3c3c3', textAlign: 'center', top: scaledSize(-10) },

  slide1: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: COLORS.white
  },
  slide2: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  slide3: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  text: {
    color: COLORS.black,
    fontSize: 30,
    fontWeight: 'bold'
  },
  skipText: {
    fontSize: scaledSize(13),
    color: '#c3c3c3',
    marginRight: scaledSize(29),
    top: scaledSize(20),
    fontWeight: '400'
  },
  nextText: {
    fontSize: scaledSize(13),
    marginRight: scaledSize(0),
    fontWeight:'600'
  },

  nextText2: {
    fontSize: scaledSize(13),
    color: '#c3c3c3',
    marginRight: scaledSize(0),
    top: scaledSize(-40)
  },
  image: {
    height: scaledSize(300),
    //backgroundColor:'red',
    width: scaledSize(370),
    marginTop: scaledSize(50)
  },
  slideChildView: {
    flex: .2,
    justifyContent: 'center',
    alignItems: 'flex-end'
  }
})

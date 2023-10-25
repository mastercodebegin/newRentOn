
//@ts-nocheck
import {
    Platform,
    Dimensions,
    PixelRatio
    // Customizable Area Start
    // Customizable Area End
  } from "react-native";

import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
//Artboard Dimension 
let artBoardHeightOrg = 812;
let artBoardWidthOrg = 375;
//Re calculated Artboard Dimension 
let artBoardWidth = isSameRatio() ? artBoardWidthOrg : screenWidth;
let artBoardHeight = isSameRatio() ? artBoardHeightOrg : screenHeight;
// To check if Artboard and Device screen has same ratio 
function isSameRatio(): boolean {
  return artBoardWidthOrg / artBoardHeightOrg < 1 && screenWidth / screenHeight < 1
}

//Top or Bottom nav spaces or any extra space occupied by os e.g Status bar, Notch 
let extraSpace = 0;

function deviceBasedDynamicDimension(originalDimen: number, compareWithWidth: boolean, resizeFactor: number): number | undefined {
  if (originalDimen != null) {
    if (resizeFactor != null) {
      originalDimen *= resizeFactor;
    }
    const compareArtBoardDimenValue = compareWithWidth ? artBoardWidth : artBoardHeight;
    const artBoardScreenDimenRatio = (originalDimen * 100) / compareArtBoardDimenValue;
    let compareCurrentScreenDimenValue = compareWithWidth ? screenWidth : screenHeight - extraSpace;
    if (Platform.OS === 'web') {
      return (responsiveWidth(originalDimen / compareCurrentScreenDimenValue) * 100);
    }
    return PixelRatio.roundToNearestPixel((artBoardScreenDimenRatio * compareCurrentScreenDimenValue) / 100,);
  }
  return null
}

export default deviceBasedDynamicDimension
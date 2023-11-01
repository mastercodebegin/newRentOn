import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Theme = async () => {
  let value = await AsyncStorage.getItem('theme')
 return value == "Blue" ? COLORSBLUE : COLORS
}

export const COLORS = 
{
  TRANSPARENT: 'transparent',
  white: 'rgb(255,255,255)',
  grey:'#ccc',
  black: 'rgb(0,0,0)',
  orange:'#ff0017',
  neonOrange:'#FF5F1F',
  voilet:'#5c3463',
  ProductView:'#faf9fa',
  //purple:'#3b2164',
  purple:'#002f31',
  activeBorderColor:'#1ccea4',
inActiveBorderColor:'#d1d1d1',
  darkBlue: '#08142e',
  //themeBlue:'#5a72dd',
  themeBlue:'#002f31',
  blue:'#0096FF',
  welcomeButtonColor:'transparent',
  welcomeTextColor:'#ccc',
  borderColor:'#d3d3d3',
  placeHolderTextColor:'#dfdfdf',
  borderBottomColor:'#e1e1e4',
  utilitiesTextColor:'#8b8b8b',
  modalBlack: 'rgba(0, 0, 0, 0.5)',
  transparentBlack: 'rgba(0, 0, 0, 0.5)',
  transparentWhite: 'rgba(255, 255, 255, 0.4)',
  //orangeTheme:'#ffac5f',
  orangeTheme:'#002f31',
  lightGreen:'#f7faf9',
  profileBgColor:'#c2c6c6',
  profileTextColor:'#526b9d'
}

export const COLORSBLUE = 
{
  TRANSPARENT: 'transparent',
  white: 'rgb(255,255,255)',
  grey:'#ccc',
  black: 'rgb(0,0,0)',
  orange:'#ff0017',
  neonOrange:'#FF5F1F',
  voilet:'#5c3463',
  ProductView:'#faf9fa',
 //purple:'#3b2164',
  purple:'#5a72dd',
  activeBorderColor:'#1ccea4',
inActiveBorderColor:'#d1d1d1',
  darkBlue: '#08142e',
  themeBlue:'#5a72dd',
  //themeBlue:'#002f31',
  blue:'#0096FF',
  welcomeButtonColor:'transparent',
  welcomeTextColor:'#ccc',
  borderColor:'#d3d3d3',
  placeHolderTextColor:'#dfdfdf',
  borderBottomColor:'#e1e1e4',
  utilitiesTextColor:'#8b8b8b',
  modalBlack: 'rgba(0, 0, 0, 0.5)',
  transparentBlack: 'rgba(0, 0, 0, 0.5)',
  transparentWhite: 'rgba(255, 255, 255, 0.4)',
  //orangeTheme:'#ffac5f',
  orangeTheme:'#002f31',
  lightGreen:'#f7faf9',
  profileBgColor:'#c2c6c6',
  profileTextColor:'#526b9d'
}
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { scaledSize } from '../helper/util/Utilities'
import { COLORS, Fonts } from '../utilits/GlobalAssets'
import { Button } from 'react-native-paper'

interface S{
  title?:string,
  onPress:Function
  height?:number,
  width?:number,
  btnTextColor?:string
  style?:any
}

export default function GradientButton(props:S) {
  return (
   
            <Button mode="outlined" onPress={()=>props.onPress()}
            style={{...props.style,width:scaledSize(props.width?props.width:100),
              height:scaledSize(props.height?props.height:40),
              
              justifyContent: 'center',alignItems: 'center'}}
              color={props.btnTextColor}
            >
              {props.title?props.title:'submit'}
            </Button>
 
  )
}

export const styles = StyleSheet.create({
    mainView: {
      flex: 1,
      
    },
    // linearGradient: {
    //     flex: 1,
    //     paddingLeft: 15,
    //     paddingRight: 15,
    //     borderRadius: 14,
      
    //   },
    
})
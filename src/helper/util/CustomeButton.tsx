import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { heightFromPercentage,scaledSize } from './Utilities'

interface S{
 name:string,
 onPress:any,
 style:{}

}
export default function CustomeButton(props:S) {
  useEffect(()=>{
    console.log(props);
    
  })
  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.view,{...props.style}]}>
        <Text style={styles.buttonName}>{props.name}</Text>
    </TouchableOpacity>

  )
}
const styles = StyleSheet.create({
  view: {
    flex:1,
    backgroundColor: '#4539aa',
    // marginTop: scaledSize(26),
    borderRadius: scaledSize(8),
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonName:{
    fontSize: scaledSize(17), 
    fontWeight: 'bold', 
    color: 'white',
    letterSpacing:1
    

  }

})
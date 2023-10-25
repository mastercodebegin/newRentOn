import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { scaledSize } from '../helper/util/Utilities'

export default function CustomeButton(props:any) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={ [styles.view,{backgroundColor:props.bgcolor?props.bgcolor:'#4539aa',
      elevation:props.elevation?props.elevation:0,
      }]}>
        <Text style={[styles.buttonName,{color:props.color?props.color:'white',
      fontWeight: props.fontweight?props.fontweight:'bold',fontSize:props.fontSize
      }]}>{props.name}</Text>
      </View>
    </TouchableOpacity>

  )
}
const styles = StyleSheet.create({
  view: {
    height: 8,
    backgroundColor: '#4539aa',
    // marginTop: scaledSize(26),
    borderRadius: scaledSize(8),
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  buttonName:{
    fontSize: scaledSize(17), 
    fontWeight: 'bold', 
    color: 'white'
    

  }

})
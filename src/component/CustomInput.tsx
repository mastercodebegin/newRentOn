import { View, Text } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'
interface S {
    placeholder: string
    onChangeText: Function
    defaultValue?: string

}
export default function CustomInput(props:S) {
  return (
    <TextInput 
    style={{borderBottomWidth:0,
    backgroundColor:'transparent',}} 
    placeholder={props.placeholder?props.placeholder:'type something'}
    theme={{ colors: { primary: 'red',}} }
    onChangeText={(v)=>props.onChangeText(v)}
    defaultValue={props.defaultValue?props.defaultValue:''}
    
    />
  )
}
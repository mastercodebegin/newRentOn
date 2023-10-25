import { View, Text } from 'react-native'
import React from 'react'
import { rupee } from '../utilits/GlobalImages'
import { Image } from 'react-native'

export default function CustomIcon({icon}) {
  return (
    <View style={{flex:1}}>

        <Image source={icon} style={{height:14,width:14}}/>
    </View>
  )
}
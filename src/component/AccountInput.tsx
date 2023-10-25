
import React,{useState} from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers'
import { scaledSize } from '../helper/util/Utilities'
import { COLORS } from '../utilits/GlobalAssets'

export default function AccountInputField(props:any) {
    const [fieldIsFocus,setFieldIsFocus] = useState(false)
    return (
        <View style={props.design ? [props.design,{borderBottomColor:fieldIsFocus?COLORS.themeBlue:COLORS.borderBottomColor}] : [styles.view,{borderBottomColor:fieldIsFocus?COLORS.themeBlue:COLORS.borderBottomColor}]}>
             <Text
            style={{
              color: props.headingColor ? props.headingColor : COLORS.grey,
              marginLeft: scaledSize(3),
              marginTop: scaledSize(-24),
              //marginBottom: scaledSize(10),
              position: 'absolute',
              width: '300%',
            }}
          >
            {props.heading}
          </Text>
          <View style={{marginTop:scaledSize(-10),width:'300%',flexDirection:'row'}}>
            <TextInput 
                placeholder={props.keys}
                style={props.style ? props.style : [styles.textInput,{color: props.inputTextColor ? props.inputTextColor : COLORS.black}]}
                onChangeText={props?.onchangeValue}
                placeholderTextColor={ props.placeholderTextColor ? props.placeholderTextColor :'#797979' }
                multiline={true}
                editable={props.editable ? false : true}
                numberOfLines={props.number ? props.number : 1}
                onFocus={()=>setFieldIsFocus(true)}
                onBlur={()=>setFieldIsFocus(false)}
                keyboardType={props?.keyboardType}
        secureTextEntry={props.secure}
                // value={value}
                defaultValue={props.defaultValue}
                value={props.value}
                maxLength={props.maxLength?props.maxLength:200}
            />
         
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    view:{
        flexDirection:'row',
        marginTop:scaledSize(40),
        marginLeft:scaledSize(25),
        borderBottomWidth: scaledSize(.5),
        borderBotoomRadius: scaledSize(8), 
        borderBottomColor: COLORS.borderBottomColor,
        width:'80%',
        marginBottom:scaledSize(20)
        //  marginTop: scaledSize(14) 
    },
    textInput: {
        textAlign: 'left',
        // marginTop: scaledSize(8),
        fontSize: scaledSize(16),
        fontWeight:'700', 
        width:'27%',
        marginBottom:scaledSize(-5),
        marginRight:scaledSize(20),
        //marginLeft: scaledSize(10),
        flex:1
       

    }
})

import React,{useState} from 'react'
import { View, Text, TextInput, StyleSheet, Image } from 'react-native'
import { scaledSize } from '../helper/util/Utilities'
import { COLORS } from '../utilits/GlobalAssets'
import { InputFieldUserIcon } from '../utilits/GlobalImages'

export default function InputField(props:any) {
    const [fieldIsFocus,setFieldIsFocus] = useState(false)
    return (
      <>
         {props.location ? 
             <Text
            style={{
              color: COLORS.orange,
              marginLeft: scaledSize(5),
              marginTop: scaledSize(-14),
              marginBottom: scaledSize(10),
              position: 'absolute',
              width: '300%',
            }}
          >
            {props.location}
          </Text>
          : null }
        <View style={[styles.view,{borderBottomColor:fieldIsFocus?COLORS.THEME_COLOR:COLORS.grey}]}>
        
            <TextInput 
                placeholder={props.Placeholder}
                style={props.style ? props.style : [styles.textInput,{color: props.inputTextColor ? props.inputTextColor : COLORS.black}]}
                onChangeText={props?.onchangeValue}
                placeholderTextColor={ props.placeholderTextColor ? props.placeholderTextColor :COLORS.grey }
                multiline={true}
                editable={props.editable ? false : true}
                //numberOfLines={3}
                onFocus={()=>setFieldIsFocus(true)}
                onBlur={()=>setFieldIsFocus(false)}
                textContentType={props?.textContentType}
                dataDetectorTypes={props?.dataDetectorTypes} 
                keyboardType={props?.keyboardType}
                secureTextEntry={props?.secure}
                // value={value}
                defaultValue={props.value}
                // value={props.value}
                maxLength={props.maxLength?props.maxLength:200}
            />
            {props.icon ? 
            <Image source={InputFieldUserIcon} resizeMode='contain' style={styles.userImage}/>
       : null }
            </View>
            </>

    )
}

const styles = StyleSheet.create({
    view:{
        flex:1,
        borderBottomWidth: scaledSize(.5),
        borderBottomRadius: scaledSize(8), 
        //padding:scaledSize(10)
         // marginTop: scaledSize(-14) 
    },
    textInput: {
        textAlign: 'left',
        // marginTop: scaledSize(8),
        fontSize: scaledSize(16), 
        //marginLeft: scaledSize(10),
        flex:1
       

    },
    userImage:{
      height:scaledSize(19),
      width:scaledSize(19),
      position:'absolute',
      left:scaledSize(8),
      top:scaledSize(15)
    },
})
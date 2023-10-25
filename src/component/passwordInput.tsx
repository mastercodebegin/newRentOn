
import React,{useState} from 'react'
import { View, Text, TextInput, StyleSheet,Image, TouchableOpacity } from 'react-native'
import { scaledSize } from '../helper/util/Utilities'
import { COLORS } from '../utilits/GlobalAssets'
import { InputFieldUserIcon, passwordInVisible, passwordVisible } from '../utilits/GlobalImages'

export default function PasswordField(props:any) {
    const [fieldIsFocus,setFieldIsFocus] = useState(false)
    const [passVisible,setPassVisible] = useState(true)
    const visibilty = () =>{
if(passVisible){
  setPassVisible(false)
}
else{
  setPassVisible(true)
}
    }
    return (
      <>
       {props.location ? 
             <Text
            style={{
              color: COLORS.orange,
              marginLeft: scaledSize(5),
              marginTop: scaledSize(-5),
              marginBottom: scaledSize(10),
              position: 'absolute',
              width: '300%',
            }}
          >
            {props.location}
          </Text>
          : null }
        <View style={[styles.view,{borderBottomColor:fieldIsFocus?COLORS.orange:COLORS.borderBottomColorActive}]}>
            <TextInput 
                placeholder={props.Placeholder}
                style={props.style ? props.style : [styles.textInput,{color: props.inputTextColor ? props.inputTextColor : COLORS.black}]}
                onChangeText={props?.onchangeValue}
                placeholderTextColor={ props.placeholderTextColor ? props.placeholderTextColor :COLORS.grey }
                //multiline={true}
                editable={props.editable ? false : true}
                //numberOfLines={3}
                onFocus={()=>setFieldIsFocus(true)}
                onBlur={()=>setFieldIsFocus(false)}
                keyboardType={props?.keyboardType}
                secureTextEntry={passVisible}
                // value={value}
                defaultValue=''
                value={props.value}
                maxLength={props.maxLength?props.maxLength:200}
            />
             {props.icon ? 
            <Image source={InputFieldUserIcon} resizeMode='contain' style={styles.userImage}/>
       : null }
            <TouchableOpacity onPress={visibilty}>
            <Image source={passVisible ? passwordInVisible: passwordVisible} resizeMode='contain' style={styles.passwordImage}/>
            </TouchableOpacity>
        </View>
        </>

    )
}

const styles = StyleSheet.create({
    view:{
        flex:1,
        borderBottomWidth: scaledSize(.5),
        borderBottomRadius: scaledSize(8), 
        borderBottomColor: COLORS.borderBottomColorActive,
        marginTop: scaledSize(14) 
    },
    inputFieldChildView1: {
      //height: scaledSize(30),
      marginTop: scaledSize(10),
      marginBottom:scaledSize(30),
      width:'80%',
      marginLeft:scaledSize(30)
  },
    inputFieldLabel3: {
      fontSize: scaledSize(17),
      fontWeight: 'bold',
      marginBottom:scaledSize(10),
      marginLeft: scaledSize(32),
      marginTop:scaledSize(-25)

  },
  userImage:{
    height:scaledSize(19),width:scaledSize(19),position:'absolute',left:scaledSize(8),top:scaledSize(15)
  },
  passwordImage:{
    height:scaledSize(19),width:scaledSize(19),position:'absolute',right:scaledSize(10),top:scaledSize(-30)
  },
    textInput: {
        textAlign: 'left',
        // marginTop: scaledSize(8),
        fontSize: scaledSize(16), 
        marginLeft: scaledSize(10),
        flex:1
       

    }
})
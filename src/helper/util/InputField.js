import React,{useState} from 'react'
import { View, Text,StyleSheet,Image,TextInput } from 'react-native'
import Color from '../../assets/constants/GlobalAssests'
import emailIcon from '../../assets/user.png'


export default function InputField({props,onBlur,onChangeText,placeholder,imageIcon}) {
    const [isFieldFocused,setIsFieldFocused] = useState(false)
    const check=()=>{
        props.handleBlur('email')
        setIsFieldFocused(false)
    }
    return (
        <View style={[styles.inputAndIconFieldBorderColorView,
            { borderColor: isFieldFocused ? Color.activeBorderColor : "#d1d1d1", }]}>
                <Image source={emailIcon} style={styles.inputFieldIcon} />
                {/* test granch */}
                <TextInput
                     onFocus={() => setIsFieldFocused(true)}
                    onBlur={check}
                    style={[styles.textInputField,]}
                    placeholder={placeholder}
                    placeholderTextColor={'black'}
                    onChangeText={props.handleChange('email')}
                />
            </View>    )
}

const styles = StyleSheet.create({
    inputAndIconFieldBorderColorView: {
        height: 44,
        width: '100%',
        // backgroundColor:'yellow',
        // justifyContent:'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: "#d1d1d1"
    },
    inputFieldIcon: {
        height: 20,
        width: 20
    },
    textInputField: {
        width: '100%',
        // borderWidth:1,
        height: 44,
        marginLeft: 10,
        fontSize: 14,
        fontWeight: '600',
        color:'black',
        // backgroundColor:'red'
        
    },



})
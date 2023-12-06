import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { scaledSize } from '../helper/util/Utilities';
import { Fonts } from '../utilits/GlobalAssets';

export default function CustomDropDown({ data, onChange,label,defaultValue,style }) {
    const [isFocus, setIsFocus] = useState(false)
    const [value, setValue] = useState('');

  

    return (
        <View>
        <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: '#E0DFE4' },style]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            itemContainerStyle={{marginBottom:-8,marginTop:-8,marginLeft:-15,marginRight:-15}}
            itemTextStyle={styles.itemTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            containerStyle={styles.container}
            data={data}


            maxHeight={250}
            labelField="label"
            valueField="value"
            placeholder={ defaultValue?defaultValue:`Select ${label}`}
            searchPlaceholder="Search..."
             value={defaultValue}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
                setValue(item)
                onChange(item)
                setIsFocus(false);
            }}
        ></Dropdown>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { padding: 10,backgroundColor:'#FAF9F6',borderBottomEndRadius:scaledSize(15),borderBottomStartRadius:scaledSize(15)},
    dropdown: {
        flex:1,
        backgroundColor: '#FAF9F6',
        borderBottomColor: 'gray',
        // borderRadius:4,
        elevation:1,
        borderWidth: 1,
        padding:scaledSize(6),
        borderColor: '#E0DFE4',
        borderRadius: scaledSize(10),
        // marginBottom:scaledSize(10)
        // borderBottomWidth: 0.5,
    },
    itemContainer:{
        //backgroundColor:'red',
        padding:scaledSize(0),
        margin:scaledSize(0)
    },
    placeholderStyle: {
        fontSize: 14,
        left:10,
        color:'black'
    },
    selectedTextStyle: {
        fontSize: 14,
        left:10,
        color:'black'
    },
    itemTextStyle:{
        // borderRadius: scaledSize(25),
        color: 'black',
        fontFamily:Fonts.regular,
        paddingLeft: scaledSize(18),
        padding:scaledSize(9),
        borderRadius:scaledSize(10),
        // borderBottomWidth:,
        // borderWidth:1,
        borderColor:'#E0DFE4',
        elevation:5,
        backgroundColor:'#FAF9F6'
    },
    iconStyle: {
        width: 20,
        height: 20,
        right:10
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
       
    },
    icon: {
        marginRight: 5,
    },
    selectedStyle: {
        borderRadius: 12,
        
    },
});
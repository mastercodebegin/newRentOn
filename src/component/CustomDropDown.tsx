import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';

export default function CustomDropDown({ data, onChange,label,defaultValue }) {
    const [isFocus, setIsFocus] = useState(false)
    const [value, setValue] = useState('');


    return (
        <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}

            maxHeight={300}
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
    )
}

const styles = StyleSheet.create({
    container: { padding: 16 },
    dropdown: {
        flex:1,
        backgroundColor: '#FAF9F6',
        borderBottomColor: 'gray',
        borderRadius:4,
        elevation:1
        // borderBottomWidth: 0.5,
    },
    placeholderStyle: {
        fontSize: 16,
        left:10
    },
    selectedTextStyle: {
        fontSize: 14,
        left:10
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
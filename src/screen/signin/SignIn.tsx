import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import { scaledSize } from '../../helper/util/Utilities'
import { Fonts } from '../../utilits/GlobalAssets'
import { Logo } from '../../assets/constants/GlobalAssests'
import Icon from 'react-native-vector-icons/AntDesign'
import { ScrollView } from 'react-native-gesture-handler'

const SignIn = () => {

    const [password, setPassword] = useState('');
    const [isPasswordSecure, setIsPasswordSecure] = useState(true);

    return (
        <View style={{ flex: 1,backgroundColor:'#ffffff', justifyContent: 'center' }}>
            <ScrollView>

                <View style={{ flex: 1, alignItems: 'center', marginTop: 80 }}>
                    <View style={styles.imageView} >
                        <Image source={Logo.SignUpLogo} style={styles.image} resizeMode={'center'}/>
                    </View>
                    <View style={{ flex: 0.1, marginTop: scaledSize(20), justifyContent: 'space-around', backgroundColor: '#ffffff', alignItems: 'center' }}>
                        <Text style={styles.headingStyle}>Welcomen To Saifty!</Text>
                        <Text style={styles.textStyle}>Keep your data safe!</Text>
                    </View>
                    <View style={{ flex: 0.3, height: scaledSize(160), marginTop: scaledSize(20), backgroundColor: '#ffffff', justifyContent: 'space-around', borderRadius: scaledSize(10), padding: scaledSize(5) }}>
                        <View style={{ backgroundColor: '#f5f5f5', borderRadius: scaledSize(10), padding: scaledSize(5) }}>
                            <Text style={{ color: '#9294a7',marginLeft:scaledSize(10) }}>Email</Text>
                            <TextInput style={styles.textInput} underlineColor="transparent" />
                        </View>
                        <View style={{ backgroundColor: '#f5f5f5', borderRadius: scaledSize(10), padding: scaledSize(5) }}>
                            <Text style={{ color: '#9294a7',marginLeft:scaledSize(10) }}>Password</Text>
                            <TextInput
                                secureTextEntry={isPasswordSecure}
                                style={styles.textInput}
                                right={
                                    <TextInput.Icon
                                        name={() => <Icon name={isPasswordSecure ? "eyeo" : "eye"} size={18} color='black' />} // where <Icon /> is any component from vector-icons or anything else
                                        onPress={() => { isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true) }}
                                    />
                                }
                                value={password}
                                onChangeText={text => setPassword(text)}
                                // underlineColorAndroid='#FFF'
                                underlineColor="transparent"
                            />
                        </View>

                    </View>
                    <View>
                        <TouchableOpacity>
                            <View style={styles.buttonView}>
                                <Text style={styles.loginButton}>Login</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <View style={styles.passwordView}>
                                <Text style={styles.passwordText}>Forgot password?</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.registerView}>
                        
                        <Text style={{fontSize:scaledSize(16),color:'#777a8c',marginRight:scaledSize(5)}}>Don't have an account?</Text>
                        <TouchableOpacity>
                            <View >
                                <Text style={styles.passwordText}>Register!</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default SignIn

const styles = StyleSheet.create({

    headingStyle: {
        color: 'black',
        fontSize: scaledSize(20),
        fontWeight: 'bold'
    },

    textInput: {
        backgroundColor: '#f5f5f5',
        width: scaledSize(300),
        height: scaledSize(30),
        color: 'black'
    },

    registerView:{
        backgroundColor:'#ffffff',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:scaledSize(150)
    },

    textStyle: {
        fontSize: scaledSize(15),
        color: '#777a8c',
        marginTop:scaledSize(8)
    },

    passwordView:{
        margin:scaledSize(10)
    },
    passwordText:{
        color:'#5c7bed',
        fontSize:scaledSize(16),
        fontWeight:'500'
    },

    buttonView: {
        width: scaledSize(315),
        backgroundColor: '#5c7bed',
        height: scaledSize(50),
        borderRadius: scaledSize(10),
        padding: scaledSize(5),
        marginTop: scaledSize(10),
        justifyContent: 'center',
        alignItems: 'center'

    },

    loginButton:{
        fontSize:scaledSize(15),
        color:'#fff',
        fontWeight:'bold'
    },
    imageView: {
        flex: 0.2,
        // backgroundColor: 'yellow'
    },

    image: {
        width: scaledSize(138),
        height: scaledSize(94),

    }
})
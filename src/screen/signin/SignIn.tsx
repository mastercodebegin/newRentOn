import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TextInput } from 'react-native-paper'
import { scaledSize } from '../../helper/util/Utilities'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Fonts } from '../../utilits/GlobalAssets'
import { Logo,Color } from '../../assets/constants/GlobalAssests'
import Icon from 'react-native-vector-icons/AntDesign'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux';
import CustomeButton from '../../helper/util/CustomeButton'
import SpinnerHelper from '../../helper/SpinnerHelper';
import { getMyProfileInitiate } from '../../context/actions/Actions';
import SignInReducer from './SignInReducer';
import { getSignInInitiate } from './SignInSlice';
// import { RootState } from '../../context/reducers/RootReducer';

const SignIn = ({navigation}) => {

    
    // const [email, setEmail] = React.useState('aliaijaz96@gmail.com')
    // const [password, setPassword] = React.useState('Aijaz@96')
    const [isPasswordSecure, setIsPasswordSecure] = useState(true)
    const [isEmailFocused, setIsEmailFocused] = React.useState(false)
    const [isPasswordFocused, setIsPasswordFocused] = React.useState(false)
    const [isSubmitted, setIsSubmitted] = React.useState(false)
    const [isLoading, setIsLoading] = useState(false)
    // const response = useSelector((state:RootState) => state.SignInSlice)
    const response = useSelector((state) => state)

    const dispatch = useDispatch()



    useEffect(()=>{
        console.log('reducer====',response)
        
    },)
   const stopLoader = () => {
        setIsLoading(false)

    }

    const handleFocus = (value) => {
        if (value == 'email') { setIsEmailFocused(true) }
        else if (value == 'password') { setIsPasswordFocused(true) }
        else { console.warn('didnt get value') }
    }

    const handleBlur = (value) => {
        if (value == 'email') { setIsEmailFocused(false) }
        else if (value == 'password') { setIsPasswordFocused(false) }
        else { console.warn('didnt get value') }
    }

    const LoginSchema = Yup.object({
        // email: Yup.string().required('Required').email('Invalid email'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(2, 'Too Short!').max(10, 'Too Long!').required('Required')
    })

    const submit = (values) => {
        console.log('=================',values)
        // console.log('values')
        // let data = {
        //     name:email,
        //     job:password
        // }
        //@ts-igonre
        dispatch(getSignInInitiate(values))
        setIsSubmitted(true)
        // setIsLoading(true)
        // dispatch(loginInitiate(data))

    }


    const navigateTo = (route) => {
        navigation.navigate(route)

    }




    

    useEffect(() => {
        if (isSubmitted == true) {

            setIsLoading(true)

            if (response) {
              console.log("response in SignIn",response)
                    // navigateTo('UserRequirements')

                }
                else {
                    console.log('Error', response)
                    alert(response)

                
            }
        }
        console.log("response--",response)
    },[])

    return (
        <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={(values) => submit(values)} 
    >
        {({ handleChange, handleBlur,touched, errors, handleSubmit, values }) => (
        <View style={styles.mainView}>

            <View style={styles.logo} >
                <Image source={Logo.SignUpLogo} style={styles.logoImage} resizeMode={'center'} />
            </View>

            <ScrollView>

                <View style={styles.container}>

                    <View style={styles.headingView}>
                        <Text style={styles.headingStyle}>Welcomen To Saifty!</Text>
                        <Text style={styles.textStyle}>Keep your data safe!</Text>
                    </View>
                    <View style={styles.inputFieldMainView}>
                        <View style={[styles.inputFieldView,{ borderColor: isEmailFocused ? Color.activeBorderColor : Color.inActiveBorderColor, marginTop: 10 }]}>
                            <Text style={styles.inputFieldLable}>Email</Text>
                            <TextInput 
                            style={styles.inputTextStyle}
                            onFocus={() => handleFocus('email')}
                            onBlur={() => handleBlur('email')}
                            value={values.email}
                            underlineColor="transparent"
                            onChangeText={handleChange('email')} 
                            />
                        </View>

                        {errors.email && touched.email ? <View style={{marginTop:scaledSize(20),left:scaledSize(15)}}><Text style={{color:'red'}}>{errors.email}</Text></View> : null}
                        <View style={[styles.inputFieldView,{ borderColor: isPasswordFocused ? Color.activeBorderColor : Color.inActiveBorderColor, marginTop: 25 }]}>
                            <Text style={styles.inputFieldLable}>Password</Text>
                            <TextInput
                                secureTextEntry={isPasswordSecure}
                                style={styles.inputTextStyle}
                                onFocus={() => handleFocus('password')}
                                onBlur={() => handleBlur('password')}
                                right={
                                    <TextInput.Icon
                                        name={() => <Icon name={isPasswordSecure ? "eyeo" : "eye"} style={{top:scaledSize(-12)}} size={18} color='black' />} // where <Icon /> is any component from vector-icons or anything else
                                        onPress={() => { isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true) }}
                                    />
                                }
                                value={values.password}
                                onChangeText={handleChange('password')}
                                // underlineColorAndroid='#FFF'
                                underlineColor="transparent"
                            />
                        </View>
                        {touched.password && errors.password && <View style={{marginTop:scaledSize(20),left:scaledSize(15)}}><Text style={{color:'red'}}>{errors.password}</Text></View>}

                    </View>
                    <View style={styles.buttonView}>
                        {/* <TouchableOpacity onPress={() => submit()} >
                            <View style={styles.buttonView}>
                                <Text style={styles.loginButton}>Login</Text>
                            </View>
                        </TouchableOpacity> */}
                         <CustomeButton name={'Sign-up'} onPress={handleSubmit} style={{backgroundColor:Color.activeBorderColor}}/>

                    </View>
                    <View>
                        <TouchableOpacity>
                            <View style={styles.passwordView}>
                                <Text style={styles.passwordText}>Forgot password?</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.registerView}>

                        <Text style={{ fontSize: scaledSize(16), color: '#777a8c', marginRight: scaledSize(5) }}>Don't have an account?</Text>
                        <TouchableOpacity onPress={()=>{navigateTo('SignUp')}}>
                            <View >
                                <Text style={styles.passwordText}>Register!</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            {/* <SpinnerHelper isLoad={response?.isLoading ? true : false} /> */}
        </View>
        )}</Formik>
    )
}

export default SignIn

const styles = StyleSheet.create({

    mainView : { 
        flex: 1, 
        backgroundColor: '#ffffff', 
        justifyContent: 'center' 
    },
    
    container :{ 
        flex: 1, 
        alignItems: 'center' 
    },

    headingView : { 
        flex: 0.1, 
        marginTop: scaledSize(25), 
        justifyContent: 'space-around', 
        backgroundColor: '#ffffff', 
        alignItems: 'center' 
    },
    
    headingStyle: {
        color: 'black',
        fontSize: scaledSize(20),
        fontWeight: 'bold'
    },

    inputTextStyle: {
        backgroundColor: '#f5f5f5',
        width: scaledSize(300),
        height: scaledSize(25),
        color: 'black'
    },

    inputFieldMainView : { 
        flex: 0.3, 
        height: scaledSize(160), 
        marginTop: scaledSize(25), 
        backgroundColor: '#ffffff', 
        justifyContent: 'space-around', 
        borderRadius: scaledSize(10), 
        padding: scaledSize(10) 
    },

    inputFieldView : { 
        backgroundColor: '#f5f5f5', 
        borderRadius: scaledSize(10), 
        padding: scaledSize(5) 
    },

    inputFieldLable : { 
        color: '#9294a7', 
        marginLeft: scaledSize(10),
        top:3
        // paddingTop: scaledSize(10)
    },

    registerView: {
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: scaledSize(180)
    },

    textStyle: {
        fontSize: scaledSize(15),
        color: '#777a8c',
        marginTop: scaledSize(8)
    },

    passwordView: {
        margin: scaledSize(10)
    },
    passwordText: {
        color: '#5c7bed',
        fontSize: scaledSize(16),
        fontWeight: '500'
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

    loginButton: {
        fontSize: scaledSize(15),
        color: '#fff',
        fontWeight: 'bold'
    },
    logo: {
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },

    logoImage: {
        // width: scaledSize(180),
        width: '90%',
        height: scaledSize(94),

    }
})
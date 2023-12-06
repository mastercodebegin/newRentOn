import React from 'react'
import { StyleSheet } from 'react-native'
import Color from '../../assets/constants/GlobalAssests';
import { heightFromPercentage, scaledSize, widthFromPercentage } from '../../helper/util/Utilities'
import { COLORS } from '../../utilits/GlobalAssets';
import { Colors } from 'react-native-paper';


export const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    textView: {
        flexDirection: 'row',
        //backgroundColor:'green',
        width: '30%',
        alignItems: "center",
        //position:'absolute',
        //bottom:scaledSize(60),
        justifyContent: 'space-between',
        //marginTop: scaledSize(20),
        // backgroundColor:'#1f1646'
    },
    goBack:
    {
        //position: 'absolute',
        //zIndex:2,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        //left: scaledSize(20),
        // top: scaledSize(0),
        // height:60,
        //width:60,
        //marginLeft: scaledSize(15)
    },
    productImage:
    {
        marginTop: scaledSize(20),
        width: scaledSize(135),
        height: scaledSize(120),
        marginLeft: scaledSize(5),
        marginRight: scaledSize(5),
        alignItems: 'center'
    },

    productName: {
        fontSize: scaledSize(11), textAlign: 'center', maxWidth: scaledSize(120), justifyContent: 'center', alignItems: 'center', color: COLORS.black, fontFamily: 'Cormorant-Bold', marginTop: scaledSize(20), top: scaledSize(-10), marginRight: scaledSize(20), left: scaledSize(8), padding: scaledSize(1)
    },
    productPrice: {
        fontSize: scaledSize(11),
        textAlign: 'center',
        maxWidth: scaledSize(120),
        justifyContent: 'center',
        alignItems: 'center',
        color: 'red',
        fontFamily: 'Cormorant-Bold',
        top: scaledSize(-10),
        marginRight: scaledSize(20),
        left: scaledSize(8),
        padding: scaledSize(1)
    },
    productView: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderRadius: scaledSize(20),
        borderColor: COLORS.placeHolderTextColor,
        top: scaledSize(-10),
        margin: scaledSize(10),
        marginLeft: scaledSize(10),
        height: scaledSize(200)
    },
    screen1Border8: {
        fontSize: scaledSize(10), textAlign: 'center', maxWidth: scaledSize(60), justifyContent: 'center', alignItems: 'center', color: COLORS.black, fontFamily: 'Cormorant-Bold', marginTop: scaledSize(10), top: scaledSize(-10), marginRight: scaledSize(20), left: scaledSize(15), padding: scaledSize(1)
    },
    screen1Border9: {
        backgroundColor: COLORS.white, borderWidth: .5, borderRadius: scaledSize(70), borderColor: COLORS.grey, margin: scaledSize(10), marginLeft: scaledSize(15), height: scaledSize(60), width: scaledSize(60)
    },
    scrollViewImageSize: { marginTop: scaledSize(15), width: scaledSize(25), height: scaledSize(25), marginLeft: scaledSize(5), marginRight: scaledSize(5) },

    titleDelete: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#000',
    },
    buttonDelete: {
        paddingHorizontal: scaledSize(8),
        paddingVertical: scaledSize(4),
        position: 'absolute',
        top: scaledSize(10),
        right: scaledSize(10),
        backgroundColor: COLORS.borderBottomColor,
        borderRadius: scaledSize(4),
    },
    pdfIcon1: {
        height: scaledSize(10),
        borderRadius: 90,
        position: 'absolute',
        width: scaledSize(10),
        resizeMode: 'contain',
        backgroundColor: '#87CEEB',
        top: 5, right: -100, bottom: 10, justifyContent: 'space-between', alignItems: 'center', alignContent: 'space-between'
    },
    viewBtnText: {
        color: "#fff",
        textAlign: "center",
        padding: scaledSize(3),
        fontSize: scaledSize(16)
    },
    viewBtn2: {
        backgroundColor: COLORS.orange,
        paddingVertical: 8,
        borderRadius: 4,
        width: "45%",
        justifyContent: 'center',
        marginRight: scaledSize(10),
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: scaledSize(20),
        marginBottom: scaledSize(20),
        //top:scaledSize(-190),
        borderWidth: 1,
        borderColor: COLORS.orange
    },
    viewBtn: {
        backgroundColor: COLORS.activeBorderColor,
        paddingVertical: 8,
        borderRadius: 4,
        width: "45%",
        marginLeft: scaledSize(10),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: scaledSize(20),
        marginBottom: scaledSize(20),
        //top:scaledSize(-190),
        borderWidth: 1,
        borderColor: COLORS.activeBorderColor
    },
    titleInput: {
        color: COLORS.black,
        //top: scaledSize(-10),
        //marginTop: scaledSize(-10),
        // textAlign:'center',
        letterSpacing: 1,
        fontFamily: 'Quicksand-Bold',
        // marginTop:scaledSize(10),
        fontSize: scaledSize(15),
    },
    customButton: {
        color: COLORS.white, fontSize: scaledSize(16),
        textAlign: 'center'
    },
    logButton: {
        height: heightFromPercentage(8),
        backgroundColor: COLORS.purple,
        marginTop: scaledSize(26),
        borderRadius: scaledSize(8),
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center'
    },
    logButton2: {
        height: heightFromPercentage(8),
        backgroundColor: COLORS.orange,
        marginTop: scaledSize(26),
        borderRadius: scaledSize(8),
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center'
    },
    Button: {
        height: heightFromPercentage(7),
        backgroundColor: COLORS.themeBlue,
        marginTop: scaledSize(15),
        marginLeft: scaledSize(-15),
        borderRadius: scaledSize(8),
        justifyContent: 'center',
        borderWidth: scaledSize(0.5),
        borderColor: COLORS.themeBlue,
        marginBottom: scaledSize(20),
        alignItems: 'center',
        width: '83%',
        alignSelf: 'center'
    },
    inputFieldChildView4: {
        height: scaledSize(45),
        marginTop: scaledSize(-5),
        marginBottom: scaledSize(30),
        width: '80%',
        marginLeft: scaledSize(30)
    },
    inputFieldLabel3: {
        fontSize: scaledSize(17),
        fontWeight: 'bold',
        marginBottom: scaledSize(10),
        marginLeft: scaledSize(32),
        marginTop: scaledSize(-25)

    },
    inputFieldLabel2: {
        fontSize: scaledSize(8),
        letterSpacing: .5,
        //fontWeight: 'bold',
        marginBottom: scaledSize(10),
        marginLeft: scaledSize(250),
        marginRight: scaledSize(30),
        marginTop: scaledSize(-20)

    },
    inputFieldLabel4: {
        fontSize: scaledSize(9),
        letterSpacing: .5,
        //fontWeight: 'bold',
        marginBottom: scaledSize(10),
        marginLeft: scaledSize(200),
        marginRight: scaledSize(30),
        marginTop: scaledSize(-20)

    },
    inputFieldChildView1: {
        height: scaledSize(60),
        marginTop: scaledSize(-15),
        marginBottom: scaledSize(30),
        width: '80%',
        marginLeft: scaledSize(30)
    },
    header: {
        height: 150,
        // backgroundColor: 'tomato',
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerImage: {
        height: 150,
        width: '90%'
    },
    containor: {
        flex: 1,
        // backgroundColor:'yellow',
        // marginTop: 50,
        alignItems: 'center'
    },
    logInSignUpTextParentView: {
        // flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
        // height: 10,
        // width: '70%',
        // backgroundColor:'black'

    },
    logInSignUpTextChildView: {
        width: '48%', height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        flexDirection: 'column',
        //backgroundColor: 'yellow',
        // borderBottomWidth: 1
    },
    signUpLoginViewBorder: {
        width: '100%',
        marginLeft: 1,
        height: 5.4,
        backgroundColor: Color.activeBorderColor,
        marginTop: 8
    },
    logInSignUpText: {
        fontSize: 18,
        // fontVariant:'',
        fontWeight: 'bold',
    },
    loginInputBox: {
        height: 40,
        width: 200

    },
    inputFieldMainView: {
        width: '85%',
        // marginTop: 20,
        // backgroundColor:'red',
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,


    },
    inputAndIconFieldBorderColorView: {
        height: 44,
        width: '100%',
        // backgroundColor:'yellow',
        // justifyContent:'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: Color.inActiveBorderColor
    },
    textInputField: {
        width: '100%',
        // borderWidth:1,
        height: 44,
        marginLeft: 10,
        fontSize: 14,
        fontWeight: '800',
        color: 'black',
        // backgroundColor:'red'

    },
    inputFieldIcon: {
        height: 20,
        width: 20
    },
    forgotPasswordView: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    forgotPasswordText: {
        fontSize: 14,
        fontWeight: "400",
        color: 'black'
    },
    clickHereLink: {
        fontSize: 14,
        left: scaledSize(-10),
        letterSpacing: 1,
        //fontWeight: 'bold',
        color: Color.activeBorderColor
    },
    submitButtonView: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: '#22d1aa',
        width: '50%', borderRadius: 8

    },
    logo: {
        height: heightFromPercentage(10),
        width: widthFromPercentage(10)
    },
    wrapper: {},
    view: {
        height: heightFromPercentage(8),
        backgroundColor: COLORS.orange,
        marginTop: scaledSize(26),
        borderRadius: scaledSize(18),
        bottom: scaledSize(50),
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    slide1: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'white'
    },
    slide2: {
        flex: 1,
        backgroundColor: 'white'
    },
    slide3: {
        flex: 1,
        backgroundColor: 'white'
    },
    text: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold'
    },
    skipText: {
        fontSize: scaledSize(13),
        color: 'grey',
        marginRight: scaledSize(14),
        fontWeight: '400'
    },
    image: {
        height: scaledSize(150),
        //backgroundColor:'red',
        justifyContent: 'center',
        right: scaledSize(4),
        width: scaledSize(150),
        marginTop: scaledSize(10)
    },
    slideChildView: {
        flex: .2,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    textInput: {
        textAlign: 'left',
        color: 'black',
        width: '85%',
        marginBottom: scaledSize(-10),
        // marginTop: scaledSize(8),
        //padding:scaledSize(5),
        fontSize: scaledSize(14),
        //marginLeft: scaledSize(20),
        flex: 1


    },
    ecomCaption: {
        textAlign: 'center',
        fontSize: scaledSize(18),
        top: scaledSize(-10),
        color: COLORS.orange
    },
    loginTop: { marginTop: scaledSize(20) },
    loginButton: { width: '90%', marginLeft: scaledSize(15), marginTop: scaledSize(-10), marginBottom: scaledSize(10) },
    loginButton2: { width: '90%', marginLeft: scaledSize(15), top: scaledSize(-40) },
    forwordHeight: { marginTop: scaledSize(40) },
    forwardButton: {
        color: COLORS.white, fontSize: scaledSize(15), letterSpacing: 1,
        //fontWeight: 'bold',
        textAlign: 'center',
    },
    signButton: {
        fontSize: scaledSize(17),
        //fontWeight: 'bold',
        fontWeight: '600',
        color: COLORS.white
    },
    commonView: {
        marginTop: 10,
        // backgroundColor:'red'
    },
    specificationLabel: {
        color: 'gray',
        fontSize: 14,
    },
    specificationValue: {
        color: 'black',
        fontSize: 14,
        fontWeight:'500'
    },
    child: { justifyContent: 'center' },
    text: { fontSize: 22, textAlign: 'center' },
    signupText: { flexDirection: 'row', marginTop: scaledSize(10), justifyContent: 'center', alignItems: 'center' },
    forgotpasswordHeading: { color: COLORS.black, top: scaledSize(20), letterSpacing: 1, textAlign: 'center', fontWeight: 'bold', fontSize: scaledSize(16), marginBottom: scaledSize(20) },
    image1: { height: scaledSize(30), width: scaledSize(30) },
    imageCenter: { height: scaledSize(30), width: scaledSize(30), marginLeft: scaledSize(20), marginRight: scaledSize(20) },
    imageView: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: scaledSize(15) },
    imageOrText: { color: COLORS.darkgrey, fontSize: scaledSize(15), marginTop: scaledSize(-10), textAlign: 'center', marginBottom: scaledSize(10) },
    imageOrText2: { color: COLORS.darkgrey, fontSize: scaledSize(15), textAlign: 'center', marginBottom: scaledSize(20) },
    imageOrText1: { color: COLORS.themeBlue, fontSize: scaledSize(13), textAlign: 'center', marginBottom: scaledSize(20), letterSpacing: 1 }


})
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { capitalizeFirstLetter, heightFromPercentage, scaledSize } from '../../helper/util/Utilities'
import HeaderComponent from '../../component/HeaderComponent'
import { COLORS } from '../../utilits/GlobalAssets'
import { Image } from 'react-native'
import { AddAddress, Delete, Home, backIcon, bulb, location, locationColor } from '../../utilits/GlobalImages'
import GradientButton from '../../component/GradientButton'
import CustomeButton from '../../helper/util/CustomeButton'
import InputField from '../../component/InputField'
import { Modalize } from 'react-native-modalize'
import { Fonts } from '../../utilits/GlobalAssets'
import { useDispatch, useSelector } from 'react-redux'
import { createAddress, deleteAddress, getAllAddress, markAddressPrimary, showAddressModalWindow, updateAddress } from './AddressSlice'
import { Dropdown } from 'react-native-element-dropdown';
import CustomDropDown from '../../component/CustomDropDown'
import { CutomToastFail, CutomToastSuccess, showPopupWithOkAndCancel } from '../../component/CustomToastMessage'
import { showMessage } from "react-native-flash-message";
import { Button, TextInput } from 'react-native-paper'
import CustomSpinner from '../../component/CustomSpinner'
import ConfirmationModal from '../../component/ConfirmationModal'
import CustomInput from '../../component/CustomInput'

const info = [




    {
        id: 4,
        first_name: 'Trident Hotel2',
        isPrimary: false,
        last_name: 'Porchid, Los Angeles',
        //image: house2,
        addressType: 'Personal',
        adress: 'Hafeezpet road building no:- 7/346',
        landmark: 'azad ncc',
        city: 'Delhi',
        state: 'GA',
        pincode: '45202',
        mobile: 5555556666,
        cost: 650
    },
    {
        id: 5,
        first_name: 'Trident Hotel3',
        isPrimary: false,
        last_name: 'Porchid, Los Angeles',
        //image: house2,
        addressType: 'Home',
        adress: '9853 Madina Nagar Nizamuddin Gali',
        landmark: 'azad ncc',
        city: 'Agra',
        state: 'GA',
        pincode: '45202',
        mobile: 5555556666,
        cost: 650
    },
    {
        id: 5,
        first_name: 'Trident Hotel3',
        isPrimary: false,
        last_name: 'Porchid, Los Angeles',
        //image: house2,
        addressType: 'Personal',
        adress: '9853 madina nagar nizamuddin gali',
        landmark: 'azad ncc',
        city: 'Agra',
        state: 'GA',
        pincode: '45202',
        mobile: 5555556666,
        cost: 650
    },
    {
        id: 5,
        first_name: 'Trident Hotel3',
        isPrimary: false,
        last_name: 'Porchid, Los Angeles',
        //image: house2,
        addressType: 'Home',
        adress: '9853 madina nagar nizamuddin gali',
        landmark: 'azad ncc',
        city: 'Agra',
        state: 'GA',
        pincode: '45202',
        mobile: 5555556666,
        cost: 650
    }
]
// const item = {
//     id: 5,
//     first_name: 'Trident Hotel3',
//     isPrimary: false,
//     last_name: 'Porchid, Los Angeles',

//     //image: house2,
//     addressType: 'personal',
//     adress: '334 madina nagar hazrat nizamuddin gali azad nagar indore  azad nagar indore',
//     landmark: 'azad ncc',
//     city: 'Agra',
//     state: 'GA',
//     pincode: '45202',
//     mobile: 5555556666,
//     cost: 650
// }



export default function AddressList({ screenName }) {
    const [addressID, setAddressID] = useState(0)
    const [addressType1, setAddressType1] = useState(true)
    const [addressType2, setAddressType2] = useState(false)
    const [updateaddressType1, setupdateAddressType1] = useState(true)
    const [updateaddressType2, setupdateAddressType2] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isUpdateModalVisible, setisUpdateModalVisible] = useState(false)
    let myRefAdd = useRef<any>({})
    let updateAddressRef = useRef<any>({})
    const dispatch = useDispatch()
    const [addressType, setAddressType] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [address, setAddress] = useState('')
    const [landmark, setLandmark] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [zipCode, setZipCode] = useState('')

    const [updateaddressType, setupdateAddressType] = useState('')
    const [updatefirstName, setupdateFirstName] = useState('')
    const [updatelastName, setupdatelastName] = useState('')
    const [updateaddress, setupdateAddress] = useState('')
    const [updatelandmark, setupdateLandmark] = useState('')
    const [updatestate, setupdateState] = useState('')
    const [updatecity, setupdateCity] = useState('')
    const [updatezipCode, setupdateZipCode] = useState('')

    const [addressId, setAddressId] = useState(0)
    const [addressSort, setAddressSort] = useState([])
    const [isShowConfirmationBox, setIsShowConfirmationBox] = useState(false)
    const [isgetAllAddressActionDisptach, setIsgetAllAddressActionDisptach] = useState(false)
    const addressList = useSelector((state: any) => state.AddressSlice)

    let addressObject = {
        "firstName": firstName,
        "lastName": lastName,
        "id": addressId,
        "address": address,
        "addressType": addressType,
        "state": state,
        "city": city,
        "zipCode": zipCode,
        "landMark": landmark,
        "primary": false

    }
    let updateAddressObject = {
        "firstName": updatefirstName,
        "lastName": updatelastName,
        "id": addressId,
        "address": updateaddress,
        "addressType": updateaddressType,
        "state": updatestate,
        "city": updatecity,
        "zipCode": updatezipCode,
        "landMark": updatelandmark,
        "primary": false

    }
    const data = [
        { label: 'INDORE', value: '1' },
        { label: 'RAO', value: '2' },
        { label: 'MAHO', value: '3' },

    ];
    useEffect(() => {
        console.log('screenname--------------------------------', addressList);
        console.log('screenname--------------------------------', city);
        if (!isgetAllAddressActionDisptach) {
            console.log("action dispatch--------------------------------");
            dispatch(getAllAddress())
            setIsgetAllAddressActionDisptach(true)
        }
        // dispatch(showAddressModalWindow(null))

        // CutomToastSuccess('Success')
        // sortValue()

    }, [])
    useEffect(() => {

        if (addressList.isHideModal) {
            setIsModalVisible(false)
            updateAddressRef.current.close()
            
        }
        if (addressList?.addressAddedORUpdate) { CutomToastSuccess(addressList?.message) }
        //sortValue()
    }, [addressList])


    const addresListrenderItem = (item) => {
        return <View style={{
            height: 130, flexDirection: 'row',
            marginTop: 20, backgroundColor: 'white', borderRadius: 10,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 6.84,

            elevation: 1,
        }}>
            <TouchableOpacity style={[styles.addressLeftView, { flex: .8 }]}
                onPress={() => showUpdateAddressModalWindow(item)}>
                <View style={{ flex: 1.6, marginTop: 10 }}>

                    <Text style={styles.addressType}>
                        {item?.addressType?.toLocaleUpperCase()}
                    </Text>
                    <View style={{flexDirection:'row'}}>

                    <Text style={{ fontSize: scaledSize(16), letterSpacing: .5, marginTop: 4, 
                        fontFamily: Fonts.PTSerifBold, color: 'black' }}>
                        {capitalizeFirstLetter(item.firstName)}
                    </Text>
                    <Text style={{ fontSize: scaledSize(16),
                         letterSpacing: .5, marginTop: 4, fontFamily: Fonts.PTSerifBold,
                          color: 'black',left:10 }}>
                        {capitalizeFirstLetter(item.lastName)}
                    </Text>
                    </View>
                    <Text style={{ fontSize: scaledSize(16), letterSpacing: .5, marginTop: 4, fontFamily: Fonts.regular, color: 'black' }}>
                        {item.address}
                    </Text>
                    <Text style={{
                        fontSize: scaledSize(14), letterSpacing: .5,
                        marginTop: 4, fontFamily: Fonts.regular, color: 'black'
                    }}>
                        {item.landMark}
                    </Text>
                </View>
                <View style={{ flex: .4, justifyContent: 'center' }}>
                    <Text style={{ fontSize: scaledSize(16), fontFamily: Fonts.regular }}>
                        {`${item.city}, ${item.id}`}
                    </Text>
                </View>
            </TouchableOpacity>
            <View style={[styles.addressRightView, {
                justifyContent: "center",
                alignContent: "center",
                flexDirection: 'column'
            }]}>
                <TouchableOpacity onPress={
                    //@ts-ignore
                    () => dispatch(markAddressPrimary({ 'addressId': item.id }))
                } style={styles.deleteButtonStyle}>
                    <Image source={location}
                        style={[styles.deleteIcon, { tintColor: item.primary ? '#6495ED' : '#A9A9A9' }]} resizeMode='contain' />
                </TouchableOpacity>

                <TouchableOpacity onPress={
                    () => {
                        setIsShowConfirmationBox(true),
                            setAddressID(item.id)
                    }

                } style={styles.deleteButtonStyle}>
                    <Image source={Delete} style={[styles.deleteIcon, { tintColor: '#6495ED' }]} resizeMode='contain' />
                </TouchableOpacity>


            </View>
        </View>
    }
    const showUpdateAddressModalWindow = (item: any) => {

        console.log('address type', item);
        console.log('address tzipCodeype', item.zipCode);
        if (item.addressType.toUpperCase() === "HOME") {
            setupdateAddressType1(true)
            setupdateAddressType2(false)
        }
        if (item.addressType.toUpperCase() === "OFFICE") {
            setupdateAddressType1(false)
            setupdateAddressType2(true)
        }
        setupdateFirstName(item.firstName)
        setupdatelastName(item.lastName)
        setupdateCity(item.city)
        setupdateAddress(item.address)
        setupdateZipCode(item.zipCode)
        setupdateLandmark(item.landMark)
        setAddressId(item.id)
        setupdateAddressType(item.addressType)
        // setAddressObj(item)
        updateAddressRef.current.open()

    }

    const addAddressModalWindow = () => {


        setAddressType1(false)
        setAddressType2(false)
        setCity('')
        setAddress('')
        setZipCode('')
        setLandmark('')
        setAddressId(0)
        setAddressType('')
        myRefAdd.current.open()

    }
    const sortValue = () => {
        console.log(addressList?.data);

        let data = addressList?.data.sort(function (x, y) {
            // true values first
            return (x.primary === y.primary) ? 0 : x ? -1 : 1;
            // false values first
            // return (x === y)? 0 : x? 1 : -1;
        })
    }
    return (
        <View style={{ flex: 1, padding: scaledSize(14), marginBottom: 10, }}>
            <View style={styles.header}>
                {screenName !== 'address' ? <HeaderComponent title={'Address'} /> :
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <Text style={styles.headerText}>Address</Text>
                    </View>}

            </View>

            <View style={{
                height: 550, paddingBottom: 10,

            }}>
                <FlatList
                    keyExtractor={(item, index) => index + 'index'}
                    data={addressList?.data}
                    renderItem={({ item }) => addresListrenderItem(item)}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            <View style={{
                height: 100,
                justifyContent: 'center', alignItems: 'center',

            }}>

                <GradientButton title={'Add new address'} onPress={() => {

                    setIsModalVisible(true)
                }} width={200} />

            </View>

            {/* <Modalize panGestureEnabled={true} adjustToContentHeight={true} modalStyle={{ backgroundColor: COLORS.lightGreen }} panGestureComponentEnabled={true} ref={myRefAdd}> */}


            <Modal visible={isModalVisible}>
                <View style={{ marginTop: scaledSize(25) }}>
                    <TouchableOpacity style={[styles.backButtonStyle, { left: scaledSize(10), zIndex: 1 }]} onPress={() => setIsModalVisible(false)}>
                        <Image source={backIcon} resizeMode='contain' style={[styles.backIconStyle]} />
                    </TouchableOpacity>
                    <Text style={[styles.modalChangePasswordText, { marginBottom: scaledSize(30), fontSize: scaledSize(19) }]}>Add New Address</Text>
                    <View style={[styles.marginTopView]} />


                    <View style={{
                        flexDirection: 'row', alignSelf: 'center', borderWidth: 1,
                        borderColor: COLORS.borderBottomColorInActive,
                        width: scaledSize(146),
                        borderRadius: scaledSize(33),
                    }}>

                        <TouchableOpacity onPress={() => {
                            setAddressType1(true)
                            setAddressType2(false)
                            setAddressType('Home')

                        }} style={{
                            borderColor: addressType1 ? '#bc0923' : COLORS.TRANSPARENT,
                            borderWidth: 1, padding: 8,
                            borderRadius: scaledSize(33), paddingRight: scaledSize(19), paddingLeft: scaledSize(12),
                            backgroundColor: addressType1 ? COLORS.tabColor : '#fff'
                        }}>
                            <Text style={{ textAlign: 'center', color: '#bc0923', fontFamily: Fonts.regular, letterSpacing: 1 }}>Home</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            setAddressType1(false)
                            setAddressType2(true)
                            setAddressType('Office')
                        }} style={{
                            borderColor: addressType2 ? '#bc0923' : COLORS.TRANSPARENT,
                            borderWidth: 1, padding: 8,
                            borderRadius: 33, paddingLeft: 13, backgroundColor: addressType2 ? COLORS.tabColor : '#fff'
                        }}>
                            <Text style={{ textAlign: 'center', color: '#bc0923', fontFamily: Fonts.regular, letterSpacing: 1.5 }}>Office</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        width: 400, flexDirection: 'row',
                        justifyContent: 'center', alignItems: 'center',
                    }}>
                        <View style={{
                            width: '82%', justifyContent: 'space-between',
                            flexDirection: 'row',
                        }}>

                            <View style={{ width: '40%', }}>
                                <CustomInput placeholder='First Name' onChangeText={(v) => setFirstName(v)
                                } />
                            </View>
                            <View style={{ width: '40%', justifyContent: 'flex-start', right: 46 }}>
                                <CustomInput placeholder='Last Name' onChangeText={(v) => setlastName(v)} />
                            </View>
                        </View>
                    </View>


                    <View style={{ marginTop: 10 }}>

                        <View style={styles.inputFieldChildView1}>
                            <InputField style={styles.textInput}
                                Placeholder='Street Address' value={address}
                                onchangeValue={(value) => setAddress(value)}
                            />
                        </View>
                        <View style={styles.inputFieldChildView1}>
                            <InputField style={styles.textInput}
                                Placeholder='Apt/Suite/Bldg (Optional)' value={landmark}
                                onchangeValue={(value) => setLandmark(value)}
                            />
                        </View>
                        <View style={styles.inputFieldChildView1}>
                            <InputField style={styles.textInput}
                                Placeholder='MADHYA PRADESH'
                                editable={true}
                                onchangeValue={(value) => setCity(value)}
                            />
                        </View>

                        <View style={{ width: '80%', alignSelf: 'center', height: scaledSize(50), right: scaledSize(4) }} >
                            <CustomDropDown onChange={(value) => setCity(value.label)} data={data} 
                            label='City' defaultValue={city} />

                        </View>

                        <View style={styles.inputFieldChildView1}>
                            <InputField style={styles.textInput}
                                Placeholder='Zip code' value={''}
                                keyboardType='numeric'
                                
                                />
                        </View>


                        <View style={{
                            height: 50, width: '100%',
                            justifyContent: 'center', alignItems: 'center',
                            backgroundColor: 'white'
                        }}>

                            {/* @ts-ignore */}
                            <GradientButton title={'Submit'} onPress={() => dispatch(createAddress(addressObject))} />
                        </View>
                    </View>

                </View>
            </Modal>
            {/* </Modalize> */}

            {/* **********************************  update address modal window start ******************************** */}

            <Modalize panGestureEnabled={true} adjustToContentHeight={true} modalStyle={{ backgroundColor: COLORS.lightGreen }} panGestureComponentEnabled={true} ref={updateAddressRef}>
                <TouchableOpacity style={[styles.backButtonStyle, { top: scaledSize(40), left: scaledSize(10), zIndex: 1 }]}>
                    {/* <Image source={backIcon} resizeMode='contain' style={[styles.backIconStyle]} /> */}
                </TouchableOpacity>



                <View style={{ marginTop: scaledSize(25) }}>
                    <Text style={[styles.modalChangePasswordText,
                    { marginBottom: scaledSize(30), fontSize: scaledSize(19) }]}>update Address</Text>
                    <View style={[styles.marginTopView]} />


                    <View style={{
                        flexDirection: 'row', alignSelf: 'center', borderWidth: 1,
                        borderColor: COLORS.borderBottomColorInActive,
                        width: scaledSize(146),
                        borderRadius: scaledSize(33),
                    }}>

                        <TouchableOpacity onPress={() => {
                            setupdateAddressType1(true)
                            setupdateAddressType2(false)
                            setupdateAddressType('Home')

                        }} style={{
                            borderColor: updateaddressType1 ? '#bc0923' : COLORS.TRANSPARENT,
                            borderWidth: 1, padding: 8,
                            borderRadius: scaledSize(33), paddingRight: scaledSize(19), paddingLeft: scaledSize(12),
                            backgroundColor: updateaddressType1 ? COLORS.tabColor : '#fff'
                        }}>
                            <Text style={{ textAlign: 'center', color: '#bc0923', fontFamily: Fonts.regular, letterSpacing: 1 }}>Home</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            setupdateAddressType1(false)
                            setupdateAddressType2(true)
                            setupdateAddressType('Office')
                        }} style={{
                            borderColor: updateaddressType2 ? '#bc0923' : COLORS.TRANSPARENT,
                            borderWidth: 1, padding: 8,
                            borderRadius: 33, paddingLeft: 13, backgroundColor: updateaddressType2 ? COLORS.tabColor : '#fff'
                        }}>
                            <Text style={{ textAlign: 'center', color: '#bc0923', fontFamily: Fonts.regular, letterSpacing: 1.5 }}>Office</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        width: 400, flexDirection: 'row',
                        justifyContent: 'center', alignItems: 'center',
                    }}>
                        <View style={{
                            width: '82%', justifyContent: 'space-between',
                            flexDirection: 'row',
                        }}>

                            <View style={{ width: '40%', }}>
                                <CustomInput placeholder='First Name'
                                    onChangeText={(v) => setupdateFirstName(v)

                                    }
                                    defaultValue={updatefirstName}
                                />
                            </View>
                            <View style={{ width: '40%', justifyContent: 'flex-start', right: 46 }}>
                                <CustomInput placeholder='Last Name' onChangeText={(v) => setupdatelastName(v)}
                                    defaultValue={updatelastName}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={{ marginTop: 20 }}>

                        <View style={styles.inputFieldChildView1}>
                            <InputField style={styles.textInput}
                                Placeholder='Street Address (Street no & Street name)'
                                value={updateaddress}
                                onchangeValue={(value) => setupdateAddress(value)}
                            />
                        </View>
                        <View style={styles.inputFieldChildView1}>
                            <InputField style={styles.textInput}
                                Placeholder='Landmark'
                                value={updatelandmark}
                                onchangeValue={(value) => setupdateLandmark(value)}
                            />
                        </View>
                        <View style={styles.inputFieldChildView1}>
                            <InputField style={styles.textInput}
                                Placeholder='MADHYA PRADESH'
                                editable={true}
                            // value={city}
                            // onchangeValue={(value) => setCity(value)}
                            />
                        </View>

                        <View style={{ width: '80%', alignSelf: 'center', height: scaledSize(50), right: scaledSize(4) }} >
                            <CustomDropDown onChange={(value) => setupdateCity(value.label)} data={data}
                                label='City' defaultValue={updatecity} />

                        </View>

                        <View style={styles.inputFieldChildView1}>
                            <InputField style={styles.textInput}
                                Placeholder='Zip code' value={updatezipCode} />
                        </View>



                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            {/* @ts-ignore */}
                            <GradientButton title={'Update'} onPress={() => dispatch(updateAddress(updateAddressObject))} width={200} />
                        </View>
                        <View style={{ height: scaledSize(50) }}>

                        </View>
                    </View>

                </View>
            </Modalize>
            {/* **********************************  update address modal window End ******************************** */}
            <CustomSpinner isLoading={addressList?.isLoading} />
            <ConfirmationModal onPressNo={() => setIsShowConfirmationBox(false)}
                onPressYes={
                    () => {//@ts-ignore
                        dispatch(deleteAddress({ 'addressId': addressID }
                        )), setIsShowConfirmationBox(false)
                    }} isVisible={isShowConfirmationBox} />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: scaledSize(50),
        justifyContent: 'center',
        alignContent: 'center'
    },
    addressLeftView: {
        flex: 1.4,
        marginLeft: 8,

        //backgroundColor: 'red'
    },
    headerText: {
        color: COLORS.black,
        letterSpacing: 1,
        fontSize: scaledSize(18),
        fontFamily: Fonts.PTSerifBold
    },
    addressRightView: {
        flex: .5,
        justifyContent: 'center',
        alignContent: 'center'
        // backgroundColor:'purple'
    }, addressType: {
        fontSize: scaledSize(15),
        // fontWeight: '600',
        color: 'purple',
        fontFamily: 'CrimsonText-Bold'
    },
    productName: {
        fontSize: scaledSize(11), textAlign: 'center',
        maxWidth: scaledSize(120), justifyContent: 'center',
        alignItems: 'center', color: COLORS.black,
        fontFamily: Fonts.bold,
        marginTop: scaledSize(20),
        top: scaledSize(-10), marginRight: scaledSize(20),
        left: scaledSize(8), padding: scaledSize(1)
    },
    productPrice: {
        fontSize: scaledSize(11),
        textAlign: 'center',
        maxWidth: scaledSize(120),
        justifyContent: 'center',
        alignItems: 'center',
        color: 'red',
        top: scaledSize(-10),
        marginRight: scaledSize(20),
        left: scaledSize(8),
        padding: scaledSize(1)
    },
    productPrice2: {
        fontSize: scaledSize(11),
        top: scaledSize(-20),
        marginLeft: scaledSize(5),
        textAlign: 'center',
        color: COLORS.grey
    },
    productImage:
    {
        marginTop: scaledSize(20),
        width: scaledSize(100),
        height: scaledSize(100),
        marginLeft: scaledSize(5),
        marginRight: scaledSize(5),
        alignItems: 'center'
    },
    priceCancelSepretor: {
        height: 0,
        backgroundColor: 'gray',
        position: 'absolute',
        left: 58, top: 11, width: 70, padding: 1.5
    },
    priceDetailsText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'black'
    },
    Button: {
        height: heightFromPercentage(7),
        backgroundColor: COLORS.cartYellow,
        marginTop: scaledSize(15),
        marginLeft: scaledSize(-15),
        borderRadius: scaledSize(8),
        justifyContent: 'center',
        borderWidth: scaledSize(0.5),
        borderColor: COLORS.cartYellow,
        marginBottom: scaledSize(20),
        elevation: 1,
        alignItems: 'center',
        width: '83%',
        alignSelf: 'center'
    },
    modalPasswordButton: {
        color: COLORS.black, fontSize: scaledSize(15), letterSpacing: 1,
        //fontWeight: 'bold',
        textAlign: 'center',
    },
    backIconStyle: {
        width: scaledSize(28),
        height: scaledSize(28),
        // top: scaledSize(4)
    },
    inputFieldChildView1: {
        height: scaledSize(60),
        marginTop: scaledSize(-15),
        marginBottom: scaledSize(30),
        width: '80%',
        marginLeft: scaledSize(30)
    },
    textInput: {
        textAlign: 'left',
        color: COLORS.black,
        marginBottom: scaledSize(-25),
        // marginTop: scaledSize(8),
        fontSize: scaledSize(15),
        marginLeft: scaledSize(10),
        flex: 1
    },
    marginTopView: { marginTop: scaledSize(20) },

    modalChangePasswordText: { color: COLORS.black, top: scaledSize(20), letterSpacing: 1, textAlign: 'center', fontSize: scaledSize(16) },

    backButtonStyle: { position: 'absolute', left: 0, top: scaledSize(22), marginLeft: scaledSize(15) },
    logButton: {
        height: heightFromPercentage(6),
        backgroundColor: COLORS.cartYellow,
        marginTop: scaledSize(26),
        borderRadius: scaledSize(8),
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center'
    },
    logButton2: {
        height: heightFromPercentage(5),
        backgroundColor: COLORS.white,
        marginTop: scaledSize(16),
        elevation: 0,
        borderWidth: .5,
        borderColor: COLORS.activeBorderColor,
        borderRadius: scaledSize(8),
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center'
    },
    logButton3: {
        height: heightFromPercentage(5),
        backgroundColor: COLORS.cartYellow,
        marginTop: scaledSize(6),
        borderRadius: scaledSize(8),
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center'
    },
    loginButton: { width: '95%', alignSelf: 'center', marginTop: scaledSize(-10), marginBottom: scaledSize(10) },
    linearGradient: {
        //flex: 1,
        top: scaledSize(0),
        padding: scaledSize(14),
        paddingBottom: scaledSize(14),
        borderRadius: 1,
        elevation: 0,
    },
    //dropdown
    dropdown: {
        margin: 16,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    deleteButtonStyle: {
        flex: .5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    deleteIcon: {
        height: 36,
        width: 36
    }

})
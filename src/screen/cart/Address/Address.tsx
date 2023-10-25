//@ts-nocheck
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createRef, useEffect, useState, useRef } from 'react'
import { View, Text, FlatList, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity, TouchableNativeFeedback, StatusBar } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { Modalize } from 'react-native-modalize';
import { Searchbar } from 'react-native-paper';
import InputField from '../../../component/InputField';
import CustomeButton from '../../../helper/util/CustomeButton';
import { heightFromPercentage, scaledSize } from '../../../helper/util/Utilities';
import { COLORS } from '../../../utilits/GlobalAssets';
import { active, activeLoc, backIcon, inactive, inactiveLoc, right } from '../../../utilits/GlobalImages';
const width = Dimensions.get('window').width;

const info = [{
    id: 1,
    first_name: 'Orchid Hotel',
    last_name: 'Orchid, Los Angeles',
    isSelected: true,
    //image: house2,
    type: 'BUSINESS',
    adress: 'Near Kukatpally main road',
    landmark: 'azad ncc',
    city: 'indoree',
    state: 'GA',
    pincode: '45202',
    mobile: 5555556666,
    cost: 450
},

{
    id: 2,
    first_name: 'Waldorf Hotel',
    isSelected: false,
    last_name: 'Wilshire, Los Angeles',
    //image: house1,
    type: 'PERSONAL1',
    adress: 'Charminar center beside 4th pillar',
    landmark: 'azad ncc',
    city: 'Hyderabad',
    state: 'GA',
    pincode: '45202',
    mobile: 5555556666,
    cost: 550
},
{
    id: 3,
    first_name: 'Trident Hotel',
    isSelected: false,
    last_name: 'Porchid, Los Angeles',
    //image: house2,
    type: 'PERSONAL2',
    adress: '600 madina nagar nizamuddin gali',
    landmark: 'azad ncc',
    city: 'Mumbai',
    state: 'GA',
    pincode: '45202',
    mobile: 5555556666,
    cost: 650
},
{
    id: 4,
    first_name: 'Trident Hotel2',
    isSelected: false,
    last_name: 'Porchid, Los Angeles',
    //image: house2,
    type: 'COMMERCIAL1',
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
    isSelected: false,
    last_name: 'Porchid, Los Angeles',
    //image: house2,
    type: 'COMMERCIAL2',
    adress: '9853 madina nagar nizamuddin gali',
    landmark: 'azad ncc',
    city: 'Agra',
    state: 'GA',
    pincode: '45202',
    mobile: 5555556666,
    cost: 650
}
]


const AddressScreen = ({ navigation, route }) => {
    const [hotelData, setHotelData] = useState(info)
    const [selectedAddress, setSelectedAddress] = useState({})
    const [addressObj, setAddressObj] = useState({})
    const [addressType1, setAddressType1] = useState(true)
    const [addressType2, setAddressType2] = useState(false)
    let myRefUpdate = useRef<any>({})
    let myRefAdd = useRef<any>({})
    //     useEffect(()=>{
    // console.log(selectedAddress,"address",route?.params?.price)
    //     },[selectedAddress])
    const renderItem = (item: any, index: number) => {
        const data = [...hotelData]
        return <TouchableOpacity
            style={{ backgroundColor: COLORS.white, alignSelf: 'center', elevation: 0, height: item?.isSelected ? scaledSize(245) : scaledSize(115), width: width - scaledSize(30), paddingTop: scaledSize(6), borderRadius: 0, marginRight: scaledSize(5), marginBottom: scaledSize(0), borderWidth: 1, borderColor: COLORS.borderBottomColor }}
            onPress={() => {
                data.map((e: any) => {
                    if (!e.isSelected && e.id == item.id) {
                        setSelectedAddress(e)
                        return e.isSelected = true
                    }
                    else if (e.isSelected && e.id == item.id) {
                        setSelectedAddress(e)
                        return e.isSelected = true
                    }
                    e.isSelected = false
                })
                setHotelData(data)
                console.log(data)

            }}
        >
            <View style={{ position: 'absolute', right: scaledSize(20), top: scaledSize(30), zIndex: 2 }}>
                <Image source={item.isSelected ? inactive : active} style={{ width: scaledSize(35), height: scaledSize(35) }} />
            </View>
            <View style={{ marginLeft: scaledSize(25), marginTop: scaledSize(8) }}>
                <Text style={{ color: COLORS.black, fontSize: scaledSize(15) }}>{item?.type}</Text>
                <Text style={{ color: COLORS.profileBgColor, fontSize: scaledSize(13), top: scaledSize(5) }}>{item?.adress}</Text>
                <Text style={{ color: COLORS.profileBgColor, fontSize: scaledSize(13), top: scaledSize(8) }}>{item?.landmark}</Text>
                <Text style={{ color: COLORS.profileBgColor, fontSize: scaledSize(13), top: scaledSize(10) }}>
                    <Text>{item?.city}, </Text>
                    {item?.pincode}</Text>
            </View>
            {item?.isSelected &&
                <View style={{ marginTop: scaledSize(20), marginBottom: scaledSize(20) }}>

                    <View style={styles.loginButton}>
                        <CustomeButton text={{ color: COLORS.black, fontSize: scaledSize(15) }} style={styles.logButton} name={`Use this address`} onPress={() => { navigation.navigate('Proceed', { data: item, price: route?.params?.price }) }} />

                        <CustomeButton text={{ color: COLORS.black, fontSize: scaledSize(15) }}
                         style={styles.logButton2} name={`Edit Address`} onPress={() => { setAddressObj(item), myRefUpdate.current?.open() }} />
                    </View>

                </View>


            }
        </TouchableOpacity>
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
            <StatusBar backgroundColor='#81eed2' />

            <Modalize panGestureEnabled={true}
             adjustToContentHeight={true} 
             modalStyle={{ backgroundColor: COLORS.lightGreen }}
              panGestureComponentEnabled={true} ref={myRefUpdate}>
                <TouchableOpacity onPress={() => myRefUpdate.current.close()} style={[styles.backButtonStyle, { top: scaledSize(40), left: scaledSize(10), zIndex: 1 }]}>
                    <Image source={backIcon} resizeMode='contain' style={[styles.backIconStyle]} />
                </TouchableOpacity>
                <View style={{ marginTop: scaledSize(25) }}>
                    <Text style={[styles.modalChangePasswordText, { marginBottom: scaledSize(30), fontSize: scaledSize(19) }]}>Edit Address</Text>
                    <View style={[styles.marginTopView]} />
                    <View style={{ flexDirection: 'row', alignSelf: 'center', borderWidth: 1, marginBottom: scaledSize(15), borderColor: COLORS.borderBottomColor, padding: 18, borderRadius: 33, paddingTop: 0, paddingBottom: 0, flex: 1, paddingLeft: 25, paddingRight: 25 }}>

                        <TouchableOpacity onPress={() => {
                            setAddressType1(true)
                            setAddressType2(false)
                        }} style={{ marginLeft: scaledSize(-28), borderColor: addressType1 ? '#bc0923' : COLORS.TRANSPARENT, borderWidth: 1, padding: 8, borderRadius: 33, paddingRight: 19, paddingLeft: 12, backgroundColor: addressType1 ? COLORS.tabColor : '#fff' }}>
                            <Text style={{ textAlign: 'center', color: '#bc0923' }}>Personal</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            setAddressType1(false)
                            setAddressType2(true)
                        }} style={{ borderColor: addressType2 ? '#bc0923' : COLORS.TRANSPARENT, borderWidth: 1, padding: 8, marginRight: scaledSize(-28), borderRadius: 33, paddingLeft: 19, paddingRight: 12, backgroundColor: addressType2 ? COLORS.tabColor : '#fff' }}>
                            <Text style={{ textAlign: 'center', color: '#bc0923', left: scaledSize(-3) }}>Business</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputFieldChildView1}>
                        <InputField style={styles.textInput}
                            Placeholder='Street Address (Street no & Street name)' value={addressObj?.adress} />
                    </View>
                    <View style={styles.inputFieldChildView1}>
                        <InputField style={styles.textInput}
                            Placeholder='Apt/Suite/Bldg (Optional)' value={addressObj?.landmark} />
                    </View>
                    <View style={styles.inputFieldChildView1}>
                        <InputField style={styles.textInput}
                            Placeholder='City' value={addressObj?.city} />
                    </View>

                    <View style={styles.inputFieldChildView1}>
                        <InputField style={styles.textInput}
                            Placeholder='State' value={addressObj?.state} />
                    </View>

                    <View style={styles.inputFieldChildView1}>
                        <InputField style={styles.textInput}
                            Placeholder='Zip code' value={addressObj?.pincode} />
                    </View>


                    <CustomeButton style={[styles.Button]}
                        text={styles.modalPasswordButton}
                        name='Update' onPress={() => {
                            alert('clicked')
                        }} />

                </View>
            </Modalize>

            <Modalize panGestureEnabled={true} adjustToContentHeight={true} modalStyle={{ backgroundColor: COLORS.lightGreen }} panGestureComponentEnabled={true} ref={myRefAdd}>
                <TouchableOpacity onPress={() => myRefAdd.current.close()} style={[styles.backButtonStyle, { top: scaledSize(40), left: scaledSize(10), zIndex: 1 }]}>
                    <Image source={backIcon} resizeMode='contain' style={[styles.backIconStyle]} />
                </TouchableOpacity>



                <View style={{ marginTop: scaledSize(25) }}>
                    <Text style={[styles.modalChangePasswordText, { marginBottom: scaledSize(30), fontSize: scaledSize(19) }]}>Add New Address</Text>
                    <View style={[styles.marginTopView]} />


                    <View style={{ flexDirection: 'row', alignSelf: 'center', borderWidth: 1, marginBottom: scaledSize(15), borderColor: COLORS.borderBottomColor, padding: 18, borderRadius: 33, paddingTop: 0, paddingBottom: 0, flex: 1, paddingLeft: 25, paddingRight: 25 }}>

                        <TouchableOpacity onPress={() => {
                            setAddressType1(true)
                            setAddressType2(false)
                        }} style={{ marginLeft: scaledSize(-28), borderColor: addressType1 ? '#bc0923' : COLORS.TRANSPARENT, borderWidth: 1, padding: 8, borderRadius: 33, paddingRight: 19, paddingLeft: 12, backgroundColor: addressType1 ? COLORS.tabColor : '#fff' }}>
                            <Text style={{ textAlign: 'center', color: '#bc0923' }}>Personal</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            setAddressType1(false)
                            setAddressType2(true)
                        }} style={{ borderColor: addressType2 ? '#bc0923' : COLORS.TRANSPARENT, borderWidth: 1, padding: 8, marginRight: scaledSize(-28), borderRadius: 33, paddingLeft: 19, paddingRight: 12, backgroundColor: addressType2 ? COLORS.tabColor : '#fff' }}>
                            <Text style={{ textAlign: 'center', color: '#bc0923', left: scaledSize(-3) }}>Business</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.inputFieldChildView1}>
                        <InputField style={styles.textInput}
                            Placeholder='Street Address (Street no & Street name)' value={''} />
                    </View>
                    <View style={styles.inputFieldChildView1}>
                        <InputField style={styles.textInput}
                            Placeholder='Apt/Suite/Bldg (Optional)' value={''} />
                    </View>
                    <View style={styles.inputFieldChildView1}>
                        <InputField style={styles.textInput}
                            Placeholder='City' value={''} />
                    </View>

                    <View style={styles.inputFieldChildView1}>
                        <InputField style={styles.textInput}
                            Placeholder='State' value={''} />
                    </View>

                    <View style={styles.inputFieldChildView1}>
                        <InputField style={styles.textInput}
                            Placeholder='Zip code' value={''} />
                    </View>


                    <CustomeButton style={[styles.Button]}
                        text={styles.modalPasswordButton}
                        name='Add' onPress={() => {
                            alert('clicked')
                        }} />

                </View>
            </Modalize>




            <View style={[{ marginTop: scaledSize(0) }]}>
                <LinearGradient colors={['#81eed2', '#74d5bb']} style={styles.linearGradient}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={{ fontSize: 11 }}>CANCEL</Text>
                    </TouchableOpacity>
                </LinearGradient>
                <View style={{ margin: scaledSize(16), width: '60%' }}>
                    <Text style={{ fontSize: scaledSize(18) }}>Select a delivery and service address</Text>
                </View>
            </View>


            <FlatList data={hotelData}
                style={{ backgroundColor: '#fff', width: width - scaledSize(34), alignSelf: 'center', borderColor: COLORS.borderBottomColor, elevation: 0, marginBottom: scaledSize(5) }}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => 'key' + index}
                numColumns={1}
                renderItem={({ item, index }) => renderItem(item, index)}
            />
            <TouchableOpacity onPress={() => { myRefAdd.current?.open() }} style={{ flexDirection: 'row', backgroundColor: '#fff', justifyContent: 'space-between' }}>
                <Text style={{ padding: scaledSize(15), left: scaledSize(10) }}>Add a New address</Text>
                <Image source={right} style={{ height: scaledSize(18), width: scaledSize(18), top: scaledSize(17), right: scaledSize(25) }} />
            </TouchableOpacity>


        </View>
    )
}
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: COLORS.white
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
        top: scaledSize(-5)

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
        borderColor: COLORS.borderBottomColor,
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
})
export default AddressScreen;

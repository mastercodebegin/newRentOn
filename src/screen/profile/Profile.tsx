//@ts-nocheck
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createRef, useEffect, useState, useRef } from 'react'
import { View, Text, FlatList, Image, ScrollView, Dimensions, TouchableOpacity, TouchableNativeFeedback, StatusBar } from 'react-native'
import { scaledSize } from '../../helper/util/Utilities';
import { COLORS } from '../../utilits/GlobalAssets';
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductsInitiate } from './DashboardActions';
import { ActionsTypes } from '../../context/actions/ActionsTypes';
import { Info, smartp } from '../../utilits/GlobalImages';
import { ActivityIndicator } from 'react-native-paper';
const width = Dimensions.get('window').width;


const setting = [
    { name: 'Personal information', image: smartp },
    { name: 'Security', image: smartp },
    { name: 'Refer & Earn', image: smartp },
    { name: 'Notifications', image: smartp },
    { name: 'Log Out', image: Info }
]

const SettingAccount = ({ navigation, route }) => {
    const [pageNumber, setPage] = useState(1)
    const dispatch = useDispatch();
    const [modalData, setModalData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [isDispatchGetAllProductsAction, setIsDispatchGetAllProductsAction] = useState(false);
    const productsResponce = useSelector((state: any) => state.DashboardReducer)

    useEffect(() => {
        if (productsResponce && productsResponce.data && productsResponce.data?.data?.data) {
            setModalData(productsResponce?.data?.data?.data)
        }
        //console.log(' GET_ALL_BRAND_SUCCESS >>>>>>>>>>>>>>>>>', productsResponce.data?.data?.data);
        // setAddModalNumberModal(false)
        else {
            //setIsLoading(false)
        }
    }, [productsResponce])


    const logOut = () => {
        navigation.navigate('Login')
        AsyncStorage.removeItem('cart')
    }

    const renderItem = (item: any) => {
        return (
            <TouchableOpacity onPress={() => item.name == 'Personal information' ? navigation.navigate('Account')
                : item?.name == 'Security' ? navigation.navigate('security') : item?.name == 'Log Out' ? logOut() : null

            } style={{ marginTop: scaledSize(24), borderWidth: 1.5, borderRadius: 25, borderColor: COLORS.borderBottomColor, elevation: 0 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={item?.image} resizeMode='contain' style={{ height: scaledSize(18), width: scaledSize(18), top: scaledSize(17), left: scaledSize(15) }} />
                    <Text style={{ fontSize: 16, textAlign: 'center', padding: scaledSize(13), marginLeft: scaledSize(20) }}>{item?.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.lightGreen }}>
            <StatusBar backgroundColor='#ccc' />

            <View style={{ alignSelf: 'center', top: scaledSize(40) }}>
                {isLoading ? <ActivityIndicator color='red' size={'small'} style={{ bottom: scaledSize(20), top: scaledSize(20) }} /> :
                    <View>
                        <Text style={{ fontSize: scaledSize(18), textAlign: 'center' }}>{modalData?.first_name}</Text>
                        <Text style={{ fontSize: scaledSize(18) }}> {modalData && modalData?.first_name && "+1 986 - 552 - 1355"}</Text>
                    </View>

                }
            </View>

            <View style={{ flex: 1, alignSelf: 'center', top: scaledSize(60), marginBottom: scaledSize(10) }}>
                <FlatList
                    data={setting}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => 'key' + index}
                    renderItem={({ item, index }) => renderItem(item)}
                    onEndReachedThreshold={0.5}
                />
            </View>
        </View>
    )
}

export default SettingAccount;

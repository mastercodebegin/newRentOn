import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableHighlight } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import HeaderComponent from '../../component/HeaderComponent'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, Modal } from 'react-native-paper'
import { capitalizeFirstLetter, getAmountIntrest, heightFromPercentage, numberWithCommas, scaledSize } from '../../helper/util/Utilities'
import { COLORS, Fonts } from '../../utilits/GlobalAssets'
import { UrlConstants } from '../../context/service/UrlConstants'
import NumericInput from 'react-native-numeric-input'
import { backIcon, close, rupee } from '../../utilits/GlobalImages'
import CustomeButton from '../../helper/util/CustomeButton'
import CustomIcon from '../../component/CustomIcon'
import GradientButton from '../../component/GradientButton'
import AddressScreen from '../cart/Address/Address'
import InputField from '../../component/InputField'
import { Modalize } from 'react-native-modalize'
import AddressList from '../address/AddressList'
import RazorpayCheckout from 'react-native-razorpay';
import { useDispatch, useSelector } from 'react-redux'
import { getAllAddress, hideAddressModalWindow, showAddressModalWindow } from '../address/AddressSlice'
import { buyOrderWithCOD, clearOrderState, createOrder, updateOrder, } from './OrderSlice'
import { CutomToastFail, CutomToastSuccess } from '../../component/CustomToastMessage'
import CustomSpinner from '../../component/CustomSpinner'
import Color from '../../assets/colors/Color'
import ConfirmationModal from '../../component/ConfirmationModal'


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


export default function PreviewOrderDetails(props) {

    const [quantity, setQuantity] = useState(1)
    const [totalAmount, setTotalAmount] = useState(0)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [hotelData, setHotelData] = useState(info)
    const [selectedAddress, setSelectedAddress] = useState({})
    const [addressObj, setAddressObj] = useState({})
    const [item, setItem] = useState()
    const [addressType1, setAddressType1] = useState(true)
    const [addressType2, setAddressType2] = useState(false)
    const [isRetry, setIsRetry] = useState(false)
    let myRefUpdate = useRef<any>({})
    let changeAddress = useRef<any>({})
    const dispatch = useDispatch()
    const [modalNumber, setModalNumber] = useState('')
    const [price, setPrice] = useState()
    const [varaiantColorID, setVaraiantColorID] = useState(0)
    const addressList = useSelector((state: any) => state.AddressSlice)
    const order = useSelector((state: any) => state.orderSlice)
    const addressSlice = useSelector((state: any) => state.AddressSlice)


    useEffect(() => {
        // console.log('item--------', props.route.params.data);
        console.log('item--------', addressSlice);
        if (order.order?.id && order.isRetry == false) {
            console.log("Payment processing order");
            paymentProcess(order.order.orderId, order.order.price)
        }
        if (order?.isUpdated) {
            props.navigation.navigate('OrderSuccess')
        }
        if (order.updateOrderIsRejected) {
            props.navigation.navigate('OrderSuccess')
        }

        if (order?.isCOD) {
            props.navigation.navigate('OrderSuccess')
        }
        if (addressSlice.addressAddedORUpdate) {
            changeAddress.current.close()
            console.log('dispatch action--------------------------------');

            dispatch(hideAddressModalWindow(''))

        }



    })

    const getPrimaryAddress = () => {
        const address = addressList.data?.filter((address) => address.primary == 1)
        console.log('address-----', address);
        try {

            return address[0]
        }
        catch (err) {

        }
    }

    useEffect(() => {
        // console.log('------',props.route.params.data);

        setItem(props?.route?.params?.data.variantSpecification)
        setModalNumber(props?.route?.params?.data?.modalNumber)
        setVaraiantColorID(props?.route?.params?.data?.colorID)
        setPrice(props?.route?.params?.data?.price)

        dispatch(getAllAddress())
    }, [])


    const caluclateTotalAmount = (price, discountPrice, deliveryCharges) => {
        const totalPrice = price * quantity - discountPrice - deliveryCharges
        // console.log('totalPrice', totalPrice);
        return totalPrice
    }


    // const item = {
    //     "id": 1,
    //     "variant": {
    //         "id": 1,
    //         "ram": "10",
    //         "rom": "24",
    //         "selfieCamera": "20",
    //         "mainCamera": "48",
    //         "network": "48",
    //         'price': 19999,
    //         'processor': 'Octa core 2.2 GHz',
    //         "battery": "5000",
    //         "modalColors": [
    //             {
    //                 "id": 1,
    //                 "colorName": {
    //                     "id": 1,
    //                     "color": "r",
    //                     "colorCode": "red1"
    //                 },
    //                 "modalImages": [
    //                     {
    //                         "id": 1,
    //                         "imageName": "1.jpeg"
    //                     },
    //                     {
    //                         "id": 2,
    //                         "imageName": "y2d2e8cc4cff9c6.jpeg"
    //                     }
    //                 ]
    //             },
    //             {
    //                 "id": 3,
    //                 "colorName": {
    //                     "id": 2,
    //                     "color": "blue1",
    //                     "colorCode": "blue1"
    //                 },
    //                 "modalImages": [
    //                     {
    //                         "id": 5,
    //                         "imageName": "y5689ed831e2fe.jpeg"
    //                     }
    //                 ]
    //             },
    //             {
    //                 "id": 3,
    //                 "colorName": {
    //                     "id": 2,
    //                     "color": "blue",
    //                     "colorCode": "orange"
    //                 },
    //                 "modalImages": [
    //                     {
    //                         "id": 5,
    //                         "imageName": "1.jpeg"
    //                     }
    //                 ]
    //             }
    //         ]
    //     },
    //     "vendorProductsVariantColor": [
    //         {
    //             "id": 1,
    //             "inStock": 1,
    //             "modalColors": {
    //                 "id": 1,
    //                 "colorName": {
    //                     "id": 1,
    //                     "color": "black",
    //                     "colorCode": "red"
    //                 },
    //                 "modalImages": [
    //                     {
    //                         "id": 1,
    //                         "imageName": "y5689ed831e2fe.jpeg"
    //                     },
    //                     {
    //                         "id": 2,
    //                         "imageName": "y2d2e8cc4cff9c6.jpeg"
    //                     }
    //                 ]
    //             },
    //             "available": false
    //         },
    //         {
    //             "id": 2,
    //             "inStock": 2,
    //             "modalColors": {
    //                 "id": 3,
    //                 "colorName": {
    //                     "id": 2,
    //                     "color": "blue1",
    //                     "colorCode": "blue"
    //                 },
    //                 "modalImages": [
    //                     {
    //                         "id": 5,
    //                         "imageName": "y2d2e8cc4cff9c6.jpeg"
    //                     },
    //                     {
    //                         "id": 2,
    //                         "imageName": "y2d2e8cc4cff9c6.jpeg"
    //                     }
    //                 ]
    //             },
    //             "available": false
    //         }
    //     ],
    //     "available": false
    // }

    const retryPaymentProcess = () => {
        console.log("price", order.order.price, order.order.orderId);

        paymentProcess(order.order.orderId, order.order.price)

    }

    const address = {
        name: 'firoz khan',
        addressType: 'Home',
        address: '334, nizamuddin street no 3 opposite haji gali madina nagar azad nagar N.K. coaching',
        city: 'indore',
        pinCode: '452001',
        mobile: '9827271434'
    }

    const getTotalAmount = () => {

        return numberWithCommas(Math.round(caluclateTotalAmount(item?.price, getAmountIntrest(item?.price, 10), 0)))

    }
    const onPressContinue = () => {
        const totalAmount = Math.round(caluclateTotalAmount(item?.price, getAmountIntrest(item?.price, 10), 0))
        console.log('total Continue------', totalAmount);
        //@ts-ignore
        dispatch(createOrder({ 'amount': totalAmount }))
    }

    const buyWithCOD = () => {
        const object = {
            "orderId": "",
            "price": price,
            "orderDate": "",
            "orderStatus": "PENDING",
            "paymentMode": "COD",
            "variantColorID": varaiantColorID,
            "address": "test address",
            "productModalNumber": modalNumber,
            "user": {
                "id": 1
            },
            "vendor": {
                "id": props?.route?.params?.data?.vendorID
            },
            "variant": {
                "id": item?.id
            }
        }
        //@ts-ignore
        dispatch(buyOrderWithCOD(object))
    }

    const paymentProcess = (order_id, amount) => {
        console.log("paymentProcess---", order_id, amount);
        setIsRetry(false)
        var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: UrlConstants.PAYMENT_GATEWAY_KEY,
            amount: amount,
            name: 'Amir',
            order_id: order_id,
            prefill: {
                email: 'test@shopAx.com',
                contact: '9827271434',
                name: 'ShopAx Inc'
            },
            theme: { color: COLORS.activeBorderColor }
        }
        RazorpayCheckout.open(options).then((data) => {
            // handle success
            console.log(`Success: ${data.razorpay_payment_id}`);
            //props.navigation.navigate('OrderSuccess',{item:})


            const object = {
                "id": order.order.id,
                "orderId": order.order.orderId,
                "price": price,
                "orderDate": "",
                "orderStatus": "RECIEVED",
                "paymentStatus": "COMPLETED",
                "paymentMode": "ONLINE",
                "variantColorID": varaiantColorID,
                "address": "test address",
                "productModalNumber": modalNumber,
                "user": {
                    "id": 1
                },
                "vendor": {
                    "id": props?.route?.params?.data?.vendorID
                },
                "variant": {
                    "id": item?.id
                }
            }
            //@ts-ignore
            dispatch(updateOrder(object))
            CutomToastSuccess('Order Placed Successfully');

        }).catch((error) => {
            // handle failure
            // const object = {
            //     "id": order.order.id,
            //     "orderId": order.order.orderId,
            //     "price": price,
            //     "orderDate": "2023-07-18T19:33:12.251Z",
            //     "orderStatus": "COMPLETED",
            //     "paymentMode": "ONLINE",
            //     "variantColorID": varaiantColorID,
            //     "address": "test address",
            //     "productModalNumber": modalNumber,
            //     "user": {
            //         "id": 1
            //     },
            //     "vendor": {
            //         "id": props?.route?.params?.data?.vendorID
            //     },
            //     "variant": {
            //         "id": item?.id
            //     }
            // }
            console.log('payment error--', error);
            // dispatch(updateOrder(object))
            //@ts-ignore
            dispatch(clearOrderState())
            CutomToastFail(error?.description);
        });
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white', }}>
            <View style={{ height: scaledSize(40), }}>
                <HeaderComponent title={'Order Details'} />
            </View>
            <View style={{ height: scaledSize(50), flexDirection: 'row', borderTopColor: '#f6f6f6', borderTopWidth: 8 }}>
                <View style={{ justifyContent: 'center', alignItems: 'flex-start', flex: 1, marginLeft: scaledSize(30) }}>
                    <Text style={styles.addressLabel}>
                        Deliver To
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <Button mode="outlined" onPress={() => {
                        console.log("Submit--");
                        changeAddress.current.open()
                    }}
                        color='gray'
                    >
                        Change
                    </Button>
                </View>
            </View>
            {/* name and address view start **************** */}
            <View style={{
                marginTop: scaledSize(8),
                paddingBottom: scaledSize(20), paddingTop: scaledSize(20)
                , borderBottomColor: '#f6f6f6', borderBottomWidth: 8,
                borderTopColor: '#f6f6f6', borderTopWidth: 8
            }}>
                <View style={{ flexDirection: 'row', marginLeft: scaledSize(20) }}>
                    <Text style={{ marginLeft: scaledSize(10), fontSize: scaledSize(20), color: 'black', fontFamily: Fonts.bold }}>
                        {`${capitalizeFirstLetter(getPrimaryAddress()?.firstName)}  ${getPrimaryAddress()?.lastName}`}
                    </Text>
                    <View style={{
                        backgroundColor: '#FAFAFA', padding: 1,
                        borderRadius: 2, marginLeft: 20, justifyContent: 'center',
                        alignItems: 'center', paddingLeft: 8, paddingRight: 8
                    }}>
                        <Text style={{ fontSize: scaledSize(14), fontFamily: Fonts.bold, letterSpacing: .2 }}>
                            {getPrimaryAddress()?.addressType?.toUpperCase()}
                        </Text>
                    </View>

                </View>
                <View style={{ marginLeft: 30, marginTop: 4 }}>
                    <Text style={{ fontSize: 16, marginRight: 10, color: 'black', fontFamily: Fonts.regular }}>

                        {getPrimaryAddress()?.address}
                    </Text>
                    <View style={{ marginTop: 8, flexDirection: 'row' }}>


                        <View style={{ flex: 1 }}>

                            <Text style={styles.addressLabel}>
                                {capitalizeFirstLetter(getPrimaryAddress()?.city)}
                            </Text>

                            <Text style={styles.addressLabel}>
                                {getPrimaryAddress()?.mobileNumber}
                            </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', }}>
                            <Text style={styles.addressLabel}>Pin code</Text>
                            <Text style={styles.addressLabel}>{getPrimaryAddress()?.zipCode}</Text>
                        </View>
                    </View>
                </View>
            </View>
            {/****************************************  name and address view end ********************* */}
            {/****************************************  product  view end ********************* */}
            <View style={{
                marginLeft: scaledSize(10), flexDirection: 'row',
                backgroundColor: 'white', borderBottomColor: '#f6f6f6', borderBottomWidth: 8, paddingBottom: scaledSize(8)
            }}>
                <View style={[styles.productView, { flex: .5 }]}>
                    <Image resizeMethod='resize' resizeMode='contain'
                        source={{ uri: UrlConstants.S3_BASE_URL + item?.vendorProductsVariantColor[0]?.modalColors?.modalImages[0]?.imageName }}
                        style={styles.productImage} />

                    <NumericInput
                        value={quantity}
                        onChange={value => setQuantity(value)}
                        maxValue={10}
                        minValue={1}
                        onLimitReached={(isMax, msg) => console.log('max---', isMax, msg)}
                        totalWidth={110}
                        totalHeight={30}
                        iconSize={30}
                        step={1}
                        valueType='real'
                        rounded
                        textColor='black'
                        //@ts-ignore
                        iconStyle={{ color: 'black' }}

                        rightButtonBackgroundColor='#FAFAFA'
                        leftButtonBackgroundColor='#FAFAFA' />
                </View>

                <View style={{ flex: .96 }}>
                    <View style={{ marginTop: scaledSize(12) }}>
                        <View style={{ flexDirection: 'row' }}>

                            <Text style={[styles.addressLabel, { fontFamily: Fonts.PTSerifBold }]}>{`${modalNumber}   `}</Text>
                            <Text style={[styles.addressLabel,]}>{`(${props?.route?.params?.data?.colorName})`}</Text>
                        </View>
                        <Text style={{ fontSize: 12, color: 'gray', fontWeight: '600' }}>{`${item?.variant?.ram} GB RAM`}</Text>
                    </View>
                    <View style={{ marginTop: 10, flexDirection: 'row' }}>
                        <Text style={{ color: 'green', fontSize: scaledSize(16), fontWeight: '600', fontFamily: Fonts.bold }}>10% off</Text>
                        <Image source={rupee} style={{ height: 14, width: 14, left: 6, top: 4, }} />
                        <Text style={[styles.addressLabel, { marginLeft: 8, }]}>
                            {numberWithCommas(price)}
                        </Text>
                        <View style={{ flexDirection: 'row', top: 4 }}>

                            <Image source={rupee} style={{ height: scaledSize(13), width: scaledSize(14), left: 6, top: 1 }} />
                            <Text style={{
                                fontSize: scaledSize(20), marginLeft: 4,
                                bottom: 8, color: 'black', fontFamily: Fonts.bold
                            }}>
                                {' ' + numberWithCommas(price - Math.round(getAmountIntrest(price, 10)))}</Text>
                        </View>
                        <View style={styles.priceCancelSepretor}>
                        </View>
                    </View>
                    <View>

                    </View>

                </View>
            </View>
            {/****************************************  product view end ********************* */}
            {/****************************************  price Details view start ********************* */}
            <View style={{ flex: .8, marginLeft: 20, marginTop: 8, marginRight: 30, }}>
                <Text style={[styles.priceDetailsText, { alignSelf: 'center' }]}>Price Details</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                    <Text style={styles.priceDetailsText}>Price {`(${quantity}item)`}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={rupee} style={{ height: scaledSize(14), width: scaledSize(14), top: 1 }} />
                        <Text style={styles.priceDetailsTextRightSide}>{numberWithCommas(price)}.00</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                    <Text style={styles.priceDetailsText}>Discount</Text>
                    <Text style={[styles.priceDetailsTextRightSide, { color: 'green' }]}>-{numberWithCommas(Math.round(getAmountIntrest(item?.price, 10)))}.00</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, }}>
                    <Text style={styles.priceDetailsText}>Delivery Charges</Text>
                    <Text style={[styles.priceDetailsTextRightSide, { color: 'green' }]}>FREE Delivery</Text>
                </View>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between',
                    marginTop: 8, borderTopColor: '#e4e4e4', borderTopWidth: 1, height: 50,
                    alignItems: 'center',
                    borderBottomColor: '#e4e4e4', borderBottomWidth: 1
                }}>
                    <Text style={styles.priceDetailsText}>Total amount</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={rupee} style={{ height: scaledSize(14), width: scaledSize(14), top: 1 }} />
                        <Text style={{ ...styles.priceDetailsTextRightSide }}>{getTotalAmount() + '.00'}</Text>
                    </View>
                </View>
            </View>
            {/****************************************  price Details view end *********************** */}
            <View style={{ marginTop: scaledSize(40) }}>

               { addressList.data.length==0? !order.isRetry ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <GradientButton title={'Make Payment'} onPress={() => onPressContinue()}
                            width={300}/>

                        <GradientButton title={'Cash On Delivery'}
                            onPress={() => setIsModalVisible(true)} width={300} style={{ marginTop: 10 }} />
                    </View>
                    :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}   >
                        <GradientButton title={'Retry'} onPress={() => retryPaymentProcess()} width={300} />
                        <GradientButton title={'Cash On Delivery'} onPress={() => setIsModalVisible(true)} width={300} style={{ marginTop: 10 }}  />
                    </View>
              :                    
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}   >
              <GradientButton title='Add Address' onPress={()=> changeAddress.current.open()}
               width={300} />
            </View>
               }
            </View>


            <Modalize panGestureEnabled={true}
                // adjustToContentHeight={true} 
                modalHeight={700}
                modalStyle={{ backgroundColor: COLORS.lightGreen }}
                panGestureComponentEnabled={true} ref={changeAddress}>
                <TouchableOpacity onPress={() => changeAddress.current.close()} style={[styles.backButtonStyle, { top: scaledSize(40), left: scaledSize(10), zIndex: 1 }]}>
                    {/* <Image source={backIcon} resizeMode='contain' style={[styles.backIconStyle]} /> */}
                </TouchableOpacity>
                <AddressList screenName={'address'} />
            </Modalize>
            <CustomSpinner isLoading={order.isLoading} />
            {/* <Modal
                visible={order?.isRetry}


            >
                <View style={{
                    backgroundColor: 'white', height: 300,
                    alignItems: 'center',
                    width: '90%',
                    alignSelf: 'center',
                    borderRadius: 8
                }}>
                    <View style={{ height: scaledSize(100), alignItems: 'flex-end', width: '100%' }}>
                        <Image source={close} style={{ height: 30, width: 30, right: 10, top: 10, tintColor: 'gray' }} resizeMode='contain' />
                    </View>
                    <View style={{ height: scaledSize(50), width: '80%' }}>
                        <TouchableOpacity style={{ height: scaledSize(40), width: '90%', alignSelf: 'center', marginTop: 10 }}
                            onPress={() => onPressContinue()}>
                            <GradientButton title={'Retry'} />
                        </TouchableOpacity>

                        <TouchableOpacity style={{ height: scaledSize(40), width: '90%', alignSelf: 'center', marginTop: 10 }}
                            onPress={() => buyWithCOD()}>
                            <GradientButton title={'Cash On Delivery'} />
                        </TouchableOpacity>
                        
                    </View>
                </View>
            </Modal> */}
            <ConfirmationModal isVisible={isModalVisible} onPressNo={() => setIsModalVisible(false)} onPressYes={() => buyWithCOD()} />
            <View style={{ height: 30 }}>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    addressLabel: {
        color: 'black',
        fontSize: scaledSize(14),
        fontFamily: Fonts.regular,

    },
    productView: {
        // backgroundColor: COLORS.white,
        // borderWidth: 1,
        borderRadius: scaledSize(14),
        borderColor: "#dfdfdf",
        //top: scaledSize(10),
        // margin: scaledSize(10),
        // marginLeft: scaledSize(20),
        // height: scaledSize(200),
        // width: scaledSize(160)
    },
    productName: {
        fontSize: scaledSize(11),
        textAlign: 'center',
        maxWidth: scaledSize(120),
        justifyContent: 'center',
        alignItems: 'center',
        color: COLORS.black,
        fontFamily: Fonts.regular,
        marginTop: scaledSize(20),
        top: scaledSize(-10),
        marginRight: scaledSize(20),
        left: scaledSize(8),
        padding: scaledSize(1)
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
        left: 52, top: 11, width: 70, padding: 1
    },
    priceDetailsText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
        fontFamily: Fonts.bold
    },
    priceDetailsTextRightSide: {
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
        fontFamily: Fonts.bold
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
    buttonStyle: {
        height: scaledSize(40),
        width: '90%', alignSelf: 'center', marginTop: 10

    }
})
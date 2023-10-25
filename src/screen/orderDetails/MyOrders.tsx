import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import HeaderComponent from '../../component/HeaderComponent'
import { scaledSize } from '../../helper/util/Utilities'
import InputField from '../../component/InputField'
import { TextInput } from 'react-native-gesture-handler'
import { UrlConstants } from '../../context/service/UrlConstants'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrder } from './OrderSlice'



export default function MyOrder(props: any) {
  const dispatch = useDispatch()

  const Orders = useSelector((state: any) => state.orderSlice);



  const orderList = [
    {
      "id": 1,
      "orderId": "order_MFOsPuBC3pGEXe",
      "brand": "vivo",
      "price": "90",
      "orderDate": "2023-07-18T19:33:12.251+00:00",
      orderStatus: "RECEIVED",
      "shippedDate": "2023-07-20T19:33:12.251+00:00",
      "out_for_deliveryDate": "2023-07-20T19:33:12.251+00:00",
      "deliveredDate": "2023-07-20T19:33:12.251+00:00",
      "paymentMode": "ONLINE",
      "variantColorID": "1",
      "address": "test address",
      "productModalNumber": "v17 44W",
      "user": {
        "id": 1,
        "firstName": "string",
        "lastName": "string",
        "gender": "string",
        "mobile": "string",
        "email": "mailto:admin@test.com",
        "password": "$2a$10$pqHOAJJ/2xtEr6F0yGIvF..2EPLUbBFPB.vHJeh33AdU2HzXxUtx.",
        "dob": "2023-06-05T13:11:54.780+00:00",
        "createdOn": "2023-06-05T13:11:01.884+00:00",
        "role": {
          "id": 2,
          "name": "customer"
        }
      },
      "vendor": {
        "id": 4,
        "firstName": "Vendor",
        "lastName": "Demo",
        "mobile": "9832342244",
        "email": "mailto:vendor@yopmail.com",
        "panCard": null,
        "aadharNumber": "873293233224",
        "businessName": "Shopax",
        "businessAddress": "334 madina nagar nizamuddin gali azad nagar indore m.p. 452001",
        "gstNumber": "8324793234",
        "pinCode": "452001",
        "state": "1",
        "city": "1",
        "password": "$2a$10$CcL1CKSvzro/50KvhM/JJuOnAngcQNpHppiR.QWwrBNZjDXkOz5xO",
        "createdOn": "2022-08-23T11:06:30.932+00:00",
        "accountStatus": "DOCUMENT_SUBMITTED",
        "role": {
          "id": 5,
          "name": "vendor"
        },
        "vendorDocument": [
          {
            "id": 1,
            "imageName": "390141dddc86ff6aa98.jpeg",
            "frontSide": true,
            "deleted": false,
            "idtype": "AADHAR_CARD"
          },
          {
            "id": 2,
            "imageName": "5078039c635a1ecd6d7.jpeg",
            "frontSide": false,
            "deleted": false,
            "idtype": "AADHAR_CARD"
          },
          {
            "id": 3,
            "imageName": "390141375aaf7ab1641.jpeg",
            "frontSide": true,
            "deleted": false,
            "idtype": "GST"
          },
          {
            "id": 4,
            "imageName": "50780313a445b757908.jpeg",
            "frontSide": false,
            "deleted": false,
            "idtype": "GUMASTA"
          }
        ],
        "homeAddress": "334 madina nagar nizamuddin gali azad nagar indore m.p. 452001",
        "disabled": false,
        "deleted": false
      },
      "variant": {
        "id": 1,
        "price": "90",
        "variant": {
          "id": 1,
          "ram": "10",
          "rom": "24",
          "selfieCamera": "99",
          "mainCamera": "8",
          "battery": "8",
          "network": "5G",
          "modalColors": [
            {
              "id": 1,
              "colorName": {
                "id": 1,
                "color": "red",
                "colorCode": "red"
              },
              "modalImages": [
                {
                  "id": 1,
                  "imageName": "y5689ed831e2fe.jpeg"
                },
                {
                  "id": 2,
                  "imageName": "y5689ed831e2fe.jpeg"
                }
              ]
            },
            {
              "id": 3,
              "colorName": {
                "id": 2,
                "color": "blue",
                "colorCode": "blue"
              },
              "modalImages": [
                {
                  "id": 5,
                  "imageName": "y5689ed831e2fe.jpeg"
                }
              ]
            },
            {
              "id": 17,
              "colorName": {
                "id": 1,
                "color": "red",
                "colorCode": "red"
              },
              "modalImages": [
                {
                  "id": 23,
                  "imageName": "y5689ed831e2fe.jpeg"
                }
              ]
            }
          ]
        },
        "vendorProductsVariantColor": [
          {
            "id": 1,
            "inStock": 1,
            "modalColors": {
              "id": 1,
              "colorName": {
                "id": 1,
                "color": "red",
                "colorCode": "red"
              },
              "modalImages": [
                {
                  "id": 1,
                  "imageName": "y5689ed831e2fe.jpeg"
                },
                {
                  "id": 2,
                  "imageName": "y5689ed831e2fe.jpeg"
                }
              ]
            },
            "available": false
          },
          {
            "id": 2,
            "inStock": 2,
            "modalColors": {
              "id": 3,
              "colorName": {
                "id": 2,
                "color": "blue",
                "colorCode": "blue"
              },
              "modalImages": [
                {
                  "id": 5,
                  "imageName": "y5689ed831e2fe.jpeg"
                }
              ]
            },
            "available": false
          }
        ],
        "available": false
      }
    },
    {
      "id": 12,
      "orderId": "order_MFPdqHFYmr2wg0",
      "price": "90",
      "orderDate": "2023-07-18T19:33:12.251+00:00",
      "orderStatus": "COMPLETED",
      "paymentMode": "ONLINE",
      "variantColorID": "1",
      "address": "test address",
      "productModalNumber": "v17",
      "user": {
        "id": 1,
        "firstName": "string",
        "lastName": "string",
        "gender": "string",
        "mobile": "string",
        "email": "mailto:admin@test.com",
        "password": "$2a$10$pqHOAJJ/2xtEr6F0yGIvF..2EPLUbBFPB.vHJeh33AdU2HzXxUtx.",
        "dob": "2023-06-05T13:11:54.780+00:00",
        "createdOn": "2023-06-05T13:11:01.884+00:00",
        "role": {
          "id": 2,
          "name": "customer"
        }
      },
      "vendor": {
        "id": 4,
        "firstName": "Vendor",
        "lastName": "Demo",
        "mobile": "9832342244",
        "email": "mailto:vendor@yopmail.com",
        "panCard": null,
        "aadharNumber": "873293233224",
        "businessName": "Shopax",
        "businessAddress": "334 madina nagar nizamuddin gali azad nagar indore m.p. 452001",
        "gstNumber": "8324793234",
        "pinCode": "452001",
        "state": "1",
        "city": "1",
        "password": "$2a$10$CcL1CKSvzro/50KvhM/JJuOnAngcQNpHppiR.QWwrBNZjDXkOz5xO",
        "createdOn": "2022-08-23T11:06:30.932+00:00",
        "accountStatus": "DOCUMENT_SUBMITTED",
        "role": {
          "id": 5,
          "name": "vendor"
        },
        "vendorDocument": [
          {
            "id": 1,
            "imageName": "390141dddc86ff6aa98.jpeg",
            "frontSide": true,
            "deleted": false,
            "idtype": "AADHAR_CARD"
          },
          {
            "id": 2,
            "imageName": "5078039c635a1ecd6d7.jpeg",
            "frontSide": false,
            "deleted": false,
            "idtype": "AADHAR_CARD"
          },
          {
            "id": 3,
            "imageName": "390141375aaf7ab1641.jpeg",
            "frontSide": true,
            "deleted": false,
            "idtype": "GST"
          },
          {
            "id": 4,
            "imageName": "50780313a445b757908.jpeg",
            "frontSide": false,
            "deleted": false,
            "idtype": "GUMASTA"
          }
        ],
        "homeAddress": "334 madina nagar nizamuddin gali azad nagar indore m.p. 452001",
        "disabled": false,
        "deleted": false
      },
      "variant": {
        "id": 1,
        "price": "90",
        "variant": {
          "id": 1,
          "ram": "10",
          "rom": "24",
          "selfieCamera": "99",
          "mainCamera": "8",
          "battery": "8",
          "network": "5G",
          "modalColors": [
            {
              "id": 1,
              "colorName": {
                "id": 1,
                "color": "red",
                "colorCode": "red"
              },
              "modalImages": [
                {
                  "id": 1,
                  "imageName": "y5689ed831e2fe.jpeg"
                },
                {
                  "id": 2,
                  "imageName": "y5689ed831e2fe.jpeg"
                }
              ]
            },
            {
              "id": 3,
              "colorName": {
                "id": 2,
                "color": "blue",
                "colorCode": "blue"
              },
              "modalImages": [
                {
                  "id": 5,
                  "imageName": "y5689ed831e2fe.jpeg"
                }
              ]
            },
            {
              "id": 17,
              "colorName": {
                "id": 1,
                "color": "red",
                "colorCode": "red"
              },
              "modalImages": [
                {
                  "id": 23,
                  "imageName": "y5689ed831e2fe.jpeg"
                }
              ]
            }
          ]
        },
        "vendorProductsVariantColor": [
          {
            "id": 1,
            "inStock": 1,
            "modalColors": {
              "id": 1,
              "colorName": {
                "id": 1,
                "color": "red",
                "colorCode": "red"
              },
              "modalImages": [
                {
                  "id": 1,
                  "imageName": "y5689ed831e2fe.jpeg"
                },
                {
                  "id": 2,
                  "imageName": "y5689ed831e2fe.jpeg"
                }
              ]
            },
            "available": false
          },
          {
            "id": 2,
            "inStock": 2,
            "modalColors": {
              "id": 3,
              "colorName": {
                "id": 2,
                "color": "blue",
                "colorCode": "blue"
              },
              "modalImages": [
                {
                  "id": 5,
                  "imageName": "y5689ed831e2fe.jpeg"
                }
              ]
            },
            "available": false
          }
        ],
        "available": false
      }
    }
  ]

  useEffect(() => {
    console.log('orderss----',Orders)
  })
  useEffect(() => {
    //@ts-ignore
    dispatch(getAllOrder())
  }, [])

  const renderItem = (item: any, index: number) => {
    console.log("item-----", item?.productModalNumber)
    return (

      <TouchableOpacity onPress={() => { props.navigation.navigate('OrderDetails', { data: item }) }}
        style={{
          height: scaledSize(125), borderTopWidth: scaledSize(0.5), borderBottomWidth: scaledSize(0.5), flexDirection: 'column'
          , borderBottomColor: 'lightgrey', borderTopColor: 'lightgrey'
        }}>
        <View style={{ flexDirection: 'row' }}>
          <Image resizeMethod='resize' resizeMode='contain'
            source={{ uri: UrlConstants.S3_BASE_URL + item.variant?.vendorProductsVariantColor[0]?.modalColors?.modalImages[0]?.imageName }}
            style={styles.productImage} />
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'flex-start', marginLeft: scaledSize(10) }}>
            <Text style={styles.productPrice}>
              $ {item?.price}</Text>
            <Text style={styles.productName}>
              {item?.productModalNumber}</Text>
          </View>
        </View>

      </TouchableOpacity>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ height: scaledSize(40) }}>
        <HeaderComponent title={'My Orders'} />
      </View>
      <View style={{ flex: .09, backgroundColor: 'red', flexDirection: 'row', borderBottomWidth: scaledSize(0.5), borderBottomColor: 'lightgrey' }}>
        <View style={{ flex: .8, backgroundColor: 'white', padding: scaledSize(8) }}><TextInput style={{ borderRadius: scaledSize(4), borderWidth: scaledSize(0.2), borderColor: 'grey' }}></TextInput></View>
        <View><Text>Icon</Text></View>
        <View><Text>Filters</Text></View>
      </View>
      {/* <View style={{flex:0.2,borderTopWidth:scaledSize(0.5),borderBottomWidth:scaledSize(0.5)
      ,borderBottomColor:'lightgrey',borderTopColor:'lightgrey'}}>
          <View>
            <Image></Image>
          </View>
          <View>
            <View>
              <Text>Status</Text>
            </View>
            <View>
              <Text>Model Name</Text>
            </View>
          </View>
        </View> */}

      <View style={{ flex: 1, flexDirection: 'column' }}>
        <FlatList
          data={Orders?.allOrder}
          //indicatorStyle='black'
          numColumns={1}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => 'key' + index}
          renderItem={({ item, index }) => renderItem(item, index)}
          onEndReachedThreshold={0.5}
        // onEndReached={() => !this.state.search && this.onEndData()}
        //ListFooterComponent={() =>footerLoader()}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

  productView: {
    flex: 0.8, borderTopWidth: scaledSize(0.5), borderBottomWidth: scaledSize(0.5)
    , borderBottomColor: 'lightgrey', borderTopColor: 'lightgrey'

  },
  productName: {
    fontSize: scaledSize(20),
    textAlign: 'center',
    maxWidth: scaledSize(120),
    justifyContent: 'center',
    alignItems: 'center',
    color: 'grey',
    fontFamily: 'Cormorant-Bold',
    // marginTop: scaledSize(20),
    // top: scaledSize(50),
    // marginRight: scaledSize(15),
    // left: scaledSize(20),
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
    // top: scaledSize(30),
    // marginRight: scaledSize(),
    left: scaledSize(1),
    // backgroundColor:'red',
    padding: scaledSize(1)
  },

  productImage:
  {
    marginTop: scaledSize(5),
    width: scaledSize(135),
    height: scaledSize(120),
    marginLeft: scaledSize(5),
    marginRight: scaledSize(5),
    alignItems: 'center'
  },
});
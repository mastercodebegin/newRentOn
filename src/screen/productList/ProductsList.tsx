import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createRef, useEffect, useState, useRef, useReducer } from 'react'
import { View, Text, FlatList, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity, TextInput, TouchableNativeFeedback, StatusBar, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements';
import { Modalize } from 'react-native-modalize';
import { Searchbar } from 'react-native-paper';
import Swiper from 'react-native-swiper';
import HeaderComponent from '../../component/HeaderComponent';
import CustomeButton from '../../helper/util/CustomeButton';
import { scaledSize } from '../../helper/util/Utilities';
import { COLORS } from '../../utilits/GlobalAssets';
import { arrowLeftIcon, black, cement, dresses, girl, green, mobile, searchIcon, suite, watch2 } from '../../utilits/GlobalImages';
import { UrlConstants } from '../../context/service/UrlConstants';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, getReqresUser } from './ProductsSlice';
import CustomSpinner from '../../component/CustomSpinner';
const width = Dimensions.get('window').width;

interface S {
  search: any;
  //filterTabs:any;
  modalData: any;
  screenPosition: any;
  productsData: any;
  scrollLoad: boolean;
  searchProductsData: any
}
export interface Props {
  navigation: any;
  id: string;
  route: any;

}
interface SS {
  // Customizable Area Start
  id: any;
  swiper: any



  // Customizable Area End


}

const products = [
  { id: "1", price: '25.00', qty: 1, name: 'Apple Watch', image: watch2 },
  { id: "2", price: '150.00', qty: 1, name: 'black Suite', image: suite },
  { id: "3", price: '120.00', qty: 1, name: 'Blazzer Men', image: black },
  { id: "4", price: '90.00', qty: 1, name: 'Black Dress', image: dresses },
  { id: "5", price: '200.00', qty: 1, name: 'Olive Suite', image: green },
  { id: "6", price: '180.00', qty: 1, name: 'Casual Suite', image: cement },
]

const extraProducts = [
  { id: "4", price: '90.00', qty: 1, name: 'Black Dress', image: dresses },
  { id: "1", price: '25.00', qty: 1, name: 'Apple Watch', image: watch2 },
  { id: "5", price: '200.00', qty: 1, name: 'Olive Suite', image: green },
  { id: "2", price: '150.00', qty: 1, name: 'black Suite', image: suite },
  { id: "6", price: '180.00', qty: 1, name: 'Casual Suite', image: cement },
  { id: "3", price: '120.00', qty: 1, name: 'Blazzer Men', image: black },
]


const productData = [
  {
    "id": 1,
    "quantity": 0,
    "categories": {
      "id": 1,
      "name": "Electronics"
    },
    "subCategory": {
      "id": 1,
      "name": "Mobile",
      "category": {
        "id": 1,
        "name": "Electronics"
      }
    },
    "brand": {
      "id": 1,
      "name": "OnePlus"
    },
    "productModelNumber": {
      "id": 1,
      "name": "OnePlus Nord ce2 Lite 5G",
      "brand": {
        "id": 1,
        "name": "Apple"
      },
      "categories": null,
      "subCategory": null,
      "productSpecification": {
        "id": 5,
        "network": "5G",
        "platform": "p",
        "rom": "6",
        "ram": "128"
      }
    },
    "vendorProductsVaraint": [
      {
        "id": 1,
        "variant": {
          "id": 1,
          "ram": "10",
          "rom": "24",
          "selfieCamera": "20",
          "mainCamera": "48",
          "network": "48",
          'processor':'Octa core 2.2 GHz',
          "battery": "5000",
          "modalColors": [
            {
              "id": 1,
              "colorName": {
                "id": 1,
                "color": "r",
                "colorCode": "red1"
              },
              "modalImages": [
                {
                  "id": 1,
                  "imageName": "y5689ed831e2fe.jpeg"
                },
                {
                  "id": 2,
                  "imageName": "y2d2e8cc4cff9c6.jpeg"
                }
              ]
            },
            {
              "id": 3,
              "colorName": {
                "id": 2,
                "color": "blue1",
                "colorCode": "blue1"
              },
              "modalImages": [
                {
                  "id": 5,
                  "imageName": "y5689ed831e2fe.jpeg"
                }
              ]
            },
            {
              "id": 3,
              "colorName": {
                "id": 2,
                "color": "blue",
                "colorCode": "orange"
              },
              "modalImages": [
                {
                  "id": 5,
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
                "color": "black",
                "colorCode": "red"
              },
              "modalImages": [
                {
                  "id": 1,
                  "imageName": "y5689ed831e2fe.jpeg"
                },
                {
                  "id": 2,
                  "imageName": "y2d2e8cc4cff9c6.jpeg"
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
                "color": "blue1",
                "colorCode": "blue"
              },
              "modalImages": [
                {
                  "id": 5,
                  "imageName": "r179e61cb829b0f.jpeg"
                },
                {
                  "id": 2,
                  "imageName": "y2d2e8cc4cff9c6.jpeg"
                }
              ]
            },
            "available": false
          }
        ],
        "available": false
      },
      {
        "id": 2,
        "variant": {
          "id": 2,
          "ram": "22",
          "rom": "12",
          "selfieCamera": "32",
          "mainCamera": "33",
          "battery": "44",
          "modalColors": [
            {
              "id": 2,
              "colorName": {
                "id": 2,
                "color": "blue2",
                "colorCode": "blue"
              },
              "modalImages": [
                {
                  "id": 3,
                  "imageName": "rc57410512a85b.jpeg"
                },
                {
                  "id": 4,
                  "imageName": "r179e61cb829b0f.jpeg"
                }
              ]
            },
            {
              "id": 4,
              "colorName": {
                "id": 1,
                "color": "red",
                "colorCode": "red"
              },
              "modalImages": [
                {
                  "id": 6,
                  "imageName": "y5689ed831e2fe.jpeg"
                }
              ]
            }
          ]
        },
        "vendorProductsVariantColor": [
          {
            "id": 3,
            "inStock": 33,
            "modalColors": {
              "id": 4,
              "colorName": {
                "id": 2,
                "color": "blue2",
                "colorCode": "blue"
              },
              "modalImages": [
                {
                  "id": 3,
                  "imageName": "rc57410512a85b.jpeg"
                },
                {
                  "id": 4,
                  "imageName": "r179e61cb829b0f.jpeg"
                }
              ]
            },
            "available": false
          },
          {
            "id": 4,
            "inStock": 44,
            "modalColors": {
              "id": 5,
              "colorName": {
                "id": 1,
                "color": "red",
                "colorCode": "red"
              },
              "modalImages": [
                {
                  "id": 6,
                  "imageName": "y5689ed831e2fe.jpeg"
                }
              ]
            },
            "available": false
          },
         
          
        ],
        "available": false
      },
      
    ]},
    {
      "id": 1,
      "quantity": 0,
      "categories": {
        "id": 1,
        "name": "Electronics"
      },
      "subCategory": {
        "id": 1,
        "name": "Mobile",
        "category": {
          "id": 1,
          "name": "Electronics"
        }
      },
      "brand": {
        "id": 1,
        "name": "OnePlus"
      },
      "productModelNumber": {
        "id": 1,
        "name": "OnePlus Nord ce2 Lite 5G",
        "brand": {
          "id": 1,
          "name": "Apple"
        },
        "categories": null,
        "subCategory": null,
        "productSpecification": {
          "id": 5,
          "network": "0",
          "platform": "p",
          "rom": "",
          "ram": ""
        }
      },
      "vendorProductsVaraint": [
        {
          "id": 1,
          "variant": {
            "id": 1,
            "ram": "10",
            "rom": "24",
            "selfieCamera": "0",
            "mainCamera": "8",
            "battery": "8",
            "modalColors": [
              {
                "id": 1,
                "colorName": {
                  "id": 1,
                  "color": "r",
                  "colorCode": "red1"
                },
                "modalImages": [
                  {
                    "id": 1,
                    "imageName": "y5689ed831e2fe.jpeg"
                  },
                  {
                    "id": 2,
                    "imageName": "y2d2e8cc4cff9c6.jpeg"
                  }
                ]
              },
              {
                "id": 3,
                "colorName": {
                  "id": 2,
                  "color": "blue1",
                  "colorCode": "blue1"
                },
                "modalImages": [
                  {
                    "id": 5,
                    "imageName": "y5689ed831e2fe.jpeg"
                  }
                ]
              },
              {
                "id": 3,
                "colorName": {
                  "id": 2,
                  "color": "blue",
                  "colorCode": "orange"
                },
                "modalImages": [
                  {
                    "id": 5,
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
                  "color": "black",
                  "colorCode": "red"
                },
                "modalImages": [
                  {
                    "id": 1,
                    "imageName": "y5689ed831e2fe.jpeg"
                  },
                  {
                    "id": 2,
                    "imageName": "y2d2e8cc4cff9c6.jpeg"
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
                  "color": "blue1",
                  "colorCode": "blue"
                },
                "modalImages": [
                  {
                    "id": 5,
                    "imageName": "r179e61cb829b0f.jpeg"
                  },
                  {
                    "id": 2,
                    "imageName": "y2d2e8cc4cff9c6.jpeg"
                  }
                ]
              },
              "available": false
            }
          ],
          "available": false
        },
        {
          "id": 2,
          "variant": {
            "id": 2,
            "ram": "22",
            "rom": "12",
            "selfieCamera": "32",
            "mainCamera": "33",
            "battery": "44",
            "modalColors": [
              {
                "id": 2,
                "colorName": {
                  "id": 2,
                  "color": "blue2",
                  "colorCode": "blue"
                },
                "modalImages": [
                  {
                    "id": 3,
                    "imageName": "rc57410512a85b.jpeg"
                  },
                  {
                    "id": 4,
                    "imageName": "r179e61cb829b0f.jpeg"
                  }
                ]
              },
              {
                "id": 4,
                "colorName": {
                  "id": 1,
                  "color": "red",
                  "colorCode": "red"
                },
                "modalImages": [
                  {
                    "id": 6,
                    "imageName": "y5689ed831e2fe.jpeg"
                  }
                ]
              }
            ]
          },
          "vendorProductsVariantColor": [
            {
              "id": 3,
              "inStock": 33,
              "modalColors": {
                "id": 4,
                "colorName": {
                  "id": 2,
                  "color": "blue2",
                  "colorCode": "blue"
                },
                "modalImages": [
                  {
                    "id": 3,
                    "imageName": "rc57410512a85b.jpeg"
                  },
                  {
                    "id": 4,
                    "imageName": "r179e61cb829b0f.jpeg"
                  }
                ]
              },
              "available": false
            },
            {
              "id": 4,
              "inStock": 44,
              "modalColors": {
                "id": 5,
                "colorName": {
                  "id": 1,
                  "color": "red",
                  "colorCode": "red"
                },
                "modalImages": [
                  {
                    "id": 6,
                    "imageName": "y5689ed831e2fe.jpeg"
                  }
                ]
              },
              "available": false
            },
           
            
          ],
          "available": false
        },
        
      ]},
      {
        "id": 1,
        "quantity": 0,
        "categories": {
          "id": 1,
          "name": "Electronics"
        },
        "subCategory": {
          "id": 1,
          "name": "Mobile",
          "category": {
            "id": 1,
            "name": "Electronics"
          }
        },
        "brand": {
          "id": 1,
          "name": "OnePlus"
        },
        "productModelNumber": {
          "id": 1,
          "name": "OnePlus Nord ce2 Lite 5G",
          "brand": {
            "id": 1,
            "name": "Apple"
          },
          "categories": null,
          "subCategory": null,
          "productSpecification": {
            "id": 5,
            "network": "0",
            "platform": "p",
            "rom": "",
            "ram": ""
          }
        },
        "vendorProductsVaraint": [
          {
            "id": 1,
            "variant": {
              "id": 1,
              "ram": "10",
              "rom": "24",
              "selfieCamera": "0",
              "mainCamera": "8",
              "battery": "8",
              "modalColors": [
                {
                  "id": 1,
                  "colorName": {
                    "id": 1,
                    "color": "r",
                    "colorCode": "red1"
                  },
                  "modalImages": [
                    {
                      "id": 1,
                      "imageName": "y5689ed831e2fe.jpeg"
                    },
                    {
                      "id": 2,
                      "imageName": "y2d2e8cc4cff9c6.jpeg"
                    }
                  ]
                },
                {
                  "id": 3,
                  "colorName": {
                    "id": 2,
                    "color": "blue1",
                    "colorCode": "blue1"
                  },
                  "modalImages": [
                    {
                      "id": 5,
                      "imageName": "y5689ed831e2fe.jpeg"
                    }
                  ]
                },
                {
                  "id": 3,
                  "colorName": {
                    "id": 2,
                    "color": "blue",
                    "colorCode": "orange"
                  },
                  "modalImages": [
                    {
                      "id": 5,
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
                    "color": "black",
                    "colorCode": "red"
                  },
                  "modalImages": [
                    {
                      "id": 1,
                      "imageName": "y5689ed831e2fe.jpeg"
                    },
                    {
                      "id": 2,
                      "imageName": "y2d2e8cc4cff9c6.jpeg"
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
                    "color": "blue1",
                    "colorCode": "blue"
                  },
                  "modalImages": [
                    {
                      "id": 5,
                      "imageName": "r179e61cb829b0f.jpeg"
                    },
                    {
                      "id": 2,
                      "imageName": "y2d2e8cc4cff9c6.jpeg"
                    }
                  ]
                },
                "available": false
              }
            ],
            "available": false
          },
          {
            "id": 2,
            "variant": {
              "id": 2,
              "ram": "22",
              "rom": "12",
              "selfieCamera": "32",
              "mainCamera": "33",
              "battery": "44",
              "modalColors": [
                {
                  "id": 2,
                  "colorName": {
                    "id": 2,
                    "color": "blue2",
                    "colorCode": "blue"
                  },
                  "modalImages": [
                    {
                      "id": 3,
                      "imageName": "rc57410512a85b.jpeg"
                    },
                    {
                      "id": 4,
                      "imageName": "r179e61cb829b0f.jpeg"
                    }
                  ]
                },
                {
                  "id": 4,
                  "colorName": {
                    "id": 1,
                    "color": "red",
                    "colorCode": "red"
                  },
                  "modalImages": [
                    {
                      "id": 6,
                      "imageName": "y5689ed831e2fe.jpeg"
                    }
                  ]
                }
              ]
            },
            "vendorProductsVariantColor": [
              {
                "id": 3,
                "inStock": 33,
                "modalColors": {
                  "id": 4,
                  "colorName": {
                    "id": 2,
                    "color": "blue2",
                    "colorCode": "blue"
                  },
                  "modalImages": [
                    {
                      "id": 3,
                      "imageName": "rc57410512a85b.jpeg"
                    },
                    {
                      "id": 4,
                      "imageName": "r179e61cb829b0f.jpeg"
                    }
                  ]
                },
                "available": false
              },
              {
                "id": 4,
                "inStock": 44,
                "modalColors": {
                  "id": 5,
                  "colorName": {
                    "id": 1,
                    "color": "red",
                    "colorCode": "red"
                  },
                  "modalImages": [
                    {
                      "id": 6,
                      "imageName": "y5689ed831e2fe.jpeg"
                    }
                  ]
                },
                "available": false
              },
             
              
            ],
            "available": false
          },
          
        ]},
        {
          "id": 1,
          "quantity": 0,
          "categories": {
            "id": 1,
            "name": "Electronics"
          },
          "subCategory": {
            "id": 1,
            "name": "Mobile",
            "category": {
              "id": 1,
              "name": "Electronics"
            }
          },
          "brand": {
            "id": 1,
            "name": "OnePlus"
          },
          "productModelNumber": {
            "id": 1,
            "name": "OnePlus Nord ce2 Lite 5G",
            "brand": {
              "id": 1,
              "name": "Apple"
            },
            "categories": null,
            "subCategory": null,
            "productSpecification": {
              "id": 5,
              "network": "0",
              "platform": "p",
              "rom": "",
              "ram": ""
            }
          },
          "vendorProductsVaraint": [
            {
              "id": 1,
              "variant": {
                "id": 1,
                "ram": "10",
                "rom": "24",
                "selfieCamera": "0",
                "mainCamera": "8",
                "battery": "8",
                "modalColors": [
                  {
                    "id": 1,
                    "colorName": {
                      "id": 1,
                      "color": "r",
                      "colorCode": "red1"
                    },
                    "modalImages": [
                      {
                        "id": 1,
                        "imageName": "y5689ed831e2fe.jpeg"
                      },
                      {
                        "id": 2,
                        "imageName": "y2d2e8cc4cff9c6.jpeg"
                      }
                    ]
                  },
                  {
                    "id": 3,
                    "colorName": {
                      "id": 2,
                      "color": "blue1",
                      "colorCode": "blue1"
                    },
                    "modalImages": [
                      {
                        "id": 5,
                        "imageName": "y5689ed831e2fe.jpeg"
                      }
                    ]
                  },
                  {
                    "id": 3,
                    "colorName": {
                      "id": 2,
                      "color": "blue",
                      "colorCode": "orange"
                    },
                    "modalImages": [
                      {
                        "id": 5,
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
                      "color": "black",
                      "colorCode": "red"
                    },
                    "modalImages": [
                      {
                        "id": 1,
                        "imageName": "y5689ed831e2fe.jpeg"
                      },
                      {
                        "id": 2,
                        "imageName": "y2d2e8cc4cff9c6.jpeg"
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
                      "color": "blue1",
                      "colorCode": "blue"
                    },
                    "modalImages": [
                      {
                        "id": 5,
                        "imageName": "r179e61cb829b0f.jpeg"
                      },
                      {
                        "id": 2,
                        "imageName": "y2d2e8cc4cff9c6.jpeg"
                      }
                    ]
                  },
                  "available": false
                }
              ],
              "available": false
            },
            {
              "id": 2,
              "variant": {
                "id": 2,
                "ram": "22",
                "rom": "12",
                "selfieCamera": "32",
                "mainCamera": "33",
                "battery": "44",
                "modalColors": [
                  {
                    "id": 2,
                    "colorName": {
                      "id": 2,
                      "color": "blue2",
                      "colorCode": "blue"
                    },
                    "modalImages": [
                      {
                        "id": 3,
                        "imageName": "rc57410512a85b.jpeg"
                      },
                      {
                        "id": 4,
                        "imageName": "r179e61cb829b0f.jpeg"
                      }
                    ]
                  },
                  {
                    "id": 4,
                    "colorName": {
                      "id": 1,
                      "color": "red",
                      "colorCode": "red"
                    },
                    "modalImages": [
                      {
                        "id": 6,
                        "imageName": "y5689ed831e2fe.jpeg"
                      }
                    ]
                  }
                ]
              },
              "vendorProductsVariantColor": [
                {
                  "id": 3,
                  "inStock": 33,
                  "modalColors": {
                    "id": 4,
                    "colorName": {
                      "id": 2,
                      "color": "blue2",
                      "colorCode": "blue"
                    },
                    "modalImages": [
                      {
                        "id": 3,
                        "imageName": "rc57410512a85b.jpeg"
                      },
                      {
                        "id": 4,
                        "imageName": "r179e61cb829b0f.jpeg"
                      }
                    ]
                  },
                  "available": false
                },
                {
                  "id": 4,
                  "inStock": 44,
                  "modalColors": {
                    "id": 5,
                    "colorName": {
                      "id": 1,
                      "color": "red",
                      "colorCode": "red"
                    },
                    "modalImages": [
                      {
                        "id": 6,
                        "imageName": "y5689ed831e2fe.jpeg"
                      }
                    ]
                  },
                  "available": false
                },
               
                
              ],
              "available": false
            },
            
          ]}
  
  ]


const   ProductList =(props:any)=> {

const [search, setSearch] = useState('')
const [products, setProducts] = useState([])
const dispatch = useDispatch()
const reducer = useSelector((state:any)=>state.ProductsSlice)
useEffect(()=>{
  console.log('useeffects--------------------------------',reducer);
  
  //@ts-ignore
dispatch(getProducts({pageSize:10,pageNumber:0}))
// dispatch(getReqresUser())
},[])

  const renderItem=(item: any, index: number)=> {    
    return (
      //<View style={{backgroundColor:'purple',height:200,width:160,margin:4
    // }}>
  
    <TouchableOpacity onPress={() => { props.navigation.navigate('ProductDetails', { data: item }) }}
     style={{height:200,width:160,margin:4,justifyContent:'center',alignItems:'center'}}>
      <View style={[styles.productView, { alignItems: 'center' }]}>
        <Image resizeMethod='resize' resizeMode='contain' 
       source={{ uri: UrlConstants.S3_BASE_URL + item.vendorProductsVaraint[0]?.vendorProductsVariantColor[0]?.modalColors?.modalImages[0]?.imageName }}
        style={styles.productImage} />
        <Text style={styles.productName}>
          {item.productModelNumber?.name}</Text>
        <Text style={styles.productPrice}>
          $ {item?.vendorProductsVaraint.length>0&&item?.vendorProductsVaraint[0].price}</Text>
      </View>

    </TouchableOpacity>
    // </View>
    )
  }

  // async onEndData() {
  //   this.setState({ scrollLoad: true })
  //   setTimeout(() => {
  //     this.setState({ productsData: this.state.productsData.concat(extraProducts) })
  //     this.setState({ scrollLoad: false })
  //   }, 2000);

  // }

  const footerLoader=()=> {
    // if (this.state.scrollLoad) return null
    return (
      <View style={{ paddingVertical: scaledSize(50) }}>
        <ActivityIndicator color='red' style={{ bottom: scaledSize(40) }} animating size={'large'} />
      </View>
    )
  }


  // handleSearch = (value: any) => {
  //   if (this.state.productsData && value) {
  //     let products: any;
  //     products = this.state.productsData?.filter((item: any) => {
  //       if (item && item?.name) {
  //         return item?.name.toLowerCase().indexOf(value.toLowerCase()) >= 0
  //       }
  //     })
  //     this.setState({ searchProductsData: products })
  //   }
  // }

  
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <TextInput placeholder='Search products . . .' style={{ width: '80%', backgroundColor: COLORS.white, left: scaledSize(50), top: scaledSize(10) }} 
        value={search} onChangeText={(value: any) => { setSearch( value )}} />
        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ position: 'absolute', left: 0, top: scaledSize(26), marginLeft: scaledSize(15) }}>
          <Image source={arrowLeftIcon} resizeMode='contain' style={{ width: scaledSize(20), height: scaledSize(25),tintColor:'gray',bottom:scaledSize(4) }} />
        </TouchableOpacity>
        <TouchableOpacity style={{ position: 'absolute', right: 0, top: scaledSize(26), marginRight: scaledSize(25) }}>
          <Image source={searchIcon} resizeMode='contain' style={{ width: scaledSize(20), height: scaledSize(25) }} />
        </TouchableOpacity>
        <View style={{ marginTop: scaledSize(25), alignSelf: 'center',justifyContent:'center',alignItems:'center' }}>
          <FlatList 
          data={reducer.data}
            //indicatorStyle='black'
            numColumns={2}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => 'key' + index}
            renderItem={({ item, index }) => renderItem(item, index)}
            onEndReachedThreshold={0.5}
            // onEndReached={() => !this.state.search && this.onEndData()}
            //ListFooterComponent={() =>footerLoader()}
          />
        </View>
        <CustomSpinner isLoading={reducer?.isLoading}/>
      </View>
    )
  
}

const styles = StyleSheet.create({
  titleInput: {
    color: COLORS.orange,
    top: scaledSize(-10),
    marginTop: scaledSize(-10),
    // textAlign:'center',
    letterSpacing: 1,
    fontFamily: 'Quicksand-Bold',
    // marginTop:scaledSize(10),
    fontSize: scaledSize(19),
  },
  productView: {
    // backgroundColor: COLORS.white,
    borderWidth: 1,
    borderRadius: scaledSize(14),
    borderColor: "#dfdfdf",
    //top: scaledSize(10),
    // margin: scaledSize(10),
    // marginLeft: scaledSize(20),
     height: scaledSize(200),
    // width: scaledSize(160)
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
    width: scaledSize(135),
    height: scaledSize(120),
    marginLeft: scaledSize(5),
    marginRight: scaledSize(5),
    alignItems: 'center'
  },
});

export default ProductList
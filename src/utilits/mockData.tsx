import { mobile } from "./GlobalImages"

export const colorProducts =  [
    { id: 1, name: 'White', isSelected:true, link: require('../assets/images/iphone.jpeg') },
    { id:2,name: 'black',isSelected:false, link: mobile },
    { id:2,name: 'red', isSelected:false, link: require('../assets/images/iphone.jpeg') }
]

export const productDetails =
  {
      link: require('../assets/images/iphone.jpeg'),
      name: 'Google Pixel 3a',
      colors: {
          color:colorProducts
      },
      varients:{
          varient:[{
              rom:128,
              ram:8,
              price:20000,
              color:''
          }]

      },
      price: '19999',
      ram: '2GB', rom: '16GB', procesor: '2.7GHZ',
      currencyIcon: require('../assets/images/rupee.png'), badge: 'old'
  }
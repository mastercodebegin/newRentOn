import React, { useEffect } from 'react'
import Navigations from './src/navigation/Navigations'
import { Provider } from 'react-redux'
import { View, Text, Dimensions, TouchableOpacity, Alert, Image } from 'react-native'
import Store from './src/context/store/Store'
import Stepper from './src/helper/util/StepIndicator'
import DropDown from './src/component/DropDown'
import Rating from './src/helper/util/Rating'
import Chat from './src/helper/util/Chat'
import { deviceWidth, scaledSize } from './src/helper/util/Utilities'
import CustomeButton from './src/helper/util/CustomeButton'
import { LogBox } from "react-native";
import ProductList from './src/screen/productList/ProductsList'
import ProductDetails from './src/screen/productview/productDetails'
import SwiperFlatList from 'react-native-swiper-flatlist'
import { bgImage, slide2, sliderImage, sliderImage2 } from './src/utilits/GlobalImages'
import ImageSlider from './src/component/ImageSlider'
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown'
const { width } = Dimensions.get('window');


LogBox.ignoreLogs([
  "ViewPropTypes will be removed",
  "ColorPropType will be removed",
  "ViewPropTypes will be removed from React Native",
  "VirtualizedLists should never be nested"
])
const App = () => {
  useEffect(() => {
  }, [])
  const images = [{ image: slide2 }, { image: sliderImage }, { image: sliderImage2 }]
  return (
    <AutocompleteDropdownContextProvider>
      <Provider store={Store}>
        <Navigations />
      </Provider>
    </AutocompleteDropdownContextProvider>

    // <ProductDetails/>



  )
}
export default App

import React, { useEffect } from 'react'
import { View, Text, Dimensions, TouchableOpacity, Alert, Image } from 'react-native'
import SwiperFlatList from 'react-native-swiper-flatlist'
import { scaledSize } from '../helper/util/Utilities';
import { COLORS } from '../utilits/GlobalAssets';
import { UrlConstants } from '../context/service/UrlConstants';
const { width } = Dimensions.get('window');

interface S{
    data:[{image:''}],
    height: number,
    width: number,
    showPaginations: true,
    autoPlay:false,
    onImagePress:any
    paginationActiveColor:''
    paginationInActiveColor:''

}


const ImageSlider = (props:S) => {
  useEffect(() => {
  }, [])
  return (
    <View style={{
      height: scaledSize(400),
      alignSelf: 'center',
      width: width - 10,
      backgroundColor: 'white'


    }}>
      <SwiperFlatList
        autoplay
         autoplayDelay={2}
        autoplayLoop={props.autoPlay}
        index={2}
        // keyExtractor={item=>item+''+item}
        showPagination={props.showPaginations}
        data={props.data}
        paginationActiveColor={props.paginationActiveColor?props.paginationActiveColor:COLORS.activeBorderColor}
        paginationDefaultColor={props.paginationInActiveColor?props.paginationInActiveColor:COLORS.inActiveBorderColor}
        renderItem={({ item }) => (
          <TouchableOpacity style={[{ width, justifyContent: 'center', }]}
            onPress={() => props.onImagePress()
            }>
            <Image
              style={{
                width: width,
                height: scaledSize(300),
              }}
              source={{uri:UrlConstants.S3_BASE_URL+item.imageName}}
              resizeMode='contain'
            />
          </TouchableOpacity>
        )}
      />
    </View>


  )
}
export default ImageSlider

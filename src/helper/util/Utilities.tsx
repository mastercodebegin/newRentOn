import React from 'react'
import uuid from 'react-native-uuid';

import { Dimensions } from 'react-native'
import axios from 'axios';
import { CONSTANT } from '../../utilits/Constants';
const { width, height, scale: deviceScale, fontScale } = Dimensions.get('window');
const baseWidth = 360;
const baseHeight = 700;

const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;
const scale = Math.min(scaleWidth, scaleHeight);

// const storageProvider = require('./StorageProvider');

export const scaleRatio = deviceScale;
export const deviceWidth = width;
export const deviceHeight = height;
export const deviceAspectRatio = width / height;
export const scaledSize = (size: any) => Math.ceil(size * scale);
export const widthFromPercentage = (per: number) => (width * per) / 100;
export const heightFromPercentage = (per: number) => (height * per) / 100;

export const getDate = (item: any) => {
    const day = item?.mtime?.getDate()
    const month = item?.mtime?.getMonth()
    const year = item?.mtime?.getFullYear()

    return `${day} - ${month} - ${year}`

}

export const getFileSize = (size: number) => {
    const kb = size / 1000
    if (kb > 1000) {
        const mb = kb / 1000
        //  const mbString=mb.toString
        //  mbString.

        return `${Math.round(mb * 10) / 10} MB`
    }
    else { return `${Math.round(kb * 10) / 10} KB` }

}

export const capitalizeFirstLetter = (string: string) => {
    // console.log(string);
    // console.log(string?.charAt(0)?.toUpperCase());


    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
}

export function numberWithCommas(value) {
    return value?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const getAmountIntrest = (totalPrice, numberOfIntrest) => {
    const amount = numberOfIntrest * totalPrice / 100
    //  console.log('amount------',amount);
    return amount

}

export const getUUIDV4 = () => {
    return uuid.v4();
}

export const searchPlace = async (searchText,) => {
    const url = `https://api.mapbox.com/search/searchbox/v1/suggest?q=${searchText}&language=en&session_token=${getUUIDV4()}3&access_token=${CONSTANT.MAPBOX_API_PUBLIC_KEY}`
    console.log('url======', url);
    return  axios.get(url).then(response => console.log('res====', response)).catch(err => console.log(err))
    
}
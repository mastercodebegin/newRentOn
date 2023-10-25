import { View, Text } from 'react-native'
import React from 'react'
import Spinner from 'react-native-loading-spinner-overlay';

export default function CustomSpinner({isLoading}) {
  return (
    <Spinner
    visible={isLoading}
    color='purple'

    />
  )
}
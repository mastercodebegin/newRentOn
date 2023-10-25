import React from 'react'
import { Modalize } from "react-native-modalize";

export default function ModalizeCard(props:any) {
  return (
    <Modalize adjustToContentHeight={true} panGestureComponentEnabled={true} ref={props.ref}>
</Modalize>
  )
}
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Slider from 'rn-range-slider';

const PriceRangeSlider = () => {
  const [range, setRange] = useState({ start: 0, end: 100 });

  const handleValueChange = (start, end) => {
    setRange({ start, end });
  };

  return (
    <View>
      <Text>Start: {range.start}</Text>
      <Text>End: {range.end}</Text>
      
    </View>
  );
};

export default PriceRangeSlider;

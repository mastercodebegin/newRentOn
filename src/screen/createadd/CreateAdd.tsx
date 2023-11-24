import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
  ImageLibraryOptions,
  CameraOptions,
} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';


export default function CreateAdd() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const openImagePicker = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('Image picker error: ', response.errorMessage);
      } else {
        let imageUri = response.assets?.[0] && response.assets[0].uri;
        setSelectedImages((prevImages) => [...prevImages, imageUri || '']);
      }
    });
  };

  const handleCameraLaunch = () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorMessage) {
        console.log('Camera Error: ', response.errorMessage);
      } else {
        let imageUri = response.assets?.[0] && response.assets[0].uri;
        setSelectedImages((prevImages) => [...prevImages, imageUri || '']);
        console.log(imageUri);
      }
    });
  };

  const deleteImage = (index: number) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };

  const renderImageItem = ({ item, index }: { item: string; index: number }) => (
    <View style={{ position: 'relative' }}>
      <Image source={{ uri: item }} style={styles.image} />
      <TouchableOpacity style={styles.deleteIconContainer} onPress={() => deleteImage(index)}>
        <Icon name="delete" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <TouchableOpacity onPress={() => openImagePicker()}>
        <Text>CreateAdd Launch Gallery</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleCameraLaunch()}>
        <Text>CreateAdd Launch Camera </Text>
      </TouchableOpacity>

      <FlatList
        data={selectedImages}
        renderItem={renderImageItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
      />

      
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
  deleteIconContainer: {
    position: 'absolute',
    top: 0,
    left: 170,
    padding: 10,
    // backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

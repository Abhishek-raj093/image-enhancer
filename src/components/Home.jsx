import React, { useState } from 'react'
import ImageUpload from './ImageUpload'
import ImagePreview from './ImagePreview'
import {enhancedImageAPI} from '../utils/enhancedImageApi';

const Home = () => {
    const [uploadImage, setUploadImage] = useState(null);
    const [enhancedImage, setEnhancedImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const UploadImageHandler = async (file) => {
        setUploadImage(URL.createObjectURL(file));
        setLoading(true);

        // Call the API to enhance the image
        try {
            // code which may produce error
            const enhancedURL = await enhancedImageAPI(file)
            setEnhancedImage(enhancedURL);
            setLoading(false);
        } catch (error) {
            // Code to handle the Error and Show Message
            console.log(error);
            alert("Error while enhancing the image. Please try again Later.");
        }
    };

  return (
    <>
      <ImageUpload UploadImageHandler={UploadImageHandler}/>
      <ImagePreview 
        loading={loading}
        uploaded={uploadImage}
        enhanced={enhancedImage?.image}
      />
    </>
  )
}

export default Home

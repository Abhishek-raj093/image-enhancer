import React, { useState } from 'react'
import ImageUpload from './ImageUpload'
import ImagePreview from './ImagePreview'

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
        } catch (error) {
            // Code to handle the Error and Show Message
        }
    };

  return (
    <>
      <ImageUpload UploadImageHandler={UploadImageHandler}/>
      <ImagePreview 
        loading={loading}
        uploaded={uploadImage}
        enhanced={enhancedImage}
      />
    </>
  )
}

export default Home

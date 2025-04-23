import axios from "axios";

const BASE_URL="https://techhk.aoscdn.com";
const API_KEY="wxl79o5ixirm3g37c";
const MAXIMUM_RETRIES=20;

export const enhancedImageAPI = async (file) => {
    // Code to call api and get enhanced image url
    try {
        const taskId = await UploadImage(file);
        console.log("Image Uploaded Successfully, Task ID:", taskId);

        const enhancedImageData = await PollForEnhancedImage(taskId);
        console.log("Enhanced Image Data:", enhancedImageData);

        return enhancedImageData;

    } catch (error) {
        console.log("Error enhancing image:", error.message);
    }
};

const UploadImage = async (file) => {
    // Code to Uploaded image
    const formData = new FormData();
    formData.append("image_file", file);

    const {data} = await axios.post(
        `${BASE_URL}/api/tasks/visual/scale`, 
        formData, 
        {
            headers: {
                "Content-Type": "multipart/form-data",
                "X-API-KEY": API_KEY,
            },
    });

    if(!data?.data?.task_id) {
        throw new Error ("Failed to upload image! Task ID not found.")
    }
    return data.data.task_id;
}

const fetchEnhancedImage = async (taskId) => {
    // Fetch enhanced image
    const { data } = await axios.get(
        `${BASE_URL}/api/tasks/visual/scale/${taskId}`,
    {
        headers: {
            "X-API-KEY": API_KEY,
        },
    });
    if(!data?.data) {
        throw new Error("Failed to Fetch enhanced image! Image not found.");
    }
    return data.data;
};

const PollForEnhancedImage = async (taskId, retries = 0) => {
    const result = await fetchEnhancedImage(taskId);

    if(result.state === 4) {
        console.log(`Processing...(${retries}/ ${MAXIMUM_RETRIES})`);

        if (retries >= MAXIMUM_RETRIES) {
            throw new Error("Max retries reached. Please try again later.")
        }

        // Wait for 2 second
        await new Promise((resolve) => setTimeout(resolve, 2000));

        return PollForEnhancedImage(taskId, retries + 1);
    }
    console.log("Enhanced Image URL:", result.result);
    return result;
};
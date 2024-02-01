import axios from "axios";

export const CloudImage = async (
  form_data: any,
  reduxDispatch: any,
  updateProgress: any
) => {
  const cloudinary_url = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
  const config = {
    onUploadProgress: function (progressEvent: any) {
      let percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      reduxDispatch(updateProgress(percentCompleted));
      console.log(percentCompleted);
    },
  };

  try {
    const { data } = await axios.post(`${cloudinary_url}`, form_data, config);

    const { public_url, secure_url } = data;
    return secure_url;
  } catch (err) {
    console.log(err);
  }
};

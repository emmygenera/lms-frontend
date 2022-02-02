

//  const options = {
//     method: 'POST',
//     body: formData,
//     // If you add this, upload won't work
//     // headers: {
//     //   'Content-Type': 'multipart/form-data',
//     // }
//   };

//   fetch('your-upload-url', options);

import Axios from './http';

const UploadService = {
  uploadToServer: (data) => Axios.post('/upload', data, { headers: { 'Content-Type': 'multipart/form-data', } })
}

export default UploadService;

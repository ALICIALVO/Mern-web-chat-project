// import { useState, useEffect } from 'react';
// import { uploadFile } from '../service/api.mjs';

// const useFileUpload = () => {
//     const [file, setFile] = useState(null);
//     const [image, setImage] = useState('');

//     const openFileDialog = () => {
//         const input = document.createElement('input');
//         input.type = 'file';
//         input.onchange = (e) => {
//             const selectedFile = e.target.files[0];
//             if (selectedFile) {
//                 setFile(selectedFile);
//             }
//         };
//         input.click();
//     };

//     useEffect(() => {
//         const uploadSelectedFile = async () => {
//             if (file) {
//                 const data = new FormData();
//                 data.append('name', file.name);
//                 data.append('file', file);

//                 let response = await uploadFile(data);
//                 setImage(response.data);
//             }
//         };
//         uploadSelectedFile();
//     }, [file]);

//     return { openFileDialog, file, image };
// };

// export default useFileUpload;

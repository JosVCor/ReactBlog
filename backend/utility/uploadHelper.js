// // uploadHelper.js
//
// const fs = require('fs');
// const path = require('path');
//
// const uploadFile = (file) => {
//     return new Promise((resolve, reject) => {
//         // Create a folder based on the current timestamp
//         const folderName = Date.now().toString();
//         const folderPath = path.join(__dirname, '..', 'uploads', folderName);
//
//         // Create the folder
//         fs.mkdir(folderPath, (err) => {
//             if (err) {
//                 console.error(err);
//                 reject('Failed to create folder');
//             }
//
//             // Move the uploaded file to the newly created folder
//             const destinationPath = path.join(folderPath, file.originalname);
//             fs.rename(file.path, destinationPath, (err) => {
//                 if (err) {
//                     console.error(err);
//                     reject('Failed to move file');
//                 }
//
//                 // Resolve with the relative path of the uploaded file
//                 const relativePath = path.join('uploads', folderName, file.originalname);
//                 resolve(relativePath);
//             });
//         });
//     });
// };
//
// module.exports = { uploadFile };